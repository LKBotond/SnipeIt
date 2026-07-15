import { browser } from "wxt/browser";
import { SelectionRectangle } from "../content/drawings";
import { extractText } from "./messaging/messaging";

function grabViewPort() {
  return browser.tabs.captureVisibleTab();
}
export async function grabAndExtractViewPort(
  selectionRectangle: SelectionRectangle,
) {
  const img = await grabViewPort();
  console.debug("img captured: ", img);
  return extractText({ img, selectionRectangle });
}

