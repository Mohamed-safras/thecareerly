// lib/uploadsVault.ts
const vault = new Map<string, File>();

export function putFile(file: File) {
  const id = crypto.randomUUID();
  vault.set(id, file);
  return id;
}

export function getFile(id?: string | null) {
  return id ? vault.get(id) : undefined;
}

export function removeFile(id?: string | null) {
  if (id) vault.delete(id);
}
