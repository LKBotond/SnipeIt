import { useState } from "react";
import type { BaseSubOptionsProps } from "./options";
import { Typography, Box, Button, Paper, Stack, Chip } from "@mui/material";
import {
  resetShortcut,
  setNewShortcut,
} from "@/entrypoints/background/messaging/messaging";
import { ShortcutRecorder } from "./shortcutRecorder";

export type ShortCut = {
  combination: string[];
};

interface ShortcutOptionsProps extends BaseSubOptionsProps {
  shortcut: ShortCut;
}

function ShortcutOptions(props: ShortcutOptionsProps) {
  const [shortCut, setShortCut] = useState(props.shortcut);
  const [isCapturing, setIsCapturing] = useState(false);

  const handleSaveCaptured = async (keys: string[]) => {
    const newShortcut = await setNewShortcut({ combination: keys });
    setShortCut(newShortcut);
    setIsCapturing(false);
  };

  const handleShortcutReset = async () => {
    const shortcut = await resetShortcut();
    setShortCut(shortcut);
  };

  return (
    <Box hidden={props.hidden} className={props.className}>
      {isCapturing ? (
        <ShortcutRecorder
          onSave={handleSaveCaptured}
          onCancel={() => setIsCapturing(false)}
        />
      ) : (
        <Box>
          <Paper className="shortcut" sx={{ p: 2, my: 1 }}>
            <Typography variant="subtitle2" color="text.secondary">
              Current Shortcut
            </Typography>

            <Stack direction="row" spacing={1} sx={{ mt: 1 }}>
              {shortCut.combination.map((key) => (
                <Chip key={key} label={key} variant="outlined" />
              ))}
            </Stack>
          </Paper>

          <Stack direction="row" spacing={1} sx={{ mt: 2 }}>
            <Button variant="contained" onClick={() => setIsCapturing(true)}>
              Set new shortcut
            </Button>
            <Button variant="outlined" onClick={handleShortcutReset}>
              Reset to default
            </Button>
          </Stack>
        </Box>
      )}
    </Box>
  );
}

export default ShortcutOptions;
