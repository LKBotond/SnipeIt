import { useState, useEffect } from "react";
import reactLogo from "@/assets/react.svg";
import wxtLogo from "/wxt.svg";
import { Typography, Box, Button, Paper, Stack, Chip } from "@mui/material";
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
    const combination = await captureCombination();
    console.debug("captured combination, ", combination);
    const newShortcut = await setNewShortcut(combination);
    console.debug("captured shortcut, ", newShortcut);
    setShortCut(newShortcut);
  };
  const handleShortcutReset = async () => {
    const shortcut = await resetShortcut();
    setShortCut(shortcut);
  };
  const displayShortcut = () => {
    return (
      <Paper elevation={2} sx={{ p: 2, mt: 3 }}>
        <Typography variant="subtitle2" color="text.secondary">
          Current Shortcut
        </Typography>

        <Stack direction="row" spacing={1} sx={{ mt: 1 }}>
          {shortCut.combination.map((key) => (
            <Chip key={key} label={key} variant="outlined" />
          ))}
        </Stack>
      </Paper>
    );
  };

  return (
    <>
      <Box hidden={props.hidden} className={props.className}>
        <Typography variant="h3">Shortcut Options</Typography>
        <Typography variant="body1">
          You may personalize your shortcuts here
        </Typography>
        {displayShortcut()}

        <Button onClick={handleCapture}>Set my new shortcut</Button>
        <Button onClick={handleShortcutReset}>Reset to default</Button>
      </Box>
    </>
  );
}
export default ShortcutOptions;
