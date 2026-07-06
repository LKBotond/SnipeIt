import { ShortCut } from "../popup/app/views/options/capture";
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
