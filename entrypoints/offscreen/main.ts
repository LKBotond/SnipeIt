import { browser } from "wxt/browser";
import { OffscreenMessageHandler } from "../background/messaging/messageHandlers/offscreenHandler";
import { TextExtractionRequest } from "../background/messaging/utils/commonInterfaces";
import { extractText, initializeWorker } from "./ocrManager";
import { handleCropping } from "./crop";
import Tesseract from "tesseract.js";
browser.runtime.onMessage.addListener((message, sender, sendResponse) => {
  const action = message?.action;
  const handler =
    OffscreenMessageHandler[action as keyof typeof OffscreenMessageHandler];
  if (handler) {
    Promise.resolve(handler(message.payload))
      .then((result) => sendResponse(result))
      .catch((error) => {
        console.error(error);
        sendResponse(undefined);
      });
  }
  return true;
});
