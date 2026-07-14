import { useState, useEffect } from "react";
import reactLogo from "@/assets/react.svg";
import wxtLogo from "/wxt.svg";
import { EUROPEAN_LANGUAGES } from "../languages";
import {
  Typography,
  Box,
  ToggleButton,
  ToggleButtonGroup,
  Button,
} from "@mui/material";
import { BaseSubOptionsProps } from "./options";
import {
  getActiveLanguagePacks,
  updateLanguagePacks,
} from "@/entrypoints/background/messaging/messaging";
interface LangOptionsProps extends BaseSubOptionsProps {}

function LanguageOptions(props: LangOptionsProps) {
  const [languages, setLanguages] = useState<string[]>([]);
  useEffect(() => {
    handleGetActiveLanguagePacks();
  }, []);
  const handleGetActiveLanguagePacks = async () => {
    const activePacks = await getActiveLanguagePacks();
    console.log("active Packs, ", activePacks);
    setLanguages(activePacks);
  };
  const handleSelectionSaving = async () => {
    await updateLanguagePacks(languages);
  };
  return (
    <>
      <Box hidden={props.hidden}>
        <Typography variant="h2">Languages</Typography>
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
