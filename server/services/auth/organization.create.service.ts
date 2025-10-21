import { ConflictError } from "@/lib/error/http-error";
import { prisma } from "@/lib/prisma";
import { ROLES } from "@/lib/role";
import { hashPassword } from "@/server/auth/crypto";

export async function createOrganization({
  organizationEmail,
  organizationName,
  password,
  confirmPassword,
  phone,
}: {
  organizationEmail: string;
  organizationName: string;
  password: string;
  confirmPassword: string;
  phone: string;
}): Promise<{
  organizationId: string;
  userId: string;
  teamId: string;
}> {
  if (password !== confirmPassword) {
    throw new ConflictError("Passwords do not match");
  }

  const [existingOrg, existingEmailOrg, existingUser, existingPhoneUser] =
    await Promise.all([
      prisma.organization.findUnique({
        where: { name: organizationName.toLowerCase() },
      }),
      prisma.organization.findUnique({ where: { email: organizationEmail } }),
      prisma.user.findUnique({ where: { email: organizationEmail } }),
      prisma.user.findUnique({ where: { phone } }),
    ]);

  if (existingOrg) {
    throw new ConflictError("Organization already exists");
  }

  if (existingEmailOrg) {
    throw new ConflictError("Organization with this email already exists");
  }

  if (existingUser) {
    throw new ConflictError("Organization with this email already exists");
  }

  if (existingPhoneUser) {
    throw new ConflictError(
      "Organization with this phone number already exists"
    );
  }

  const passwordHash = await hashPassword(password);

  const emailDomain = organizationEmail.split("@")[1];

  let organizationId: string;
  let userId: string;
  let teamId: string;

  const result = await prisma.$transaction(async (transaction) => {
    const superAdminUser = await transaction.user.create({
      data: {
        name: `${organizationName} SUPER_ADMIN`,
        email: organizationEmail,
        isActive: true,
        phone,
      },
    });

    userId = superAdminUser.id;

    await transaction.localCredential.create({
      data: {
        userId,
        passwordHash,
      },
    });

    const organization = await transaction.organization.create({
      data: {
        name: organizationName,
        email: organizationEmail,
        domainAllowlist: [emailDomain],
        createdByUserId: userId,
      },
    });

    organizationId = organization.id;

    const defaultTeam = await transaction.team.create({
      data: {
        name: "Default Team",
        description: `This is the default team created for the organization ${organizationName}.`,
        organizationId,
      },
    });

    teamId = defaultTeam.id;

    await transaction.teamUser.create({
      data: {
        userId,
        teamId,
        joinedAt: new Date(),
        role: ROLES.ORGANIZATION_SUPER_ADMIN,
      },
    });

    await transaction.user.update({
      where: { id: userId },
      data: { defaultTeamId: teamId },
    });

    await transaction.organizationProfile.create({
      data: {
        userId,
      },
    });

    await transaction.auditLog.create({
      data: {
        userId,
        organizationId,
        action: "ORGANIZATION_CREATED",
        entityType: "Organization",
        entityId: organizationId,
        details: {
          organizationName,
          adminEmail: organizationEmail,
          createdAt: new Date(),
        },
      },
    });

    return { organizationId, userId, teamId };
  });

  console.log("Created organization with ID:", result.organizationId);

  return result;
}
