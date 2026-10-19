import { useEffect, useState } from "react";
import { Paper, Typography, Stack, Chip, Button, Box } from "@mui/material";

interface ShortcutRecorderProps {
  onSave: (keys: string[]) => void;
  onCancel: () => void;
}

export function ShortcutRecorder({ onSave, onCancel }: ShortcutRecorderProps) {
  const [activeKeys, setActiveKeys] = useState<string[]>([]);

  useEffect(() => {
    const pressed = new Set<string>();

    const handleKeyDown = (event: KeyboardEvent) => {
      event.preventDefault();
      pressed.add(event.code);
      setActiveKeys(Array.from(pressed));
    };

    const handleKeyUp = (event: KeyboardEvent) => {
      event.preventDefault();
      if (pressed.size > 0) {
        onSave(Array.from(pressed).sort());
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
    };
  }, [onSave]);

  return (
    <Paper 
      elevation={3} 
      sx={{ p: 2, border: "2px dashed", borderColor: "primary.main", my: 1 }}
    >
      <Typography variant="subtitle2" color="primary">
        Press key combination now...
      </Typography>

      <Stack direction="row">
        {activeKeys.length === 0 ? (
          <Typography variant="body2" color="text.secondary">
            Waiting for keys...
          </Typography>
        ) : (
          activeKeys.map((key) => (
            <Chip key={key} label={key} color="primary" />
          ))
        )}
      </Stack>

      <Button size="small" variant="text" color="inherit" onClick={onCancel}>
        Cancel
      </Button>
    </Paper>
  );
}