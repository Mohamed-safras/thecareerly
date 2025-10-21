import { prisma } from "@/lib/prisma";
import { verifyPassword } from "@/server/auth/crypto";
import { TeamRole } from "@prisma/client";

export async function login(email: string, password: string) {
  try {
    console.log("Attempting login for:", email);

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
        createdOrganizations: true,
      },
    });

    console.log("User fetched from DB:", user);

    if (!user) {
      console.log("User not found:", email);
      return null;
    }

    if (!user.isActive) {
      console.log("User is inactive:", email);
      return null;
    }

    if (!user.localCredential) {
      console.log("No local credentials found for user:", email);
      return null;
    }

    const isValidPassword = await verifyPassword(
      password,
      user.localCredential.passwordHash
    );

    console.log(
      "Password verification result for",
      email,
      ":",
      isValidPassword
    );

    if (!isValidPassword) {
      console.log("Invalid password for user:", email);
      return null;
    }

    // Determine user roles and organization/team info from TeamUser relationships only
    let roles: TeamRole[] = [];
    let organizationId: string | undefined;
    let teamId: string | undefined;

    // Get roles from TeamUser relationships (single source of truth)
    if (user.teamUsers.length > 0) {
      // Collect all unique roles from all team memberships
      const teamRoles = user.teamUsers.map((teamUser) => teamUser.role);
      roles = [...new Set(teamRoles)]; // Remove duplicates

      // Use primary team (first one) for organizationId and teamId
      const primaryTeamUser = user.teamUsers[0];
      teamId = primaryTeamUser.teamId;
      organizationId = primaryTeamUser.team.organizationId;
    }

    // Check if user created any organizations (add super admin role if not already present)
    if (user.createdOrganizations.length > 0) {
      organizationId = organizationId || user.createdOrganizations[0].id;
      if (!roles.includes(TeamRole.ORGANIZATION_SUPER_ADMIN)) {
        roles.push(TeamRole.ORGANIZATION_SUPER_ADMIN);
      }
    }

    // Default to guest if no roles assigned
    if (roles.length === 0) {
      roles = [TeamRole.GUEST];
    }

    console.log("User login successful for:", email, "with roles:", roles);

    return {
      id: user.id,
      email: user.email,
      name: user.name,
      organizationId,
      teamId,
      roles,
      image: user.image,
    };
  } catch (error) {
    console.error("User credentials auth error:", error);
    return null;
  }
}
