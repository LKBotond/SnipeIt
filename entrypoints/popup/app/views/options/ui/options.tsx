import { useState } from "react";
import { PoweredBy } from "../../../components/poweredBy";
import { Typography, Box, Button, Tooltip, Divider } from "@mui/material";
import type { BaseViewProps } from "@/entrypoints/popup/app/App";
import ShortcutOptions from "./shortcutOptions";
import LanguageOptions from "./langOptions";
import FormatOptions from "./formatOptions";

export interface BaseSubOptionsProps {
  hidden: boolean;
  className?: string;
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
      <Box className="header">
        <Typography variant="h3">Settings</Typography>
      </Box>

      <Box className="content">
        <Tooltip
          title="Shortcut settings for triggering the OCR "
          enterDelay={500}
          placement="top"
        >
          <Button className="btn" onClick={displayShortcutOptions}>
            Keyboard Shortcuts
          </Button>
        </Tooltip>
        <ShortcutOptions
          hidden={shortcutVisibility}
          shortcut={props.shortcut}
          className="subOptions content"
        ></ShortcutOptions>
        <Divider />

        <Tooltip title="Text recognition language settings" enterDelay={500} placement="top">
          <Button className="btn" onClick={displayLanguageOptions}>
            Language Packs
          </Button>
        </Tooltip>
        <LanguageOptions
          hidden={langOptVisibility}
          className="subOptions content"
        ></LanguageOptions>

        <Divider />
        <Tooltip title="Picture formats for download" enterDelay={500} placement="top">
          <Button className="btn" onClick={displayFormatOptions}>
            Format options
          </Button>
        </Tooltip>
        <FormatOptions
          hidden={formatOptVisibility}
          className="subOptions content"
        ></FormatOptions>

        <Divider />
        <Button className="btn" onClick={() => props.setView("index")}>
          Back to Home
        </Button>
        <PoweredBy/>
      </Box>
    </>
  );
}
export default OptionsView;
