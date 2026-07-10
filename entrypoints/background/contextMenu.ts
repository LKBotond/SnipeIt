import { browser } from "wxt/browser";
export function handleContextMenu(userFormats: string[]) {
  browser.contextMenus.create({
    id: "SnipeIT as",
  });
}
function initializeSingular(userFormats: string) {}
function initializeMultiple(userFormats: string[]) {}
function cereateContextMenu(format: string, parentId?: string) {
  const options: Browser.contextMenus.CreateProperties = {
    id: format,
    title: `as .${format}`,
    contexts: ["image"],
  };

  if (parentId) {
    options.parentId = parentId;
  }

  browser.contextMenus.create(options);
}
