import {Close, ExpandMore } from "@mui/icons-material";
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
  const [controls,setControls] = React.useState([])
  const [show, setShow] = React.useState(false);
  const [size, setSize] = React.useState("xl");



  // Generate Sections
  const SectionsGenerated = ({ value }) => {
    return value?.map((sec, idx) => {
 
      if(sec.seats && sec.color && sec.price && sec.section){
        return (
         <Box>
          <Typography variant="h6" textAlign="center">{`Section ${sec.section}`}</Typography>
          <Grid key={idx} container  justifyContent="start" sx={{ mb: 5,gap:{xs:2.5,lg:4} }}>
            <SeatsGenerated
              SectionIndex={sec.section}
              seats={sec.seats}
              color={sec.color}
              price={sec.price} 
            />
          </Grid>
         </Box>
        );
      }else{
        return (
          <Grid key={idx} container gap={4} justifyContent="start" sx={{ mb: 5 }}>
           <Grid item xs={12}>
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
            <Typography variant="h6" textAlign="center" sx={{fontSize:{xs:"0.5rem",sm:"0.5rem",lg:"1rem"}}}>
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
            fontSize:{xs:"0.5rem",sm:"0.5rem",lg:"1rem"}
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
    setPickedSeat(prevValue=>{
      return [...newValue]
    });
    setAmount((prevValue) => {
      return prevValue - price;
    });
  };


  // Handle Section Delete
  const handleSectionDelete = (sec) => {
    let newValue = section.filter((el) => {
      return el !== sec;
    }); 
    setControls([...newValue])
    setSection([...newValue]);
    let newSeats = pickedSeat.filter(el=>{
      return el.section !== sec.section
    })

   setPickedSeat([...newSeats])
if(newSeats.length > 0){
  setAmount(0)
  newSeats.forEach(st=>setAmount(prevValue=>{
    return prevValue + st.price
  }))
}else{
  setAmount(0)
}

  };

  const handleSectionControls = (e, idx) => {
    let allValues = [...controls];
    let capturedValue = allValues[idx];
    switch (e.target.name) {
      case "color":
        capturedValue.color = e.target.value;
        return setSection(allValues);
        case "section":
          capturedValue.section = e.target.value;
          return setSection(allValues);
      case "seats":
        capturedValue.seats = Number(e.target.value);
        return setSection(allValues);
      case "price":
        capturedValue.price = Number(e.target.value);
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

      case viewPort >= 1400:
        return setSize("xl");

      default:
        break;
    }
  },[size]);
  return (
    <Box
      sx={{
        
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        position: "relative",

      }}
    >
      <Typography onClick={()=> window.open("https://github.com/TareqFl")} sx={{
        textDecoration:"none",
        fontWeight:"bold",
        fontSize:"1.5rem",
        position:"absolute",
        right:{xs:"5%",md:"2.5%"},
        top:"10%",
        "&:hover":{cursor:"pointer"}
          }}
          >Tareq Fleyfel GitHub</Typography>
      {/* Controls */}
      <Button
        variant="contained"
        sx={{ position: "absolute", top: {xs:"10%"}, left: {xs:"5%",md:"2.5%"} }}
        onClick={() => setShow(!show)}
      >
        Controls
      </Button>


      {/* Add Section Controls */}
      <Paper
        elevation={0}
        sx={{
          height: "50vh",
          width: { xs: "50%", sm: "25%", lg: "20%",xl:"15%" },
          backgroundColor: "transparent",
          position: "absolute",
          left: {
            xs: show ? "1.5%" : "-50.5%",
            sm: show ? "1.5%" : "-25.5%",
            lg: show ? "0.75%" : "-20%",
            xl: show ? "0.5%" : "-20%",
          },
          top:{xs:"15%",},
          overflowY: "scroll",
          transition: "0.375s",
          zIndex: 10,
        }}
      >
        <Button
          variant="contained"
          color="warning"
          fullWidth
          onClick={() =>{
            setControls((prevValue) => [
              ...prevValue,
              { seats: 0, color: "", price: 0 },
            ])
          }}
        >
          Add Section
        </Button>

        {controls.map((sec, idx) => {
          return (
            <Accordion key={idx} sx={{ width: "100%", mt: 1 }} elevation={6}>
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
                  <Typography variant="h6" textAlign="center">{`section ${
                    section[idx]? section[idx].section: idx + 1
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
                value={sec.color}
                  variant="standard"
                  name={`color`}
                  label={`color`}
                  fullWidth
                  onChange={(e) => handleSectionControls(e, idx)}
                />
                <TextField
                value={sec.seats}
                  variant="standard"
                  name={`seats`}
                  label={`seats quantity Must Be a Number`}
                  fullWidth
                  onChange={(e) => handleSectionControls(e, idx)}
                />
                <TextField
                value={sec.price}
                  variant="standard"
                  name={`price`}
                  label={`price Must Be a Number`}
                  fullWidth
                  onChange={(e) => handleSectionControls(e, idx)}
                />
                  <TextField
                  value={sec.section}
                  variant="standard"
                  name={`section`}
                  label={`Enter Section`}
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
          mt:{xs:20,lg:25,xl:15}
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
            <Typography variant="h1" textTransform={"uppercase"} sx={{fontSize:{xs:"2rem",sm:"4rem",lg:"8rem"}}}>
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
                  // value={section.length > 0 ? section : sections}
                  value={section}
                />
              </Box>
            </Box>

            {/* Cart Side */}
            <Box sx={{ height: "100%", flexGrow: 1  }}>
              <Typography variant="h1" textAlign="center"sx={{fontSize:{xs:"2rem",sm:"4rem",lg:"8rem"}}}>
                Cart
              </Typography>
              <Stack
                display="flex"
                direction="column"
                sx={{
                  width: "100%",
                  height: {xs:"200px",sm:"400px",lg:"300px"},
                  overflowY: "scroll",
                  padding: {xs:0,lg:5},
                  mb: {xs:0,lg:5},
                }}
                spacing={2}
              >
                <PickedSeat />
              </Stack>
              <Box p={1}>
              <Typography variant="h6"  sx={{fontSize:{xs:"0.5rem",sm:"0.5rem",lg:"1rem"}}}>{`Total Amount: ${amount ? amount : 0}$`}</Typography>
              <Typography variant="h6"  sx={{fontSize:{xs:"0.5rem",sm:"0.5rem",lg:"1rem"}}}>{`Total Seats: ${pickedSeat.length}`}</Typography>
              <Button variant="contained" fullWidth onClick={()=> window.location.reload()} sx={{fontSize:{xs:"0.5rem",sm:"0.5rem",lg:"1rem"}}}>
                Continue to Checkout
              </Button>
              </Box>
            </Box>
          </Stack>
        </Paper>
      </Container>
    </Box>
  );
};

export default Static;
