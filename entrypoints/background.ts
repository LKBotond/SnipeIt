import { browser } from "wxt/browser";
import { MessageHandler } from "./background/messaging/messageHandlers/contentBackground";
import { initializeOFfscreen } from "./background/osLifecycle";
import { handleConversion, initializeContextMenus } from "./background/contextMenus/contextMenu";

export default defineBackground(() => {
  initializeContextMenus().then(() => {
    console.log("context menus initialized")
  }).catch((error) => {
    console.error("failed to set up the context menus, ", error)
  })
  initializeOFfscreen()
    .then(() => {
      console.log("Offscreen document checked/set up successfully");
    })
    .catch((error) => {
      console.error("Failed to create offscreen document:", error);
    });

  browser.contextMenus.onClicked.addListener(async (info) => {
    const converted = await handleConversion(info);
    browser.downloads.download({ url: converted.dataURL, filename: `converted.${converted.name}` })

  })

  browser.runtime.onMessage.addListener((message, sender, sendResponse) => {
    console.log("Message Received: ", message);

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
