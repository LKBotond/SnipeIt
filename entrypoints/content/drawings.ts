interface Point {
  x: number;
  y: number;
}
export interface SelectionRectangle {
  x: number;
  y: number;
  width: number;
  height: number;
}
export function handleDrawing(
  canvas: HTMLCanvasElement,
  ctx: CanvasRenderingContext2D,
): Promise<SelectionRectangle> {
  return new Promise((resolve) => {
    let isDragging = false;

    let start: Point | null = null;
    let current: Point | null = null;

    const onMouseDown = (event: MouseEvent) => {
      isDragging = true;

      start = {
        x: event.clientX,
        y: event.clientY,
      };

      current = start;
    };

    const onMouseMove = (event: MouseEvent) => {
      if (!isDragging || !start) return;

      current = {
        x: event.clientX,
        y: event.clientY,
      };

      drawSelection(canvas, start, current, ctx);
    };

    const onMouseUp = () => {
      isDragging = false;

      if (!start || !current) {
        listenerCleanup();
        return;
      }

      const rectangle = getSelectionRectangle(start, current);
      listenerCleanup();
      resolve(rectangle);
    };
    const listenerCleanup = () => {
      canvas.removeEventListener("mousedown", onMouseDown);
      canvas.removeEventListener("mousemove", onMouseMove);
      canvas.removeEventListener("mouseup", onMouseUp);
    };

    canvas.addEventListener("mousedown", onMouseDown);
    canvas.addEventListener("mousemove", onMouseMove);
    canvas.addEventListener("mouseup", onMouseUp);
  });
}
function getSelectionRectangle(start: Point, end: Point): SelectionRectangle {
  return {
    x: Math.min(start.x, end.x),
    y: Math.min(start.y, end.y),
    width: Math.abs(end.x - start.x),
    height: Math.abs(end.y - start.y),
  };
}

function drawSelection(
  canvas: HTMLCanvasElement,
  start: Point,
  current: Point,
  ctx: CanvasRenderingContext2D,
) {
  if (!start || !current) return;
  const rectangle = getSelectionRectangle(start, current);

  const width = window.innerWidth;
  const height = window.innerHeight;

  ctx.clearRect(0, 0, width, height);

  ctx.fillStyle = "rgba(0, 0, 0, 0.2)";
  ctx.fillRect(0, 0, width, height);

  ctx.clearRect(rectangle.x, rectangle.y, rectangle.width, rectangle.height);

  ctx.strokeStyle = "#4da3ff";
  ctx.lineWidth = 2;
  ctx.strokeRect(rectangle.x, rectangle.y, rectangle.width, rectangle.height);}