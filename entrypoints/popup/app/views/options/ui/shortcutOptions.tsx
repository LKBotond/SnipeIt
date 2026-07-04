import { useState, useEffect } from "react";
import reactLogo from "@/assets/react.svg";
import wxtLogo from "/wxt.svg";
import { Typography, Box, Button } from "@mui/material";
import "@/entrypoints/popup/style/App.css";
import { captureCombination } from "../capture";
import { setNewShortcut } from "@/entrypoints/background/messaging/messaging";
import { BaseViewProps } from "@/entrypoints/popup/app/App";

interface OptionsViewProps extends BaseViewProps {}
("");

function OptionsView(props: OptionsViewProps) {
  const [shortCut, setShortCut] = useState(props.shortcut);

  const handleCapture = async () => {
    const newShortcut = await captureCombination();
    setShortCut(newShortcut);
    await setNewShortcut(newShortcut);
  };
  const displayShortcut = (): string => {
    return shortCut.combination.join("+");
  };

  return (
    <>
      <Box>
        <Typography variant="h2">Options</Typography>
        <Typography variant="body1">
          You may personalize your shortcuts here
        </Typography>
        <Typography>
          To set your shortcut, just press the button and press and hold down
          your combination. the capture finishes once you let go of any key
        </Typography>
        <Typography>
          Curent combination:
          {displayShortcut()}
        </Typography>
        <Button onClick={handleCapture}>Set my new shortcut</Button>
        <Button onClick={() => props.setView("index")}>
          Get me out of here
        </Button>
      </Box>
    </>
  );
}
export default OptionsView;
