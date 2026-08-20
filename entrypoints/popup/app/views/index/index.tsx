import { Typography, Box, Button, Paper, Chip } from "@mui/material";
import { browser } from "wxt/browser";
import { BaseViewProps } from "../../App";
import { PoweredBy } from "../../components/poweredBy";

interface IndexViewProps extends BaseViewProps {}

function IndexView(props: IndexViewProps) {
  const handleCommercial = () => {
    browser.windows.create({
      url: "https://example.com",
    });
  };

  return (
    <>
      <Box
        className="header"
      >
        <Typography
          variant="h6"
          component="div"
          sx={{ display: "flex", alignItems: "center" }}
        >
          <Box component="span">Snipe</Box>
          <Box component="span">It</Box>
        </Typography>
      </Box>

      <Box className="content">
        <Typography variant="body2" color="text.secondary">
          Fast, private OCR & image converter
        </Typography>

        <Paper>
          <Typography variant="caption" color="text.secondary">
            Current Shortcut
          </Typography>
          {props.shortcut.combination.map((key) => (
            <Chip key={key} label={key} size="small" variant="outlined" />
          ))}
        </Paper>

        <Button className="btn" onClick={() => props.setView("options")}>
          Settings
        </Button>
        <Button variant="outlined" color="inherit" onClick={handleCommercial}>
          Give me a ⭐ on GitHub
        </Button>

        <PoweredBy />
      </Box>
    </>
  );
}

export default IndexView;
