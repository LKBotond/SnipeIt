export async function handleCopy(text: string) {
  const textarea = document.createElement("textarea");
  textarea.value = text;
  document.body.appendChild(textarea);
  textarea.select();
  try {
    const successful = document.execCommand("copy");
    if (!successful) {
      console.error("execCommand('copy') returned false");
    }
  } catch (error) {
    console.error("Failed to copy text using execCommand: ", error);
  } finally {
    document.body.removeChild(textarea);
  }
}
