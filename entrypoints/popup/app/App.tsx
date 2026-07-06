import { useState, useEffect } from "react";
import reactLogo from "@/assets/react.svg";
import wxtLogo from "/wxt.svg";
import { Typography, Box, Button } from "@mui/material";
import StarIcon from "@mui/icons-material/Star";
//import "../style/App.css";

import IndexView from "./views/index";
import OptionsView from "./views/options/ui/options";
import { getShortcut } from "@/entrypoints/background/messaging/messaging";
import { ShortCut } from "./views/options/capture";

export type BaseViewProps = {
  setView: (target: string) => void;
  shortcut: ShortCut;
  className: string;
};

function App() {
  const [shortCut, setShortCut] = useState<ShortCut | null>(null);
  const [view, setView] = useState("index");
  const baseClasses = "";
  useEffect(() => {
    async function handleRecords() {
      const records = await getShortcut();
      console.log("gotRecords: ", records);
      setShortCut(records);
    }
    handleRecords();
  }, []);
  if (!shortCut) {
    return <Box>Loading...</Box>;
  }
  return (
    <>
      {view === "index" && (
        <IndexView
          setView={setView}
          shortcut={shortCut}
          className={baseClasses}
        />
      )}
      {view === "options" && (
        <OptionsView
          setView={setView}
          shortcut={shortCut}
          className={baseClasses}
        />
      )}
    </>
  );
}

export default App;
