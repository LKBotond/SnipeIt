import { browser } from "wxt/browser";
import { OffscreenMessageHandler } from "../background/messaging/messageHandlers/offscreenHandler";
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
