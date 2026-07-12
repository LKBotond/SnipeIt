const loadingID = "Loading-Screen"
export function insertLoadingScreen() {
    if(document.getElementById(loadingID))return;
    const screen = createLoadingScreenAndSpinner();
    const body = document.querySelector('body');
    body?.appendChild(screen)
}
export function removeLoadingScreen() {
    const screen = document.getElementById(loadingID);
    screen?.remove()
}
function createLoadingScreenAndSpinner() {
    const screen = document.createElement("div");
    screen.id = loadingID
    styleLoadingScreen(screen);
    const spinner = document.createElement("div")
    styleSpinner(spinner);
    screen.appendChild(spinner)
    return screen;
}
function styleLoadingScreen(screen: HTMLDivElement) {
    screen.style.position = "fixed";
    screen.style.top = "0";
    screen.style.left = "0";
    screen.style.width = "100vw";
    screen.style.height = "100vh";
    screen.style.zIndex = "2147483647";
    screen.style.backgroundColor="rgba(0,0,0,0.2)"
    screen.style.display = "flex"
    screen.style.justifyContent = "center"
    screen.style.alignItems = "center";
}
function styleSpinner(spinner: HTMLDivElement) {
    spinner.style.width = "2rem";
    spinner.style.height = "2rem";
    spinner.style.border = "4px solid #ddd";
    spinner.style.borderTopColor = "#3498db";
    spinner.style.borderRadius = "50%";
    spinner.style.animation = "spin 1s linear infinite";
}