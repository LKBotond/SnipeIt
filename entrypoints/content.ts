import { handleDrawing } from "./content/drawings";
import { captureScreen, getShortcut } from "./background/messaging/messaging";
import { insertCanvas, removeCanvas } from "./content/canvas";
import {
  insertLoadingScreen,
  removeLoadingScreen,
} from "./content/loadingScreen";
import {
  addScrollListeners,
  removeScrollListeners,
} from "./content/scrollPrevention";

export default defineContentScript({
  matches: ["*://*/*"],
  async main() {
    const preset = await getShortcut();
    const pressed = new Set<string>();
    let triggered = false;
    let capturing = false;

    const handleKeyDown = (event: KeyboardEvent) => {
      pressed.add(event.code);
      const match = preset.combination.every((key) => pressed.has(key));
      if (match && !triggered && !capturing) {
        triggered = true;
        capturing = true;
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
      addScrollListeners();
      capturing = true;
      try {
        const { canvas, ctx } = insertCanvas();
        let selectionRectangle = await handleDrawing(canvas, ctx);
        removeCanvas();

        if (!selectionRectangle) {
          removeScrollListeners();
          return;
        }

        const capturePromise = captureScreen(selectionRectangle);
        insertLoadingScreen();
        await capturePromise;
      } catch (error) {
        console.error("failed to capture the screenshot: ", error);
      } finally {
        removeCanvas(); //fallback for something unexpected
        removeLoadingScreen();
        removeScrollListeners();
        capturing = false;
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);
  },
});
