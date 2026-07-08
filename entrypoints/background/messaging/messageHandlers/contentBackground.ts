import { ShortCut } from "../../../popup/app/views/options/capture";
import {
  loadUsersShortCut,
  loadDefault,
  saveShortCut,
  deleteUserShortcut,
  loadUsersLanguagePacks,
  saveUserLanguagePacks,
} from "../../storage";
import {
  GET_SHORTCUT,
  SET_SHORTCUT,
  PROCESS_IMG,
  TRANSFORM_IMG,
  UPDATE_LANG,
  GET_LANG,
  RESET_SHORTCUT,
} from "../utils/actions";
import { extractImg, setLanguages, updateLanguagePacks } from "../messaging";
import { ImageExtractionRequest } from "../utils/commonInterfaces";
import { grabAndExtractViewPort } from "../../screenshot";
import { SelectionRectangle } from "@/entrypoints/content/drawings";

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
    response: string;
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
}

type MessageHandlerMap = {
  [K in keyof MessageMap]: (
    payload: MessageMap[K]["payload"],
    sender?: Browser.runtime.MessageSender,
  ) => Promise<MessageMap[K]["response"]> | MessageMap[K]["response"];
};

export const MessageHandler: MessageHandlerMap = {
  GET_SHORTCUT: async () => {
    console.log("Invoked: ", GET_SHORTCUT);
    const userSpecific = await loadUsersShortCut();
    if (!userSpecific) {
      const defaultSet = loadDefault();
      return defaultSet;
    }

    return userSpecific;
  },

  SET_SHORTCUT: async (payload) => {
    console.log("Invoked: ", SET_SHORTCUT);
    await saveShortCut(payload);
    const loaded = await loadUsersShortCut();
    if (!loaded) {
      throw new Error("Shortcut saving failed");
    }
    return loaded;
  },
  RESET_SHORTCUT: async () => {
    console.log("Invoked: ", RESET_SHORTCUT);
    await deleteUserShortcut();
    return loadDefault();
  },
  PROCESS_IMG: async (payload) => {
    console.log("Invoked: ", PROCESS_IMG);
    return await grabAndExtractViewPort(payload);
  },
  TRANSFORM_IMG: async (payload) => {
    console.log("Invoked: ", TRANSFORM_IMG);
    return await extractImg(payload);
  },
  UPDATE_LANG: async (payload) => {
    console.log("invoked: ", UPDATE_LANG);
    await saveUserLanguagePacks(payload);
    return await setLanguages(payload);
  },
  GET_LANG: async () => {
    console.log("Invoked: ", GET_LANG);
    let languagePacks = await loadUsersLanguagePacks();
    if (!languagePacks) languagePacks = ["eng"];
    return languagePacks;
  },
};
