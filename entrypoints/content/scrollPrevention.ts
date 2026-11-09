const SCROLL_KEYS = [
  "ArrowUp",
  "ArrowDown",
  "PageUp",
  "PageDown",
  "Home",
  "End",
  " ",
];

export function addScrollListeners() {
  document.addEventListener("wheel", preventScroll, {
    capture: true,
    passive: false,
  });
  document.addEventListener("touchmove", preventScroll, {
    capture: true,
    passive: false,
  });
  document.addEventListener("keydown", preventKeyboardScroll, {
    capture: true,
    passive: false,
  });
}
export function removeScrollListeners() {
  document.removeEventListener("wheel", preventScroll);
  document.removeEventListener("touchmove", preventScroll);
  document.removeEventListener("keydown", preventKeyboardScroll);
}

function preventScroll(event: WheelEvent | TouchEvent) {
  event.preventDefault();
}
function preventKeyboardScroll(event: KeyboardEvent) {
  if (SCROLL_KEYS.includes(event.key)) {
    event.preventDefault();
  }
}
