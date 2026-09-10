import { useState } from "react";
import type { BaseSubOptionsProps } from "./options";
import type { ShortCut } from "../capture";
import { Typography, Box, Button, Paper, Stack, Chip, Divider } from "@mui/material";
import { captureCombination } from "../capture";
import {
  resetShortcut,
  setNewShortcut,
} from "@/entrypoints/background/messaging/messaging";

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
      <Paper className="shortcut">
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
        {displayShortcut()}

        <Button className="btn" onClick={handleCapture}>
          Set new shortcut
        </Button>
        <Button className="btn" onClick={handleShortcutReset}>
          Reset to default
        </Button>
      </Box>
    </>
  );
}
export default ShortcutOptions;
