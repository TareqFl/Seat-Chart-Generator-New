import { Box, CssBaseline } from "@mui/material";
import React from "react";
import Static from "./Pages/Static";
import NavBar from "./Components/NavBar";
const App = () => {
  return (
    <Box>
      <CssBaseline />
      <NavBar />
      <Static />
    </Box>
  );
};

export default App;
