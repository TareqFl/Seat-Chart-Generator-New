import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { Box, Container } from "@mui/material";

export default function ButtonAppBar() {
  // const [open, setOpen] = React.useState(false);

  // React.useEffect(() => {
  //   window.addEventListener("keydown", (e) => {
  //     if (e.key === "Escape") {
  //       setOpen(false);
  //     }
  //   });

  //   return window.removeEventListener("keydown", (e) => {
  //     if (e.key === "Escape") {
  //       setOpen(false);
  //     }
  //   });
  // });

  return (
    <AppBar position="fixed" sx={{ backgroundColor: "black", flexGrow: 1 }}>
      <Container>
        <Toolbar>
          <Typography
            variant="h6"
            component="div"
            sx={{
              flexGrow: 1,
              textAlign: "center",
              "&:hover": { cursor: "pointer" },
            }}
            // onClick={() => setOpen(!open)}
          >
            Seats Chart Generator
          </Typography>
        </Toolbar>
      </Container>

      {/* <Box
        sx={{
          width: open ? "25vw" : "0vw",
          height: "100vh",
          backgroundColor: "white",
          position: "absolute",
          zIndex: 10,
          transition: "0.35s",
        }}
      ></Box> */}
    </AppBar>
  );
}
