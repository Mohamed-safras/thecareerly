export function isFile(value: File | string | null): value is File {
  return typeof File !== "undefined" && value instanceof File;
}

export function toBuffer(file: File): Promise<Buffer> {
  return file.arrayBuffer().then((ab) => Buffer.from(ab));
}
