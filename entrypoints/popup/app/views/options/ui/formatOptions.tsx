import { BaseSubOptionsProps } from "./options";
import { Box } from "@mui/material";
interface FormatOptionsProps extends BaseSubOptionsProps {}
function formatOptions(props: FormatOptionsProps) {
  return (
    //need to handle this like languageOptions, where i handle the selection
    <>
      <Box hidden={props.hidden}>
      </Box>
    </>
  );
}
export default formatOptions;
