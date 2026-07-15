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
  }, []);

  const handleGetActiveFormats = async () => {
    setLoading(true);
    try {
      const activeFormats = await getActiveFormats();
      console.debug("active Formats, ", activeFormats);
      setFormats(activeFormats);
    } catch (error) {
      console.error("failed to fetch active formats: ", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSelectionSaving = async () => {
    setLoading(true);
    try {
      await updateActiveFormats(formats);
    } catch (error) {
      console.error("failed to update format options: ", error);
    } finally {
      setLoading(false);
    }
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
