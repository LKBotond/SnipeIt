import type { BaseSubOptionsProps } from "./options";
import {
  Box,
  Button,
  CircularProgress,
  ToggleButton,
  ToggleButtonGroup,
} from "@mui/material";
import { SUPPORTED_FORMATS } from "../formats";
import type { Formats } from "../formats";
import {
  getActiveFormats,
  updateActiveFormats,
} from "@/entrypoints/background/messaging/messaging";
interface FormatOptionsProps extends BaseSubOptionsProps {}

function FormatOptions(props: FormatOptionsProps) {
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
      console.debug("formats to be saved: ", formats);
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
      <Box hidden={props.hidden} className={props.className}>

        <ToggleButtonGroup
          value={formats.map((f) => f.name)}
          onChange={(_, newNames: string[]) => {
            const selectedObjects = SUPPORTED_FORMATS.filter((f) =>
              newNames.includes(f.name),
            );
            setFormats(selectedObjects);
          }}
        >
          {SUPPORTED_FORMATS.map((format) => (
            <ToggleButton key={format.name} value={format.name}>
              {format.name}
            </ToggleButton>
          ))}
        </ToggleButtonGroup>
        <Button className="floating-sticky" onClick={handleSelectionSaving}>
          save selection
        </Button>
      </Box>
    </>
  );
}
export default FormatOptions;
