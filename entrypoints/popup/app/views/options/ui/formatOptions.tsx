import { useState, useEffect } from "react";
import type { BaseSubOptionsProps } from "./options";
import {
  Box,
  Button,
  CircularProgress,
  ToggleButton,
  ToggleButtonGroup,
} from "@mui/material";
import { SUPPORTED_FORMATS } from "../formats";
import type { Formats } from "../formats";
import {
  getActiveFormats,
  updateActiveFormats,
} from "@/entrypoints/background/messaging/messaging";

interface FormatOptionsProps extends BaseSubOptionsProps {}

function FormatOptions(props: FormatOptionsProps) {
  const [formats, setFormats] = useState<Formats[]>([]);
  const [initialLoading, setInitialLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    let isMounted = true;

    const fetchFormats = async () => {
      try {
        const activeFormats = await getActiveFormats();
        console.debug("active Formats, ", activeFormats);
        if (isMounted && activeFormats) {
          setFormats(activeFormats);
        }
      } catch (error) {
        console.error("failed to fetch active formats: ", error);
      } finally {
        if (isMounted) setInitialLoading(false);
      }
    };

    fetchFormats();

    return () => {
      isMounted = false;
    };
  }, []);

  const handleSelectionSaving = async () => {
    setIsSaving(true);
    try {
      console.debug("formats to be saved: ", formats);
      await updateActiveFormats(formats);
    } catch (error) {
      console.error("failed to update format options: ", error);
    } finally {
      setIsSaving(false);
    }
  };

  if (props.hidden) return null;

  if (initialLoading) {
    return (
      <Box className="loading-screen">
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box hidden={props.hidden} className={props.className}>
      <ToggleButtonGroup
        value={formats.map((f) => f.name)}
        onChange={(_, newNames: string[]) => {
          if (newNames.length > 0) {
            const selectedObjects = SUPPORTED_FORMATS.filter((f) =>
              newNames.includes(f.name)
            );
            setFormats(selectedObjects);
          }
        }}
      >
        {SUPPORTED_FORMATS.map((format) => (
          <ToggleButton key={format.name} value={format.name}>
            {format.name}
          </ToggleButton>
        ))}
      </ToggleButtonGroup>

      <Button
        className="floating-sticky"
        onClick={handleSelectionSaving}
        disabled={isSaving || formats.length === 0}
      >
        {isSaving ? "Saving..." : "save selection"}
      </Button>
    </Box>
  );
}

export default FormatOptions;