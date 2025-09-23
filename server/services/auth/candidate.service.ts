import { prisma } from "@/lib/prisma";
import { getEmailDomain, isOrgEmail } from "@/server/auth/policy";
import { hashPassword, verifyPassword } from "@/server/auth/crypto";
import type { BasicUser } from "@/types/basic-user";
import { ConflictError } from "@/lib/error/http-error";

export async function candidateSignUp(
  emailRaw: string,
  password: string,
  name: string,
  phone: string
): Promise<{
  userId: string;
  email: string | null;
  name: string | null;
  phone: string | null;
}> {
  const email = emailRaw.toLowerCase();

  // Block organization users
  if (isOrgEmail(email)) {
    throw new ConflictError(
      "Organization users must use SSO or their provisioned account."
    );
  }

  // Check if email already exists
  const existingEmailUser = await prisma.user.findUnique({
    where: { email },
  });

  // Check if phone already exists
  const existingPhoneUser = await prisma.user.findUnique({
    where: { phone },
  });

  // Handle phone already registered
  if (existingPhoneUser) {
    throw new ConflictError("The provided phone is already registered.");
  }

  // Email exists → maybe already registered or just needs credentials
  if (existingEmailUser) {
    const localCredentials = await prisma.localCredential.findUnique({
      where: { userId: existingEmailUser.id },
    });

    // Email fully registered
    if (localCredentials) {
      throw new ConflictError(
        `Account already exists with this email ${existingEmailUser.email}. Please sign in.`
      );
    }

    // Email exists but no credentials → attach credentials now
    const passwordHash = await hashPassword(password);

    await prisma.localCredential.create({
      data: { userId: existingEmailUser.id, passwordHash },
    });

    return {
      userId: existingEmailUser.id,
      name: existingEmailUser.name,
      email: existingEmailUser.email,
      phone: existingEmailUser.phone,
    };
  }

  // All checks passed → create user and credentials
  const passwordHash = await hashPassword(password);

  const user = await prisma.user.create({
    data: {
      email,
      name,
      userType: "Candidate",
      emailDomain: getEmailDomain(email),
      phone,
    },
    select: { id: true, email: true, name: true, phone: true },
  });

  await prisma.localCredential.create({
    data: { userId: user.id, passwordHash },
  });

  return {
    userId: user.id,
    email: user.email,
    name: user.name,
    phone: user.phone,
  };
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
