import { existsSync } from "node:fs";
import { mkdir } from "node:fs/promises";
import { homedir } from "node:os";
import { join } from "node:path";
import { spawn } from "node:child_process";

const root = process.cwd();
const extensionDir = join(root, ".output", "chrome-mv3-dev");
const profileDir = join(root, ".output", "chrome-dev-profile");
const chromeCandidates = [
  join(process.env.LOCALAPPDATA ?? "", "Google", "Chrome", "Application", "chrome.exe"),
  join(process.env.PROGRAMFILES ?? "", "Google", "Chrome", "Application", "chrome.exe"),
  join(process.env["PROGRAMFILES(X86)"] ?? "", "Google", "Chrome", "Application", "chrome.exe"),
  join(homedir(), "scoop", "apps", "googlechrome", "current", "chrome.exe"),
];

const chromePath = chromeCandidates.find((candidate) => existsSync(candidate));
if (!chromePath) {
  console.error("Chrome was not found. Install Chrome or add chrome.exe to PATH.");
  process.exit(1);
}

await mkdir(profileDir, { recursive: true });

const wxt = spawn("wxt.cmd", ["-b", "chrome"], {
  cwd: root,
  env: process.env,
  shell: true,
  stdio: "inherit",
});

let chromeStarted = false;
const startChrome = () => {
  if (chromeStarted || !existsSync(join(extensionDir, "manifest.json"))) return;
  chromeStarted = true;
  spawn(
    chromePath,
    [
      `--user-data-dir=${profileDir}`,
      `--load-extension=${extensionDir}`,
      `--disable-extensions-except=${extensionDir}`,
      "--no-first-run",
      "--no-default-browser-check",
    ],
    { detached: true, stdio: "ignore" },
  ).unref();
  console.log("Chrome started with the development extension loaded.");
};

const watcher = setInterval(startChrome, 250);
startChrome();

const stop = () => {
  clearInterval(watcher);
  if (!wxt.killed) wxt.kill();
};

process.on("SIGINT", stop);
process.on("SIGTERM", stop);
wxt.on("exit", (code) => {
  clearInterval(watcher);
  process.exit(code ?? 0);
});
