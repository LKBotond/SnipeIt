import { ShortCut } from "../popup/app/views/options/capture";
import { Formats } from "../popup/app/views/options/formats";
import {
  deleteFromLocal,
  loadFromLocal,
  saveToLocal,
} from "./messaging/utils/persistence";

export function loadDefault(): ShortCut {
  return { combination: ["ControlLeft", "ShiftLeft", "KeyS"] };
}

export function saveShortCut(shortcut: ShortCut) {
  return saveToLocal("userSpecific", shortcut);
}

export function deleteUserShortcut() {
  return deleteFromLocal("userSpecific");
}

export function loadUsersShortCut(): Promise<ShortCut | undefined> {
  return loadFromLocal("userSpecific");
}

export function loadUsersLanguagePacks(): Promise<string[] | undefined> {
  return loadFromLocal("languagePacks");
}
export function saveUserLanguagePacks(languagePacks: string[]) {
  return saveToLocal("languagePacks", languagePacks);
}
export function loadDefaultFormat():Formats[] {
  return [{name:"png",mime:"image/png"}]
}

export function saveUserFormats(formats: Formats[]) {
  return saveToLocal("userFormats", formats)
}

export function deleteUserFormats() {
  return deleteFromLocal("userFormats")
}
export function loadUserFormats(): Promise<Formats[] | undefined> {
  return loadFromLocal("userFormats")
}