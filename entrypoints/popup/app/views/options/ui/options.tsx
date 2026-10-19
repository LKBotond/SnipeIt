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
  const [shortcutHidden, setShortcutHidden] = useState(true);
  const [langOptHidden, setLangOptHidden] = useState(true);
  const [formatOptHidden, setFormatOptHidden] = useState(true);

  const toggleShortcutOptions = () => setShortcutHidden((prev) => !prev);
  const toggleLanguageOptions = () => setLangOptHidden((prev) => !prev);
  const toggleFormatOptions = () => setFormatOptHidden((prev) => !prev);

  return (
    <>
      <Box className="header">
        <Typography variant="h3">Settings</Typography>
      </Box>

      <Box className="content">
        <Tooltip
          title="Shortcut settings for triggering the OCR"
          enterDelay={500}
          placement="top"
        >
          <Button className="btn" onClick={toggleShortcutOptions}>
            Keyboard Shortcuts
          </Button>
        </Tooltip>
        <ShortcutOptions
          hidden={shortcutHidden}
          shortcut={props.shortcut}
          className="subOptions content"
        />
        <Divider />

        <Tooltip
          title="Text recognition language settings"
          enterDelay={500}
          placement="top"
        >
          <Button className="btn" onClick={toggleLanguageOptions}>
            Language Packs
          </Button>
        </Tooltip>
        <LanguageOptions
          hidden={langOptHidden}
          className="subOptions content"
        />

        <Divider />
        <Tooltip
          title="Picture formats for download"
          enterDelay={500}
          placement="top"
        >
          <Button className="btn" onClick={toggleFormatOptions}>
            Format options
          </Button>
        </Tooltip>
        <FormatOptions
          hidden={formatOptHidden}
          className="subOptions content"
        />

        <Divider />
        <Button className="btn" onClick={() => props.setView("index")}>
          Back to Home
        </Button>
        <PoweredBy />
      </Box>
    </>
  );
}

export default OptionsView;