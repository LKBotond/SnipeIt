import { getCanvas } from "./crop";
import { ImageExtractionRequest } from "../background/messaging/utils/commonInterfaces";
const { canvas, ctx } = getCanvas();

function drawImage(img: HTMLImageElement, ctx: CanvasRenderingContext2D) {
  ctx.drawImage(img, 0, 0);
}
export async function fetchAndConvertImg(request: ImageExtractionRequest) {
  const img = await fetchImg(request);
  resizeCanvas(img);
  drawImage(img, ctx);
  return canvas.toDataURL(request.format);
}

async function fetchImg(
  request: ImageExtractionRequest,
): Promise<HTMLImageElement> {
  const img = new Image();
  if (request.img.startsWith("http")) {
    img.crossOrigin = "anonymous";
  }

  await new Promise<void>((resolve, reject) => {
    img.onload = () => resolve();
    img.onerror = reject;
    img.src = request.img;
  });

  return img;
}

function resizeCanvas(img: HTMLImageElement) {
  canvas.width = img.naturalWidth;
  canvas.height = img.naturalHeight;
  ctx.clearRect(0, 0, canvas.width, canvas.height);
}
const supportedFormats = [
  "image/png",
  "image/jpg",
  "image/bmp",
  "image/avif",
  "image/webp",
];
