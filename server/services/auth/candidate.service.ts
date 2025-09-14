import { prisma } from "@/lib/prisma";
import { getEmailDomain, isOrgEmail } from "@/server/auth/policy";
import { hashPassword, verifyPassword } from "@/server/auth/crypto";
import type { BasicUser } from "@/types/basic-user";
import { ConflictError } from "@/lib/error/http-error";

export async function candidateSignUp(
  emailRaw: string,
  password: string,
  name?: string
): Promise<{ userId: string; email: string | null; name: string | null }> {
  const email = emailRaw.toLowerCase();
  if (isOrgEmail(email)) {
    throw new ConflictError(
      "Organization users must use SSO or their provisioned account."
    );
  }

  const existingUser = await prisma.user.findUnique({ where: { email } });

  if (existingUser) {
    const localCredentials = await prisma.localCredential.findUnique({
      where: { userId: existingUser.id },
    });

    if (localCredentials)
      throw new ConflictError("Account already exists. Please sign in.");

    const passwordHash = await hashPassword(password);

    await prisma.localCredential.create({
      data: { userId: existingUser.id, passwordHash },
    });

    return {
      userId: existingUser.id,
      name: existingUser.name,
      email: existingUser.email,
    };
  }

  const passwordHash = await hashPassword(password);

  const user = await prisma.user.create({
    data: {
      email,
      name,
      userType: "Candidate",
      emailDomain: getEmailDomain(email),
    },
    select: { id: true, email: true, name: true },
  });

  await prisma.localCredential.create({
    data: { userId: user.id, passwordHash },
  });
  return { userId: user.id, email: user.email, name: user.name };
}

export async function candidateCredentialsAuthorize(
  emailRaw: string,
  password: string
): Promise<BasicUser | null> {
  const email = emailRaw.toLowerCase();

  if (isOrgEmail(email)) return null;

  const user = await prisma.user.findUnique({ where: { email } });

  if (!user) return null;

  const localCredential = await prisma.localCredential.findUnique({
    where: { userId: user.id },
  });

  if (!localCredential) return null;

  const loginOk = await verifyPassword(password, localCredential.passwordHash);

  if (!loginOk) return null;

  return {
    id: user.id,
    email: user.email,
    name: user.name,
    image: user.image,
    userType: user.userType ?? null,
  };
}
