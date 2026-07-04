import { ShortCut } from "../../../popup/app/views/options/capture";
import { loadUsersShortCut, loadDefault, saveShortCut } from "../../storage";
import {
  GET_SHORTCUT,
  SET_SHORTCUT,
  PROCESS_IMG,
  TRANSFORM_IMG,
  UPDATE_LANG,
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
    response: void;
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
    return await saveShortCut(payload);
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
    return await setLanguages(payload);
  },
};
