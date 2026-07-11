import { browser } from "wxt/browser";
import { deleteUserFormats, loadDefaultFormat, loadUserFormats, saveUserFormats } from "../storage";
import { SUPPORTED_FORMATS } from "../../popup/app/views/options/formats";
import { extractImg, processImage } from "../messaging/messaging";
import { ImageExtractionRequest } from "../messaging/utils/commonInterfaces";
const id = "snipeIt"
const title = "Snipe"
export async function initializeContextMenus() {
  const userFormats = await handleGetUserFormats()
  const names = userFormats.map(format => format.name)

  if (userFormats.length === 1) {
    initializeSingular(userFormats[0].name)
    return;
  }
  createContextMenu(id)
  initializeMultiple(names, id)
}
async function handleGetUserFormats() {
  let userFormats = await loadUserFormats();
  if (!userFormats) {
    userFormats = loadDefaultFormat()
  }
  return userFormats
}
export async function handleContextUpdate(oldFormats: string[], newFormats: string[]) {
  await demountContext(oldFormats)
  await deleteUserFormats()
  await saveUserFormats(newFormats)
  await initializeContextMenus()
}
export async function handleConversion(info: Browser.contextMenus.OnClickData) {
  const { name, url } = extractContextData(info);
  const format = SUPPORTED_FORMATS.find(format => format.name === name)
  if (!url || !name || !format) throw new Error("Image data inexistent or corrupted")
  const dataURL = await extractImg({ img: url, format: format.mime })
  return { name, dataURL }
}
async function demountContext(oldFormats: string[]) {
  await Promise.all(
    oldFormats.map((format) => browser.contextMenus.remove(format))
  );

  await browser.contextMenus.remove(id);
}

function extractContextData(info: Browser.contextMenus.OnClickData) {
  const name = info.menuItemId;
  const url = info.srcUrl;
  return { name, url }
}
function initializeSingular(userFormat: string) {
  createContextMenu(userFormat)
}
function initializeMultiple(userFormats: string[], parentId: string) {
  userFormats.forEach((format) => createContextMenu(format, parentId))
}
function createContextMenu(format: string, parentId?: string) {
  const options: Browser.contextMenus.CreateProperties = {
    id: format,
    title: title + `as .${format}`,
    contexts: ["image"],
  };

  if (parentId) {
    options.parentId = parentId;
  }

  browser.contextMenus.create(options);
}
