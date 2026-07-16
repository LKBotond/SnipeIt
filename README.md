# SnipeIt

This is the repository for SnipeIt, a productivity browser extension.

## Overview
SnipeIt is a multi-tool that uses local OCR via Tesseract.js to extract text from a user-selected area of the screen. It captures a screenshot, crops it to the selected area, and extracts the text, which is copied directly to the system clipboard to save time.

Additionally, SnipeIt features image conversion, allowing users to convert web images into JPEG, PNG, or WebP formats.

## Permissions
SnipeIt requires the following browser permissions:
- **storage:** To store your custom options and preferences.
- **offscreen:** To process image conversions and OCR text extraction.
- **clipboardWrite:** To write the extracted text directly to your clipboard.
- **downloads:** To download converted images to your local device.
- **contextMenus:** To integrate image conversion options into the browser's right-click menu.

## Features
- **Shortcut-based sniping:** SnipeIt supports a customizable keyboard shortcut to trigger the screenshot tool. Once active, you can drag and select an area to extract text. The shortcut key combination can be customized in the settings.
- **Dynamic language settings:** SnipeIt supports multiple languages for OCR. While English is enabled by default, additional language packs can be loaded dynamically through the options menu. Note that enabling multiple languages may increase memory usage.
- **Image conversion:** Users can right-click an image to open a dynamic context menu and convert it to a preferred format. The available export formats can be configured in the options panel.
- **Local processing:** SnipeIt is designed with privacy in mind. All image conversions and text extractions are processed locally on your machine via an offscreen document using Tesseract.js. No data is transmitted to third-party servers. Only basic configuration settings are saved locally to preserve your preferences.