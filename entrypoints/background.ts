import { browser } from "wxt/browser";
import { MessageHandler } from "./background/messaging/messageHandlers/backgroundHandler";
import { initializeOffscreen } from "./background/osLifecycle";
import {
  handleConversion,
  initializeContextMenus,
} from "./background/contextMenus/contextMenu";

export default defineBackground(() => {
  initializeContextMenus()
    .then(() => {
      console.debug("context menus initialized");
    })
    .catch((error) => {
      console.error("failed to set up the context menus, ", error);
    });
  initializeOffscreen()
    .then(() => {
      console.debug("Offscreen document checked/set up successfully");
    })
    .catch((error) => {
      console.error("Failed to create offscreen document:", error);
    });

  browser.contextMenus.onClicked.addListener((info) => {
    handleConversion(info)
      .then((converted) => {
        console.debug("conversion results: ", converted);
        browser.downloads.download({
          url: converted.dataURL,
          filename: `converted.${converted.name}`,
          saveAs: true,
        });
      })
      .catch((error) => {
        console.error("Failed to convert image, ", error);
      });
  });
  browser.runtime.onMessage.addListener((message, sender, sendResponse) => {
    console.debug("Message Received: ", message);

    const action = message?.action;
    const handler = MessageHandler[action as keyof typeof MessageHandler];
    if (handler) {
      Promise.resolve((handler as any)(message.payload))
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
