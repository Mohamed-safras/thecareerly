import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

import { prisma } from "@/lib/prisma";

import { ForbiddenError, UnauthorizedError } from "@/lib/error/http-error";
import { TeamRoleType } from "@/types/roles";

export async function requireUser() {
  const session = await getServerSession(authOptions);
  if (!session?.user?.email)
    throw new UnauthorizedError("Unauthorized Sign in required.");

  const user = await prisma.user.findUnique({
    where: { email: session.user.email },
    select: {
      id: true,
      email: true,
      name: true,
      userType: true,
    },
  });

  if (!user)
    throw new UnauthorizedError("No application user linked to this account.");

  return user;
}

export async function requireTeamRole(
  teamId: string,
  userId: string,
  roles: TeamRoleType[]
) {
  const membership = await prisma.teamUser.findFirst({
    where: { team_id: teamId, user_id: userId, role: { in: roles } },
  });
  if (!membership)
    throw new ForbiddenError("You do not have permission for this team.");
}

export async function requireOrgId() {
  const user = await requireUser();
  console.log(user.id);
  const membership = await prisma.teamUser.findFirst({
    where: { user_id: user.id },
    include: {
      team: {
        select: { organizationId: true },
      },
    },
  });

  if (!membership?.team?.organizationId) {
    throw new ForbiddenError("No organization linked to your account.");
  }

  return membership.team.organizationId;
}
