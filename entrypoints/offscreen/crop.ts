import { TextExtractionRequest } from "../background/messaging/utils/commonInterfaces";
import { SelectionRectangle } from "../content/drawings";

export async function handleCropping(request: TextExtractionRequest) {
  try {
    const { canvas, ctx } = getCanvas();
    console.debug("canvas found", canvas);

    const img = await decodeImage(request.img);
    console.debug("image Decoded: ", img);

    cropAndDrawImage(ctx, img, request.selectionRectangle);
    console.debug("Cropped: ", img);

    const cropped = extractImgAsPNG(canvas);
    console.debug("Extracted: ", cropped);
    return cropped;
  } catch (error) {
    console.error("Error in handleCropping:", error);
    throw error;
  }
}

export function getCanvas() {
  let canvas = document.querySelector<HTMLCanvasElement>("canvas");
  if (!canvas) {
    canvas = document.createElement("canvas");
    document.body.appendChild(canvas);
  }
  const ctx = canvas.getContext("2d");
  if (!ctx) {
    throw new Error("Failed to get 2D rendering context.");
  }

  return { canvas, ctx };
}

export function extractImgAs(canvas: HTMLCanvasElement, format: string) {
  return canvas.toDataURL(format);
}

async function decodeImage(base64Data: string) {
  console.debug("Input string length:", base64Data.length);

  const [header, base64] = base64Data.split(",");
  const contentType = header.split(":")[1].split(";")[0];

  const byteCharacters = atob(base64);
  const byteNumbers = new Uint8Array(byteCharacters.length);
  for (let i = 0; i < byteCharacters.length; i++) {
    byteNumbers[i] = byteCharacters.charCodeAt(i);
  }
  const blob = new Blob([byteNumbers], { type: contentType });

  const blobUrl = URL.createObjectURL(blob);
  console.debug("Created Blob URL:", blobUrl);

  return new Promise<HTMLImageElement>((resolve, reject) => {
    const image = new Image();

    image.onload = () => {
      URL.revokeObjectURL(blobUrl);
      resolve(image);
    };

    image.onerror = (e) => {
      URL.revokeObjectURL(blobUrl);
      reject(new Error("Failed to load Blob URL"));
    };

    image.src = blobUrl;
  });
}

function cropAndDrawImage(
  ctx: CanvasRenderingContext2D,
  image: HTMLImageElement,
  cropRectangle: SelectionRectangle,
) {
  const { x, y, width, height } = scaleToDpr(cropRectangle);
  ctx.canvas.width = width;
  ctx.canvas.height = height;

  ctx.drawImage(image, x, y, width, height, 0, 0, width, height);
}

function scaleToDpr(cropRectangle: SelectionRectangle) {
  const dpr = cropRectangle.dpr;
  const x = cropRectangle.x * dpr;
  const y = cropRectangle.y * dpr;
  const width = cropRectangle.width * dpr;
  const height = cropRectangle.height * dpr;
  return { x, y, width, height };
}

function extractImgAsPNG(canvas: HTMLCanvasElement) {
  return canvas.toDataURL("image/png");
}
