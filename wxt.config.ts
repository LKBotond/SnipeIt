import { defineConfig } from "wxt";
// See https://wxt.dev/api/config.html
export default defineConfig({
  modules: ["@wxt-dev/module-react"],
  manifest: {
    name: 'SnipeIt',
    version: '1.0.0',
    description: 'Local OCR and image conversion utility tool',
    permissions: [
      "storage",
      "offscreen",
      "clipboardWrite",
      "downloads",
      "contextMenus",
    ],
    host_permissions: ["<all_urls>"],
  },
});
