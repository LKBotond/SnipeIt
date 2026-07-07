import { useState, useEffect } from "react";
import reactLogo from "@/assets/react.svg";
import wxtLogo from "/wxt.svg";
import { Typography, Box, Button } from "@mui/material";
import { captureCombination, ShortCut } from "../capture";
import {
  resetShortcut,
  setNewShortcut,
} from "@/entrypoints/background/messaging/messaging";
import { BaseSubOptionsProps } from "./options";

interface ShortcutOptionsProps extends BaseSubOptionsProps {
  shortcut: ShortCut;
}

function ShortcutOptions(props: ShortcutOptionsProps) {
  const [shortCut, setShortCut] = useState(props.shortcut);

  const handleCapture = async () => {
    const newShortcut = await setNewShortcut(await captureCombination());
    setShortCut(newShortcut);
  };
  const handleShortcutReset = async () => {
    const shortcut = await resetShortcut();
    setShortCut(shortcut);
  };
  const displayShortcut = (): string => {
    return shortCut.combination.join(" + ");
  };

  return (
    <>
      <Box hidden={props.hidden}>
        <Typography variant="body1">
          You may personalize your shortcuts here
        </Typography>
        <Typography>
          Curent combination:
          {displayShortcut()}
        </Typography>
        <Button onClick={handleCapture}>Set my new shortcut</Button>
        <Button onClick={handleShortcutReset}>Reset to default</Button>
      </Box>
    </>
  );
}
export default ShortcutOptions;
