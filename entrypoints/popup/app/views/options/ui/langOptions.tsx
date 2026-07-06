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
import "@/entrypoints/popup/style/App.css";
import { BaseSubOptionsProps } from "./options";
import { updateLanguagePacks } from "@/entrypoints/background/messaging/messaging";
interface LangOptionsProps extends BaseSubOptionsProps {}

function LanguageOptions(props: LangOptionsProps) {
  const [languages, setLanguages] = useState<string[]>([]);

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
          sx={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: 1,
          }}
        >
          {EUROPEAN_LANGUAGES.map((lang) => (
            <ToggleButton key={lang.code} value={lang.code}>
              {lang.name}
            </ToggleButton>
          ))}
        </ToggleButtonGroup>
        <Button onClick={handleSelectionSaving}>save selection</Button>
      </Box>
    </>
  );
}
export default LanguageOptions;
