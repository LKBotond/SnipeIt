import reactLogo from "@/assets/react.svg";
import wxtLogo from "/wxt.svg";

import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import { Typography } from "@mui/material";

const LogoContainer = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  gap: theme.spacing(1),
  marginTop: theme.spacing(2),
  color: theme.palette.text.secondary,

  "& img": {
    height: "1.25rem",
    width: "auto",
  },
}));

export function PoweredBy() {
  return (
    <LogoContainer>
      <Typography variant="body2">powered by</Typography>
      <Box component="img" src={wxtLogo} alt="WXT logo" />
      <Box component="img" src={reactLogo} alt="React logo" />
    </LogoContainer>
  );
}
