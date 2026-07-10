import { useState } from "react";
import reactLogo from "@/assets/react.svg";
import wxtLogo from "/wxt.svg";
import { Typography, Box, Button } from "@mui/material";
import { BaseViewProps } from "@/entrypoints/popup/app/App";
import ShortcutOptions from "./shortcutOptions";
import LanguageOptions from "./langOptions";

export interface BaseSubOptionsProps {
  hidden: boolean;
}

interface OptionsViewProps extends BaseViewProps {}

function OptionsView(props: OptionsViewProps) {
  const [shortcutVisibility, setShortcutVisibility] = useState(true);
  const [langOptVisibility, setlangOptVisibility] = useState(true);
  const displayShortcutOptions = async () => {
    setShortcutVisibility(!shortcutVisibility);
  };
  const displayLaanguageOptions = () => {
    setlangOptVisibility(!langOptVisibility);
  };

  return (
    <>
      <Box>
        <Typography variant="h2">Options</Typography>
        <Typography variant="body1">
          Configure your shortcuts and OCR language packs.
        </Typography>
        <Button onClick={displayShortcutOptions}>Keyboard Shortcuts</Button>
        <ShortcutOptions
          hidden={shortcutVisibility}
          shortcut={props.shortcut}
        ></ShortcutOptions>
        <Button onClick={displayLaanguageOptions}>Language Settings</Button>
        <LanguageOptions hidden={langOptVisibility}></LanguageOptions>
        <Button onClick={() => props.setView("index")}>
          Back to Home
        </Button>
      </Box>
    </>
  );
}
export default OptionsView;
