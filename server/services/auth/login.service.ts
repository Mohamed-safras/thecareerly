import { prisma } from "@/lib/prisma";
import { verifyPassword } from "@/server/auth/crypto";

export async function login(email: string, password: string) {
  const user = await prisma.user.findUnique({
    where: { email },
    include: {
      localCredential: true,
      teamUsers: {
        include: {
          team: {
            include: {
              organization: true,
            },
          },
        },
      },
      organizationUsers: {
        include: {
          organization: true,
        },
      },
    },
  });

  if (!user || !user.isActive || !user.localCredential) return null;
  const isValidPassword = await verifyPassword(
    password,
    user.localCredential.passwordHash
  );
  if (!isValidPassword) return null;

  // Pick primary org/team for convenience (first found)
  const primaryOrg =
    user.organizationUsers[0]?.organizationId ||
    user.teamUsers[0]?.team.organizationId;
  const primaryTeam = user.teamUsers[0]?.teamId;

  return {
    id: user.id,
    email: user.email,
    name: user.name,
    organizationId: primaryOrg,
    teamId: primaryTeam,
    teamUsers: user.teamUsers ?? [],
    organizationUsers: user.organizationUsers ?? [],
    image: user.image,
    phone: user.phone,
  };
}
