import { useState } from "react";
import reactLogo from "@/assets/react.svg";
import wxtLogo from "/wxt.svg";
import { Typography, Box, Button } from "@mui/material";
import { BaseViewProps } from "@/entrypoints/popup/app/App";
import ShortcutOptions from "./shortcutOptions";
import LanguageOptions from "./langOptions";
import FormatOptions from "./formatOptions";

export interface BaseSubOptionsProps {
  hidden: boolean;
  className?:string
}

interface OptionsViewProps extends BaseViewProps {}

function OptionsView(props: OptionsViewProps) {
  const [shortcutVisibility, setShortcutVisibility] = useState(true);
  const [langOptVisibility, setLangOptVisibility] = useState(true);
  const [formatOptVisibility, setFormatOptVisibility] = useState(true);

  const displayShortcutOptions = async () => {
    setShortcutVisibility(!shortcutVisibility);
  };

  const displayLanguageOptions = () => {
    setLangOptVisibility(!langOptVisibility);
  };

  const displayFormatOptions = () => {
    setFormatOptVisibility(!formatOptVisibility);
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
          className="subOptions"
        ></ShortcutOptions>

        <Button onClick={displayLanguageOptions}>Language Settings</Button>
        <LanguageOptions hidden={langOptVisibility} className="subOptions"></LanguageOptions>

        <Button onClick={displayFormatOptions}>Format options</Button>
        <FormatOptions hidden={formatOptVisibility}className="subOptions"></FormatOptions>

        <Button onClick={() => props.setView("index")}>Back to Home</Button>
      </Box>
    </>
  );
}
export default OptionsView;
