import { BaseSubOptionsProps } from "./options";
import {
  Box,
  Button,
  CircularProgress,
  ToggleButton,
  ToggleButtonGroup,
  Typography,
} from "@mui/material";
import { SUPPORTED_FORMATS, Formats } from "../formats";
import {
  getActiveFormats,
  updateActiveFormats,
} from "@/entrypoints/background/messaging/messaging";
interface FormatOptionsProps extends BaseSubOptionsProps {}
function formatOptions(props: FormatOptionsProps) {
  const [formats, setFormats] = useState<Formats[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    handleGetActiveFormats();
    setLoading(false);
  }, []);

  const handleGetActiveFormats = async () => {
    const activeFormats = await getActiveFormats();
    console.debug("active Formats, ", activeFormats);
    setFormats(activeFormats);
  };

  const handleSelectionSaving = async () => {
    await updateActiveFormats(formats);
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
      <Box hidden={props.hidden}>
        <Typography variant="h2">Format options</Typography>
        <Typography variant="body1">
          select the file formats that you want to show up in the context menu
        </Typography>
        <ToggleButtonGroup
          value={formats}
          onChange={(_, newFormats) => setFormats(newFormats)}
        >
          {SUPPORTED_FORMATS.map((format) => (
            <ToggleButton key={format.name} value={format.mime}></ToggleButton>
          ))}
        </ToggleButtonGroup>
        <Button className="floating-sticky" onClick={handleSelectionSaving}>
          save selection
        </Button>
      </Box>
    </>
  );
}
export default formatOptions;
