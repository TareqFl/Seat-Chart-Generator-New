import { Close, ExpandMore } from "@mui/icons-material";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Button,
  Container,
  Grid,
  IconButton,
  Paper,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import React from "react";

const Static = () => {
  const [pickedSeat, setPickedSeat] = React.useState([]);
  const [amount, setAmount] = React.useState(0);
  const [section, setSection] = React.useState([]);
  const [show, setShow] = React.useState(false);
  const [size, setSize] = React.useState("xl");

  const sections = [
    {
      seats: 28,
      color: "red",
      price: 25,
    },
    {
      seats: 28,
      color: "green",
      price: 15,
    },
    {
      seats: 28,
      color: "orange",
      price: 10,
    },
  ];

  // Generate Sections
  const SectionsGenerated = ({ value }) => {
    return value?.map((sec, idx) => {
      // return (
      //   <Grid key={idx} container gap={4} justifyContent="start" sx={{ mb: 5 }}>
      //     <SeatsGenerated
      //       SectionIndex={idx + 1}
      //       seats={sec.seats}
      //       color={sec.color}
      //       price={sec.price}
      //     />
      //   </Grid>
      // );
      if(sec.seats && sec.color && sec.price){
        return (
          <Grid key={idx} container gap={4} justifyContent="start" sx={{ mb: 5 }}>
            <SeatsGenerated
              SectionIndex={idx + 1}
              seats={sec.seats}
              color={sec.color}
              price={sec.price}
            />
          </Grid>
        );
      }else{
        return (
          <Grid key={idx} container gap={4} justifyContent="start" sx={{ mb: 5 }}>
           <Grid Item xs={12}>
            <Typography variant="h1" textAlign="center">
              Insert Data
            </Typography>
           </Grid>
          </Grid>
        );
      }
    });
  };

  // Generate Seats
  const SeatsGenerated = ({ seats, color, SectionIndex, price }) => {
    let defaultSeats = [];

    if (seats > 0) {
      for (let i = 0; i <= seats; i++) {
        defaultSeats.push("Seat");
      }
    } else {
    
      defaultSeats = [];
    }

    return defaultSeats.map((st, idx) => {
      return (
        <Grid
          key={idx}
          item
          xs={0.5}
          sx={{ display: idx >= seats ? "none" : "inline-flex" }}
        >
          <Button
            disabled={
              pickedSeat.length > 0
                ? pickedSeat.length > 0 &&
                  pickedSeat.find((el) => {
                    if (
                      el.section === SectionIndex &&
                      el.seatIndex === idx + 1
                    ) {
                      return el.picked;
                    } else {
                      return false;
                    }
                  })
                : false
            }
            variant="contained"
            fullWidth
            sx={{
              backgroundColor: color,
              "&:hover": { backgroundColor: color, scale: "1.3" },
            }}
            onClick={() => {
              setPickedSeat((prevValue) => {
                return [
                  ...prevValue,
                  {
                    section: SectionIndex,
                    seatIndex: idx + 1,
                    picked: true,
                    st,
                    color,
                    price,
                  },
                ];
              });
              setAmount((prevValue) => {
                return prevValue + price;
              });
            }}
          >
            <Typography variant="h6" textAlign="center">
              {st} {idx + 1}
            </Typography>
          </Button>
        </Grid>
      );
    });
  };

  // Add Seat to Cart
  const PickedSeat = () => {
    return pickedSeat?.map((s, idx) => {
      return (
        <Button
          key={idx}
          variant="contained"
          sx={{
            backgroundColor: s.color,
            "&:hover": { scale: "1.2", backgroundColor: s.color },
          }}
          onClick={() => handleSeatDelete(s, s.price)}
        >
          {`Seat ${s.seatIndex}  section ${s.section} price ${s.price}$`}
        </Button>
      );
    });
  };

  // Delete Seat and deduct from total Amount
  const handleSeatDelete = (section, price) => {
    let newValue = pickedSeat.filter((el) => el !== section && el);
    setPickedSeat(newValue);
    setAmount((prevValue) => {
      return prevValue - price;
    });
  };

  const handleSectionDelete = (sec) => {
    let newValue = section.filter((el) => {
      return el !== sec;
    });
    setSection(newValue);
  };

  const handleSectionControls = (e, idx) => {
    let allValues = section;
    let capturedValue = section[idx];
    switch (e.target.name) {
      case "color":
        capturedValue.color = e.target.value;
        allValues[idx] = capturedValue;
        return setSection(allValues);

      case "seats":
        capturedValue.seats = Number(e.target.value);
        allValues[idx] = capturedValue;
        return setSection(allValues);
      case "price":
        capturedValue.price = Number(e.target.value);
        allValues[idx] = capturedValue;
        return setSection(allValues);
      default:
        break;
    }
 
  };

  React.useEffect(() => {
    let viewPort = window.innerWidth;

    switch (viewPort) {
      case viewPort <= 300:
        return setSize("xs");
      case viewPort <= 600:
        return setSize("sm");

      case viewPort <= 900:
        return setSize("md");

      case viewPort >= 1200:
        return setSize("xl");

      default:
        break;
    }



  }, [section, setSection]);
  return (
    <Box
      sx={{
        height: "100vh",
        width: "100vw",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        position: "relative",
      }}
    >
      {/* Controls */}
      <Button
        variant="contained"
        sx={{ position: "absolute", top: "15%", left: {xs:"5%",md:"2.5%"} }}
        onClick={() => setShow(!show)}
      >
        Controls
      </Button>


      {/* Add Section Controls */}
      <Paper
        elevation={0}
        sx={{
          height: "50vh",
          width: { xs: "50%", sm: "25%", md: "10%" },
          backgroundColor: "transparent",
          position: "absolute",
          left: {
            xs: show ? "1.5%" : "-50.5%",
            sm: show ? "1.5%" : "-25.5%",
            md: show ? "0.5%" : "-12.5%",
          },
          overflowY: "scroll",
          transition: "0.375s",
          zIndex: 10,
        }}
      >
        <Button
          variant="contained"
          color="warning"
          fullWidth
          onClick={() =>
            setSection((prevValue) => [
              ...prevValue,
              { seats: 0, color: "", price: 0 },
            ])
          }
        >
          Add Section
        </Button>

        {section.map((sec, idx) => {
          return (
            <Accordion key={idx} sx={{ width: "100%", mt: 1 }}>
              <AccordionSummary
                expandIcon={<ExpandMore />}
                aria-controls="panel1a-content"
                id="panel1a-header"
              >
                <Stack
                  display="flex"
                  direction="row"
                  justifyContent="space-between"
                  alignItems="center"
                  width="100%"
                >
                  <Typography variant="h6" textAlign="center">{`section${
                    idx + 1
                  }`}</Typography>
                  <IconButton
                    size="small"
                    onClick={() => handleSectionDelete(sec)}
                  >
                    <Close sx={{ color: "red" }} />
                  </IconButton>
                </Stack>
              </AccordionSummary>
              <AccordionDetails>
                <TextField
                  variant="standard"
                  name={`color`}
                  label={`color`}
                  fullWidth
                  onChange={(e) => handleSectionControls(e, idx)}
                />
                <TextField
                  variant="standard"
                  name={`seats`}
                  label={`seats quantity Must Be a Number`}
                  fullWidth
                  onChange={(e) => handleSectionControls(e, idx)}
                />
                <TextField
                  variant="standard"
                  name={`price`}
                  label={`price Must Be a Number`}
                  fullWidth
                  onChange={(e) => handleSectionControls(e, idx)}
                />
              </AccordionDetails>
            </Accordion>
          );
        })}
      </Paper>

      {/* Middle Section */}
      <Container
        sx={{
          height: "800px",
          transition: "1s",
        }}
        maxWidth={size}
      >
        <Paper elevation={12} sx={{ borderRadius: "24px" }}>
          {/* Static Stage */}
          <Paper
            elevation={24}
            sx={{
              backgroundColor: "gray",
              width: "100%",
              height: "20%",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Typography variant="h1" textTransform={"uppercase"}>
              Stage
            </Typography>
          </Paper>

          <Stack
            display="flex"
            direction="row"
            sx={{ width: "100%" }}
            spacing={1}
          >
            {/* Seats Generated Section */}
            <Box
              id="Generated Seats Section"
              sx={{
                height: "600px",
                width: "75%",
                mt: "5%",
                overflow: "scroll",
              }}
            >
              <Box sx={{ width: "1200px", p: 4 }}>
                <SectionsGenerated
                  value={section.length > 0 ? section : sections}
                />
              </Box>
            </Box>

            {/* Cart Side */}
            <Box sx={{ height: "100%", flexGrow: 1 }}>
              <Typography variant="h1" textAlign="center">
                Cart
              </Typography>
              <Stack
                display="flex"
                direction="column"
                sx={{
                  width: "100%",
                  height: "300px",

                  overflowY: "scroll",
                  padding: 5,
                  mb: 2,
                }}
                spacing={2}
              >
                <PickedSeat />
              </Stack>
              <Typography variant="h6">{`Total Amount: ${amount ? amount : 0}$`}</Typography>
              <Typography variant="h6">{`Total Seats: ${pickedSeat.length}`}</Typography>
              <Button variant="contained" fullWidth>
                Continue to Checkout
              </Button>
            </Box>
          </Stack>
        </Paper>
      </Container>
    </Box>
  );
};

export default Static;
