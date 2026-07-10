import { useState } from "react";
import reactLogo from "@/assets/react.svg";
import wxtLogo from "/wxt.svg";
import { Typography, Box, Button } from "@mui/material";
import StarIcon from "@mui/icons-material/Star";
import { browser } from "wxt/browser";
import { BaseViewProps } from "../../App";

interface IndexViewProps extends BaseViewProps {}
function IndexView(props: IndexViewProps) {
  const [shortCut, setShortCut] = useState(props.shortcut);

  const displayShortcut = (): string => {
    return shortCut.combination.join(" + ");
  };

  const handleComercial = () => {
    browser.windows.create({
      url: "https://example.com",
    });
  };
  return (
    <>
      <Box>
        <Typography variant="body2">powered by</Typography>
        <Box component="img" src={wxtLogo} alt="Logo" />
        <Box component="img" src={reactLogo} alt="Logo" />
      </Box>
      <Box>
        <Typography variant="h2">SnipeIt</Typography>
        <Typography variant="body1">
          Grab any text you see and send it straight to your clipboard.
        </Typography>
        <Typography variant="body1">
          Fast. Private. No uploads. Just instant local OCR.
        </Typography>
        <Typography variant="body1">
          Current shortcut:{" "}
          <Typography component="span">{displayShortcut()}</Typography>
        </Typography>
        <Button onClick={() => props.setView("options")}>
          Customize Shortcut
        </Button>
        <Button onClick={handleComercial}>Give me a ⭐ on GitHub</Button>
      </Box>
    </>
  );
}

export default IndexView;
