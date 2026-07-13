export interface Formats {
  name: string;
  mime: string;
}
export const SUPPORTED_FORMATS: Formats[] = [
  { name: "png", mime: "image/png" },
  { name: "jpeg", mime: "image/jpeg" },
  { name: "bmp", mime: "image/bmp" },
  { name: "avif", mime: "image/avif" },
  { name: "webp", mime: "image/webp" },
];
