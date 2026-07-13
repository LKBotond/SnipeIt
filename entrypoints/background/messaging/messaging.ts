import { SelectionRectangle } from "@/entrypoints/content/drawings";
import { ShortCut } from "../../popup/app/views/options/capture";
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
} from "./utils/actions";

import {
  TextExtractionRequest,
  ImageExtractionRequest,
} from "./utils/commonInterfaces";

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
  return sendMessage({ action: SET_SHORTCUT, shortcut });
}
export function resetShortcut(): Promise<ShortCut> {
  return sendMessage({ action: RESET_SHORTCUT });
}
export function updateLanguagePacks(languages: string[]): Promise<void> {
  return sendMessage({ action: UPDATE_LANG, languages });
}
export function getActiveLanguagePacks(): Promise<string[]> {
  return sendMessage({ action: GET_LANG });
}

//used in content -> background messaging
export function processImage(payload: TextExtractionRequest): Promise<string> {
  return sendMessage({ action: PROCESS_IMG, payload });
}

export function transformImg(payload: ImageExtractionRequest): Promise<string> {
  return sendMessage({ action: TRANSFORM_IMG, payload });
}

export function captureScreen(payload: SelectionRectangle): Promise<Boolean> {
  return sendMessage({ action: PROCESS_IMG, payload });
}

//used in background -> offscreen messaging
export function extractText(payload: TextExtractionRequest): Promise<string> {
  return sendMessage({ action: EXTRACT_TXT, payload: payload });
}
export function extractImg(payload: ImageExtractionRequest): Promise<string> {
  return sendMessage({ action: EXTRACT_IMG, payload });
}

export function setLanguages(languages: string[]): Promise<void> {
  return sendMessage({ action: SET_LANG, languages });
}

export function initializeWorker(languages: string[]): Promise<Boolean> {
  return sendMessage({ action: INITIALIZE, languages });
}
