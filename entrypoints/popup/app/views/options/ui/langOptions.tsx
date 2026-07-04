import { useState, useEffect } from "react";
import reactLogo from "@/assets/react.svg";
import wxtLogo from "/wxt.svg";
import { Typography, Box, Button } from "@mui/material";
import "@/entrypoints/popup/style/App.css";
import { BaseViewProps } from "@/entrypoints/popup/app/App";
import { EUROPEAN_LANGUAGES } from "../languages";
import { Grid } from "@mui/material";
interface OptionsViewProps extends BaseViewProps {}

function OptionsView(props: OptionsViewProps) {
  const [shortCut, setShortCut] = useState(props.shortcut);

  return (
    <>
      <Box>
        <Typography variant="h2">Languages</Typography>
        <Grid></Grid>
      </Box>
    </>
  );
}
export default OptionsView;
