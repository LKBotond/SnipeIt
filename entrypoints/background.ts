import { browser } from "wxt/browser";
import { MessageHandler } from "./background/messaging/messageHandlers/contentBackground";
import { initializeOFfscreen } from "./background/osLifecycle";

export default defineBackground(() => {
  initializeOFfscreen()
    .then(() => {
      console.log("Offscreen document checked/set up successfully");
    })
    .catch((error) => {
      console.error("Failed to create offscreen document:", error);
    });
  browser.runtime.onMessage.addListener((message, sender, sendResponse) => {
    console.log("Message Received: ", message);

    const action = message?.action;
    const handler = MessageHandler[action as keyof typeof MessageHandler];
    if (handler) {
      Promise.resolve((handler as any)(message.payload, sender))
        .then((result) => {
          sendResponse(result);
        })
        .catch((error) => {
          console.error(`Error in handler for ${action}:`, error);
          sendResponse(undefined);
        });

      return true;
    }
  });
});
