import Tesseract from "tesseract.js";
import { browser } from "wxt/browser";

let worker: Tesseract.Worker | null = null;

let languages: string[] = [];

function setLanguagePacks(langugePacks: string[]) {
  languages = langugePacks;
}

export async function initializeWorker() {
  if (worker) {
    await worker.terminate();
  }
  worker = await Tesseract.createWorker(languages, 1, {
    workerPath: browser.runtime.getURL("/tesseract/worker.min.js"),
    corePath: browser.runtime.getURL("/tesseract/tesseract-core-simd.wasm.js"),
    workerBlobURL: false,
  });
  if (worker) {
    return true;
  }
  return false;
}
export async function updateLangPreferences(languagePacks: string[]) {
  setLanguagePacks(languagePacks);
  await initializeWorker();
}
export async function extractText(image: string) {
  if (!worker) {
    throw new Error("No worker detected");
  }
  const {
    data: { text },
  } = await worker.recognize(image);
  return text;
}
