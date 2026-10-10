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
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    handleGetActiveLanguagePacks();
  }, []);

  const handleGetActiveLanguagePacks = async () => {
    setLoading(true);
    try {
      const activePacks = await getActiveLanguagePacks();
      console.debug("active Packs, ", activePacks);
      setLanguages(activePacks);
    } catch (error) {
      console.error("failed to fetch language packs: ", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSelectionSaving = async () => {
    setLoading(true);
    try {
      await updateLanguagePacks(languages);
    } catch (error) {
      console.error("failed to update language Packs: ", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <Box className="loading-screen">
        <CircularProgress />
      </Box>
    );
  }

  return (
    <>
      <Box hidden={props.hidden} className={props.className}>

        <ToggleButtonGroup
          value={languages}
          onChange={(_, newLanguages) => setLanguages(newLanguages)}
        >
          {EUROPEAN_LANGUAGES.map((lang) => (
            <ToggleButton key={lang.code} value={lang.code}>
              {lang.name}
            </ToggleButton>
          ))}
        </ToggleButtonGroup>
        <Button className="floating-sticky" onClick={handleSelectionSaving}>
          save selection
        </Button>
      </Box>
    </>
  );
}
export default LanguageOptions;
