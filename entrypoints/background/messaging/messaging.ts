import type { SelectionRectangle } from "@/entrypoints/content/drawings";
import type { ShortCut } from "../../popup/app/views/options/capture";
import {
  GET_SHORTCUT,
  SET_SHORTCUT,
  RESET_SHORTCUT,
  PROCESS_IMG,
  EXTRACT_TXT,
  EXTRACT_IMG,
  TRANSFORM_IMG,
  UPDATE_LANG,
  SET_LANG,
  INITIALIZE,
  GET_LANG,
  GET_FORMATS,
  SET_FORMATS,
} from "./utils/actions";

import type {
  TextExtractionRequest,
  ImageExtractionRequest,
} from "./utils/commonInterfaces";
import type { Formats } from "@/entrypoints/popup/app/views/options/formats";

function sendMessage<T_Message, T_Response>(
  message: T_Message,
): Promise<T_Response> {
  return browser.runtime.sendMessage(message) as Promise<T_Response>;
}

//used for poup -> background messaging
export function getShortcut(): Promise<ShortCut> {
  return sendMessage({ action: GET_SHORTCUT });
}
export function setNewShortcut(shortcut: ShortCut): Promise<ShortCut> {
  return sendMessage({ action: SET_SHORTCUT, payload: shortcut });
}
export function resetShortcut(): Promise<ShortCut> {
  return sendMessage({ action: RESET_SHORTCUT });
}
export function updateLanguagePacks(languages: string[]): Promise<void> {
  return sendMessage({ action: UPDATE_LANG, payload: languages });
}
export function getActiveLanguagePacks(): Promise<string[]> {
  return sendMessage({ action: GET_LANG });
}
export function getActiveFormats(): Promise<Formats[]> {
  return sendMessage({ action: GET_FORMATS });
}
export function updateActiveFormats(newFormats: Formats[]): Promise<void> {
  return sendMessage({ action: SET_FORMATS, payload: newFormats });
}

//used in content -> background messaging
export function processImage(
  textExtractionRequest: TextExtractionRequest,
): Promise<string> {
  return sendMessage({ action: PROCESS_IMG, payload: textExtractionRequest });
}

export function transformImg(
  imgExtractionRequest: ImageExtractionRequest,
): Promise<string> {
  return sendMessage({ action: TRANSFORM_IMG, payload: imgExtractionRequest });
}

export function captureScreen(
  selectionRectangle: SelectionRectangle,
): Promise<void> {
  return sendMessage({ action: PROCESS_IMG, payload: selectionRectangle });
}

//used in background -> offscreen messaging
export function extractText(payload: TextExtractionRequest): Promise<string> {
  return sendMessage({ action: EXTRACT_TXT, payload: payload });
}
export function extractImg(
  textExtractionRequest: ImageExtractionRequest,
): Promise<string> {
  return sendMessage({ action: EXTRACT_IMG, payload: textExtractionRequest });
}

export function setLanguages(languages: string[]): Promise<void> {
  return sendMessage({ action: SET_LANG, payload: languages });
}

export function initializeWorker(languages: string[]): Promise<Boolean> {
  return sendMessage({ action: INITIALIZE, payload: languages });
}
