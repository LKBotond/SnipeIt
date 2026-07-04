const CANVAS_ID = "SnipeIt-Canvas";

export function insertCanvas() {
  let canvas = document.getElementById(CANVAS_ID) as HTMLCanvasElement | null;
  const dpr = window.devicePixelRatio;

  if (!canvas) {
    canvas = document.createElement("canvas");
    canvas.id = CANVAS_ID;

    setupCanvasStyling(canvas);
    setupCanvasDimensions(canvas, dpr);
    document.body.appendChild(canvas);
  }
  const ctx = setupContext(canvas, dpr);
  return { canvas, ctx };
}
export function removeCanvas() {
  const canvas = document.getElementById(CANVAS_ID);
  const parent = canvas?.parentElement;
  if (!canvas || !parent) {
    return;
  }
  parent.removeChild(canvas);
}
function setupContext(canvas: HTMLCanvasElement, dpr: number) {
  const ctx = canvas.getContext("2d");
  if (!ctx) {
    throw new Error("2D canvas not supported");
  }
  ctx.fillStyle = "rgba(0,0,0,0.2)";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  ctx.setTransform(1, 0, 0, 1, 0, 0);
  ctx.scale(dpr, dpr);
  return ctx;
}

function setupCanvasDimensions(canvas: HTMLCanvasElement, dpr: number) {
  canvas.width = window.innerWidth * dpr;
  canvas.height = window.innerHeight * dpr;
}

function setupCanvasStyling(canvas: HTMLCanvasElement) {
  canvas.style.position = "fixed";
  canvas.style.top = "0";
  canvas.style.left = "0";
  canvas.style.width = "100vw";
  canvas.style.height = "100vh";
  canvas.style.zIndex = "2147483647";
  canvas.style.cursor = "crosshair";
}
