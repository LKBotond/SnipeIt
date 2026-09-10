import { browser } from "wxt/browser";
import {
  deleteUserFormats,
  loadDefaultFormat,
  loadUserFormats,
  saveUserFormats,
} from "../storage";
import type { Formats } from "../../popup/app/views/options/formats";
import { SUPPORTED_FORMATS } from "../../popup/app/views/options/formats";
import { extractImg } from "../messaging/messaging";

const id = "snipeIt";
const title = "Snipe";

export async function initializeContextMenus() {
  await browser.contextMenus.removeAll();

  let userFormats = await handleGetUserFormats();
  if (!userFormats || userFormats.length === 0) {
    userFormats = [{ name: "png", mime: "image/png" }];
  }

  if (userFormats.length === 1) {
    const format = userFormats[0];

    if (!format) {
      throw new Error("Expected a user format");
    }

    initializeSingular(format);
    return;
  }

  initializeMultiple(userFormats, id);
}

async function handleGetUserFormats() {
  let userFormats = await loadUserFormats();
  if (!userFormats) {
    userFormats = loadDefaultFormat();
  }
  return userFormats;
}

export async function handleContextUpdate(newFormats: Formats[]) {
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

function extractContextData(info: Browser.contextMenus.OnClickData) {
  const name = info.menuItemId;
  const url = info.srcUrl;
  return { name: name.toString(), url };
}

function initializeSingular(userFormat: Formats) {
  createContextMenu(userFormat.name, `${title} as .${userFormat.name}`);
}

function initializeMultiple(userFormats: Formats[], parentId: string) {
  createContextMenu(parentId, `Snipe It`);

  userFormats.forEach((format) => {
    createContextMenu(format.name, `as .${format.name}`, parentId);
  });
}

function createContextMenu(id: string, title = "", parentId?: string) {
  browser.contextMenus.create({
    id,
    parentId,
    title: title || `as .${id}`,
    contexts: ["image"],
  });
}
