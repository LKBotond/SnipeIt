import { getCanvas } from "./crop";
import type { ImageExtractionRequest } from "../background/messaging/utils/commonInterfaces";
import { SUPPORTED_FORMATS } from "../popup/app/views/options/formats";
const { canvas, ctx, formats } = initialize();

export async function fetchAndConvertImg(request: ImageExtractionRequest) {
  if (!formats.has(request.format)) {
    console.debug("Invalid file format requested");
    throw new Error("Invalid file format requested" + request.format);
  }
  const img = await fetchImg(request);
  resizeCanvas(img);
  drawImage(img, ctx);
  return canvas.toDataURL(request.format);
}

function fetchImg(request: ImageExtractionRequest): Promise<HTMLImageElement> {
  const img = new Image();
  if (request.img.startsWith("http")) {
    img.crossOrigin = "anonymous";
  }

  return new Promise((resolve, reject) => {
    img.onload = () => resolve(img);
    img.onerror = img.onerror = () =>
      reject(new Error(`Failed to load ${request.img}`));
    img.src = request.img;
  });
}

function drawImage(img: HTMLImageElement, ctx: CanvasRenderingContext2D) {
  ctx.drawImage(img, 0, 0);
}

function resizeCanvas(img: HTMLImageElement) {
  canvas.width = img.naturalWidth;
  canvas.height = img.naturalHeight;
  ctx.clearRect(0, 0, canvas.width, canvas.height);
}
function initialize() {
  const { canvas, ctx } = getCanvas();
  const formats = new Set(SUPPORTED_FORMATS.map((format) => format.mime));
  return { canvas, ctx, formats };
}
