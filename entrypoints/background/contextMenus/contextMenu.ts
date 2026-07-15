import { browser } from "wxt/browser";
import {
  deleteUserFormats,
  loadDefaultFormat,
  loadUserFormats,
  saveUserFormats,
} from "../storage";
import { Formats, SUPPORTED_FORMATS } from "../../popup/app/views/options/formats";
import { extractImg, processImage } from "../messaging/messaging";
import { ImageExtractionRequest } from "../messaging/utils/commonInterfaces";
const id = "snipeIt";
const title = "Snipe";
export async function initializeContextMenus() {
  let userFormats = await handleGetUserFormats();
  if (!userFormats) {
    userFormats = [{ name: "png:", mime: "image/png" }];
  }
  const names = userFormats.map((format) => format.name);

  if (userFormats.length === 1) {
    initializeSingular(userFormats[0].name);
    return;
  }
  createContextMenu(id);
  initializeMultiple(names, id);
}
async function handleGetUserFormats() {
  let userFormats = await loadUserFormats();
  if (!userFormats) {
    userFormats = loadDefaultFormat();
  }
  return userFormats;
}
export async function handleContextUpdate(
  oldFormats: string[],
  newFormats: Formats[],
) {
  await demountContext(oldFormats);
  await deleteUserFormats();
  await saveUserFormats(newFormats);
  await initializeContextMenus();
}
export async function handleConversion(info: Browser.contextMenus.OnClickData) {
  const { name, url } = extractContextData(info);
  const format = SUPPORTED_FORMATS.find((format) => {
    console.debug("checking for format: ", format);
    return format.name === name;
  });
  console.debug("Supported Formats: ", SUPPORTED_FORMATS);
  console.debug("url: ", url);
  console.debug("name: ", name);
  console.debug("format: ", format);
  if (!url || !name || !format)
    throw new Error("Image data inexistent or corrupted");
  const dataURL = await extractImg({ img: url, format: format.mime });
  console.debug("extracted DataURL: ", dataURL);
  return { name, dataURL };
}
async function demountContext(oldFormats: string[]) {
  await Promise.all(
    oldFormats.map((format) => browser.contextMenus.remove(format)),
  );

  await browser.contextMenus.remove(id);
}

function extractContextData(info: Browser.contextMenus.OnClickData) {
  const name = info.menuItemId;
  const url = info.srcUrl;
  return { name, url };
}
function initializeSingular(userFormat: string) {
  createContextMenu(userFormat);
}
function initializeMultiple(userFormats: string[], parentId: string) {
  userFormats.forEach((format) => createContextMenu(format, parentId));
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
