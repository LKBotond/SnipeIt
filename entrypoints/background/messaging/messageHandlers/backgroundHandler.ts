import type { ShortCut } from "../../../popup/app/views/options/capture";
import type { SelectionRectangle } from "@/entrypoints/content/drawings";
import type { Formats } from "@/entrypoints/popup/app/views/options/formats";
import type { ImageExtractionRequest } from "../utils/commonInterfaces";
import {
  loadUsersShortCut,
  loadDefault,
  saveShortCut,
  deleteUserShortcut,
  loadUsersLanguagePacks,
  saveUserLanguagePacks,
  loadUserFormats,
  loadDefaultFormat,
  saveUserFormats,
} from "../../storage";
import {
  GET_SHORTCUT,
  SET_SHORTCUT,
  PROCESS_IMG,
  TRANSFORM_IMG,
  UPDATE_LANG,
  GET_LANG,
  RESET_SHORTCUT,
  GET_FORMATS,
  SET_FORMATS,
} from "../utils/actions";
import { extractImg, setLanguages, updateLanguagePacks } from "../messaging";
import { grabAndExtractViewPort } from "../../screenshot";

import { handleContextUpdate } from "../../contextMenus/contextMenu";

interface MessageMap {
  GET_SHORTCUT: {
    payload: undefined;
    response: ShortCut;
  };
  SET_SHORTCUT: {
    payload: ShortCut;
    response: ShortCut;
  };
  RESET_SHORTCUT: {
    payload: void;
    response: ShortCut;
  };
  PROCESS_IMG: {
    payload: SelectionRectangle;
    response: boolean;
  };
  TRANSFORM_IMG: {
    payload: ImageExtractionRequest;
    response: string;
  };
  UPDATE_LANG: {
    payload: string[];
    response: void;
  };
  GET_LANG: {
    payload: void;
    response: string[];
  };
  GET_FORMATS: {
    payload: void;
    response: Formats[];
  };
  SET_FORMATS: {
    payload: Formats[];
    response: void;
  };
}

type MessageHandlerMap = {
  [K in keyof MessageMap]: (
    payload: MessageMap[K]["payload"],
  ) => Promise<MessageMap[K]["response"]> | MessageMap[K]["response"];
};

export const MessageHandler: MessageHandlerMap = {
  GET_SHORTCUT: async () => {
    console.debug("Invoked: ", GET_SHORTCUT);
    const userSpecific = await loadUsersShortCut();
    if (!userSpecific) {
      const defaultSet = loadDefault();
      return defaultSet;
    }

    return userSpecific;
  },

  SET_SHORTCUT: async (payload) => {
    console.debug("Invoked: ", SET_SHORTCUT);
    await saveShortCut(payload);
    const loaded = await loadUsersShortCut();
    if (!loaded) {
      throw new Error("Shortcut saving failed");
    }
    return loaded;
  },
  RESET_SHORTCUT: async () => {
    console.debug("Invoked: ", RESET_SHORTCUT);
    await deleteUserShortcut();
    return loadDefault();
  },
  PROCESS_IMG: async (payload) => {
    console.debug("Invoked: ", PROCESS_IMG);
    const extracted = await grabAndExtractViewPort(payload);
    if (extracted) return true;
    return false;
  },
  TRANSFORM_IMG: async (payload) => {
    console.debug("Invoked: ", TRANSFORM_IMG);
    return await extractImg(payload);
  },
  UPDATE_LANG: async (payload) => {
    console.debug("invoked: ", UPDATE_LANG);
    await saveUserLanguagePacks(payload);
    return setLanguages(payload);
  },
  GET_LANG: async () => {
    console.debug("Invoked: ", GET_LANG);
    let languagePacks = await loadUsersLanguagePacks();
    if (!languagePacks) languagePacks = ["eng"];
    return languagePacks;
  },
  GET_FORMATS: async () => {
    console.debug("invoked: ", GET_FORMATS);
    let formats = await loadUserFormats();
    if (!formats) {
      formats = loadDefaultFormat();
    }
    return formats;
  },
  SET_FORMATS: async (payload) => {
    console.debug("invoked: ", SET_FORMATS);
    console.debug("payload: ", payload);
    return await handleContextUpdate(payload);
  },
};
