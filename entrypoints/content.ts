import { browser } from "wxt/browser";
import { ShortCut } from "./popup/app/views/options/capture";
import { handleDrawing } from "./content/drawings";
import { captureScreen, getShortcut } from "./background/messaging/messaging";
import { insertCanvas, removeCanvas } from "./content/canvas";
export default defineContentScript({
  matches: ["*://*/*"],
  async main() {
    const preset = await getShortcut();
    const pressed = new Set<string>();
    let triggered = false;

    const handleKeyDown = (event: KeyboardEvent) => {
      pressed.add(event.code);
      const match = preset.combination.every((key) => pressed.has(key));
      if (match && !triggered) {
        triggered = true;
        captureScreenshot();
      }
    };
    const handleKeyUp = (event: KeyboardEvent) => {
      pressed.delete(event.code);
      const match = preset.combination.every((key) => pressed.has(key));
      if (!match) {
        triggered = false;
      }
    };
    const captureScreenshot = async () => {
      const { canvas, ctx } = insertCanvas();
      let selectionRectangle = await handleDrawing(canvas, ctx);
      if (selectionRectangle) {
        captureScreen(selectionRectangle);
      }
      removeCanvas();
    };

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);
  },
});
