// server/auth/azure-photo.ts
export async function fetchAzurePhotoAsDataUrl(
  accessToken: string
): Promise<string | null> {
  const res = await fetch("https://graph.microsoft.com/v1.0/me/photo/$value", {
    headers: { Authorization: `Bearer ${accessToken}` },
  });
  if (!res.ok) return null;
  const buffer = await res.arrayBuffer();
  const base64 = Buffer.from(buffer).toString("base64");
  // Graph returns JPEG by default for photo endpoint
  return `data:image/jpeg;base64,${base64}`;
}
