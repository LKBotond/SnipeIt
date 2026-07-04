import { TextExtractionRequest } from "../background/messaging/utils/commonInterfaces";
import { SelectionRectangle } from "../content/drawings";

export async function handleCropping(request: TextExtractionRequest) {
  try {
    const { canvas, ctx } = getCanvas();
    console.log("canvas found", canvas);

    const img = await decodeImage(request.img);
    console.log("image Decoded: ", img);

    cropAndDrawImage(ctx, img, request.selectionRectangle);
    console.log("Cropped: ", img);

    const cropped = extractImgAsPNG(canvas);
    console.log("Extracted: ", cropped);
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
  console.log("Input string length:", base64Data.length);

  // 1. Convert base64 to Blob
  // Split the data URL (e.g., "data:image/jpeg;base64,....")
  const [header, base64] = base64Data.split(',');
  const contentType = header.split(':')[1].split(';')[0];
  
  const byteCharacters = atob(base64);
  const byteNumbers = new Uint8Array(byteCharacters.length);
  for (let i = 0; i < byteCharacters.length; i++) {
    byteNumbers[i] = byteCharacters.charCodeAt(i);
  }
  const blob = new Blob([byteNumbers], { type: contentType });

  // 2. Create a Blob URL
  const blobUrl = URL.createObjectURL(blob);
  console.log("Created Blob URL:", blobUrl);

  return new Promise<HTMLImageElement>((resolve, reject) => {
    const image = new Image();
    
    image.onload = () => {
      // 3. IMPORTANT: Revoke the URL to free memory
      URL.revokeObjectURL(blobUrl);
      resolve(image);
    };
    
    image.onerror = (e) => {
      URL.revokeObjectURL(blobUrl);
      reject(new Error("Failed to load Blob URL"));
    };
    
    // Assign the small Blob URL instead of the massive base64 string
    image.src = blobUrl;
  });
}

function cropAndDrawImage(
  ctx: CanvasRenderingContext2D,
  image: HTMLImageElement,
  cropRectangle: SelectionRectangle,
) {
  ctx.canvas.width = cropRectangle.width;
  ctx.canvas.height = cropRectangle.height;

  ctx.drawImage(
    image,
    cropRectangle.x,
    cropRectangle.y,
    cropRectangle.width,
    cropRectangle.height,
    0,
    0,
    cropRectangle.width,
    cropRectangle.height,
  );
}
function extractImgAsPNG(canvas: HTMLCanvasElement) {
  return canvas.toDataURL("image/png");
}
