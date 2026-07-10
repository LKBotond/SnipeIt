import { BaseSubOptionsProps } from "./options";
import { Box } from "@mui/material";
interface FormatOptionsProps extends BaseSubOptionsProps {}
function formatOptions(props: FormatOptionsProps) {
  return (
    <>
      <Box hidden={props.hidden}></Box>
    </>
  );
}
export default formatOptions;
