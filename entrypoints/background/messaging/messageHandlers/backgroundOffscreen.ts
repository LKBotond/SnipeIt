import {
  EXTRACT_TXT,
  INITIALIZE,
  SET_LANG,
  EXTRACT_IMG,
  GET_LANG,
} from "../utils/actions";
import {
  extractText,
  initializeWorker,
  setLanguagePacks,
  updateLangPreferences,
} from "@/entrypoints/offscreen/ocrManager";
import {
  ImageExtractionRequest,
  TextExtractionRequest,
} from "../utils/commonInterfaces";
import { handleCropping } from "@/entrypoints/offscreen/crop";
import { fetchAndConvertImg } from "@/entrypoints/offscreen/converter";
import { handleCopy } from "@/entrypoints/offscreen/copy";
import { loadUsersLanguagePacks } from "../../storage";

interface OffscreenMessageMap {
  EXTRACT_TXT: {
    payload: TextExtractionRequest;
    response: string;
  };
  EXTRACT_IMG: {
    payload: ImageExtractionRequest;
    response: string;
  };
  SET_LANG: {
    payload: string[];
    response: void;
  };
  GET_LANG: {
    payload: void;
    response: string[];
  };
  INITIALIZE: {
    payload: string[];
    response: boolean;
  };
}

type OffscreenMessageHandlerMap = {
  [K in keyof OffscreenMessageMap]: (
    payload: OffscreenMessageMap[K]["payload"],
    sender?: Browser.runtime.MessageSender,
  ) =>
    | Promise<OffscreenMessageMap[K]["response"]>
    | OffscreenMessageMap[K]["response"];
};
export const OffscreenMessageHandler: OffscreenMessageHandlerMap = {
  INITIALIZE: async (payload) => {
    console.log("Invoked: ", INITIALIZE);
    setLanguagePacks(payload);
    return await initializeWorker();
  },
  SET_LANG: async (payload) => {
    console.log("Invoked: ", SET_LANG);
    await updateLangPreferences(payload);
  },
  GET_LANG: async () => {
    console.log("Invoked: ", GET_LANG);
    let languagePacks = await loadUsersLanguagePacks();
    if (!languagePacks) languagePacks = ["eng"];
    return languagePacks;
  },
  EXTRACT_TXT: async (payload) => {
    console.log("Invoked: ", EXTRACT_TXT);
    console.log("got payload: ", payload);
    const text = await extractText(await handleCropping(payload));
    console.log("found text: ", text);
    handleCopy(text);
    return text;
  },
  EXTRACT_IMG: async (payload) => {
    console.log("Invoked: ", EXTRACT_IMG);
    return await fetchAndConvertImg(payload);
  },
};
