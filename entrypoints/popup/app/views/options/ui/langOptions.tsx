import { useState, useEffect } from "react";
import { EUROPEAN_LANGUAGES } from "../languages";
import {
  Box,
  ToggleButton,
  ToggleButtonGroup,
  Button,
  CircularProgress,
} from "@mui/material";
import type { BaseSubOptionsProps } from "./options";
import {
  getActiveLanguagePacks,
  updateLanguagePacks,
} from "@/entrypoints/background/messaging/messaging";

interface LangOptionsProps extends BaseSubOptionsProps {}

function LanguageOptions(props: LangOptionsProps) {
  const [languages, setLanguages] = useState<string[]>([]);
  const [initialLoading, setInitialLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    let isMounted = true;

    const loadPacks = async () => {
      try {
        const activePacks = await getActiveLanguagePacks();
        if (isMounted && activePacks) {
          setLanguages(activePacks);
        }
      } catch (error) {
        console.error("failed to fetch language packs: ", error);
      } finally {
        if (isMounted) setInitialLoading(false);
      }
    };

    loadPacks();

    return () => {
      isMounted = false;
    };
  }, []);

  const handleSelectionSaving = async () => {
    setIsSaving(true);
    try {
      await updateLanguagePacks(languages);
    } catch (error) {
      console.error("failed to update language Packs: ", error);
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
        value={languages}
        onChange={(_, newLanguages) => {
          if (newLanguages.length > 0) {
            setLanguages(newLanguages);
          }
        }}
      >
        {EUROPEAN_LANGUAGES.map((lang) => (
          <ToggleButton key={lang.code} value={lang.code}>
            {lang.name}
          </ToggleButton>
        ))}
      </ToggleButtonGroup>

      <Button
        className="floating-sticky"
        onClick={handleSelectionSaving}
        disabled={isSaving || languages.length === 0}
      >
        {isSaving ? "Saving..." : "Save selection"}
      </Button>
    </Box>
  );
}

export default LanguageOptions;
