import { browser } from "wxt/browser";
import { loadUsersLanguagePacks } from "./storage";
import { initializeWorker } from "./messaging/messaging";
async function checkOrCreateOffscreen() {
  if (await browser.offscreen.hasDocument()) {
    return;
  }

  await browser.offscreen.createDocument({
    url: "offscreen.html",
    reasons: ["CLIPBOARD"],
    justification:
      "Need an offscreen document to process screenshots into TXT, and or any picture to any format",
  });
}
async function initializeOCR() {
  let languagepacks = await loadUsersLanguagePacks();
  if (!languagepacks) {
    languagepacks = ["eng"];
  }
  const success = await initializeWorker(languagepacks);
  if (!success) throw new Error("Language packs failed to load");
}

export async function initializeOFfscreen() {
  await checkOrCreateOffscreen();
  await initializeOCR();
}
