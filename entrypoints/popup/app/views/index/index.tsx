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
          Welcome user, this extension will detect extract and paste any text
          into the clipboard that you snipe with it.
        </Typography>
        <Typography variant="body1">
          Lets keep free information free:{")"}
        </Typography>
        <Typography variant="body1">
          Your current Sniping combination:{" "}
          <Typography component="span">{displayShortcut()}</Typography>
        </Typography>
        <Button onClick={() => props.setView("options")}>
          Switch up my combination
        </Button>
        <Button onClick={handleComercial}>Give me a ⭐ on GitHub</Button>
      </Box>
    </>
  );
}

export default IndexView;
