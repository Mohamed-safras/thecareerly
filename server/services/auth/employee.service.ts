import { prisma } from "@/lib/prisma";

import { isOrgEmail } from "@/server/auth/policy";
import { verifyPassword } from "@/server/auth/crypto";
import type { BasicUser } from "@/types/basic-user";

/** Provisioned credentials login for stakeholders (must exist + be Stakeholder) */
export async function stakeholderCredentialsAuthorize(
  emailRaw: string,
  password: string
): Promise<BasicUser | null> {
  const email = emailRaw.toLowerCase();
  if (!isOrgEmail(email)) return null;

  const user = await prisma.user.findUnique({ where: { email } });

  if (!user || user.userType !== "Employee") return null;

  const localCredentials = await prisma.localCredential.findUnique({
    where: { userId: user.id },
  });

  if (!localCredentials) return null;

  const verifyPasswordForLogin = await verifyPassword(
    password,
    localCredentials.passwordHash
  );

  if (!verifyPasswordForLogin) return null;

  return {
    id: user.id,
    email: user.email,
    name: user.name,
    image: user.image,
    userType: user.userType ?? null,
  };
}

/** OAuth gate for stakeholders: allow only if user already exists & employee */
export async function stakeholderOAuthGateOrCleanup(oauthUser: {
  id?: string;
  email?: string | null;
}): Promise<boolean> {
  const email = (oauthUser.email ?? "").toLowerCase();
  if (!isOrgEmail(email)) return true;

  const existingEmployee = await prisma.user.findUnique({ where: { email } });

  const allowed =
    !!existingEmployee && existingEmployee.userType === "Employee";

  if (
    !allowed &&
    oauthUser.id &&
    (!existingEmployee || existingEmployee.id !== oauthUser.id)
  ) {
    try {
      await prisma.user.delete({ where: { id: oauthUser.id } });
    } catch {}
  }

  return allowed;
}
