export async function handleCopy(text: string) {
  const textarea = document.createElement("textarea");
  textarea.value = text;
  document.body.appendChild(textarea);
  textarea.select();
  try {
    // TypeScript will warn about deprecation here. We use @ts-ignore because
    // execCommand is required for unfocused offscreen documents in Chrome Extensions.
    // @ts-ignorec
    const successful = document.execCommand("copy");
    if (!successful) {
      console.error("execCommand('copy') returned false");
    }
  } catch (err) {
    console.error("Failed to copy text using execCommand: ", err);
  } finally {
    document.body.removeChild(textarea);
  }
}
/**
 * try {
    await navigator.clipboard.writeText(text);
    console.log("Text successfully copied to system clipboard");
  } catch (err) {
    console.error("Failed to copy text using Clipboard API: ", err);
  }
 */
