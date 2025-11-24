import { ConflictError } from "@/lib/error/http-error";
import { prisma } from "@/lib/prisma";
import { OrganizationRole } from "@/lib/role";
import { slugify } from "@/lib/utils";
import { hashPassword } from "@/server/auth/crypto";
import { getUniqueSlug } from "./get-unique-slug.service";

export async function createOrganization({
  organizationEmail,
  organizationName,
  password,
  confirmPassword,
}: {
  organizationEmail: string;
  organizationName: string;
  password: string;
  confirmPassword: string;
}): Promise<{
  organizationId: string;
  userId: string;
}> {
  if (password !== confirmPassword) {
    throw new ConflictError("Passwords do not match");
  }

  const [existingOrgByEmail, existingOrgBySlug, existingUser] =
    await Promise.all([
      prisma.organization.findUnique({
        where: { primaryEmail: organizationEmail },
      }),
      prisma.organization.findUnique({
        where: { slug: slugify(organizationName) },
      }),
      prisma.user.findUnique({ where: { email: organizationEmail } }),
    ]);

  if (existingOrgByEmail)
    throw new ConflictError("Organization with this email already exists");

  if (existingOrgBySlug)
    throw new ConflictError("Organization name is already taken");

  if (existingUser)
    throw new ConflictError("A user with this email already exists");

  const passwordHash = await hashPassword(password);
  const emailDomain = organizationEmail.split("@")[1];

  let organizationId: string;
  let userId: string;

  const result = await prisma.$transaction(async (transaction) => {
    const user = await transaction.user.create({
      data: {
        name: `${organizationName.toUpperCase()}_${OrganizationRole.ORG_ADMIN}`,
        email: organizationEmail,
        isActive: true,
      },
    });
    userId = user.id;

    await transaction.localCredential.create({
      data: {
        userId,
        passwordHash,
      },
    });

    const baseSlug = slugify(organizationName);
    const uniqueSlug = await getUniqueSlug(baseSlug);

    const organization = await transaction.organization.create({
      data: {
        name: organizationName,
        primaryEmail: organizationEmail,
        domain: emailDomain,
        createdByUserId: userId,
        slug: uniqueSlug,
      },
    });
    organizationId = organization.id;

    await transaction.organizationUser.create({
      data: {
        organizationId,
        userId,
        role: OrganizationRole.ORG_ADMIN,
      },
    });

    await transaction.userProfile.create({
      data: { userId },
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

    return { organizationId, userId };
  });

  console.log("Created organization with ID:", result.organizationId);

  return result;
}
