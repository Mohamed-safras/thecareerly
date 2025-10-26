import { prisma } from "@/lib/prisma";

export async function getUniqueSlug(baseSlug: string) {
  let slug = baseSlug;
  let count = 1;
  while (
    await prisma.organization.findUnique({
      where: { slug },
      select: { id: true },
    })
  ) {
    slug = `${baseSlug}-${count++}`;
  }
  return slug;
}
