
export type ShortCut={
combination:string[]
}

export function captureCombination():Promise<ShortCut>{
    return new Promise((resolve) => {
        const pressed = new Set<string>();

        const handleKeyDown = (event: KeyboardEvent) => {
            pressed.add(event.code);
        };

        const handleKeyUp = () => {
            window.removeEventListener("keydown", handleKeyDown);
            window.removeEventListener("keyup", handleKeyUp);

            resolve({
                combination: [...pressed].sort(),
            });
        };

        window.addEventListener("keydown", handleKeyDown);
        window.addEventListener("keyup", handleKeyUp);
    });
}