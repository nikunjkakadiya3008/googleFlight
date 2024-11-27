import React from "react";
import {
  Box,
  Typography,
  Divider,
  Grid,
  Avatar,
  Button,
  Stack,
} from "@mui/material";
import FlightIcon from "@mui/icons-material/Flight";
import AirplanemodeActiveIcon from "@mui/icons-material/AirplanemodeActive";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";

const FlightCardMerlin = () => {
  return (
    <Box
      border={1}
      borderRadius={1}
      borderColor="grey.300"
      padding={2}
      margin={2}
      width="100%"
      maxWidth={600}
    >
      {/* {/ Main flight details /} */}
      <Typography variant="h6" fontWeight="bold">
        Air India 639 <span style={{ fontSize: "0.8rem" }}>Airbus A320neo</span>
      </Typography>
      <Grid container spacing={2} alignItems="center" pt={1}>
        <Grid item>
          <Avatar>
            <FlightIcon />
          </Avatar>
        </Grid>
        <Grid item xs>
          <Typography variant="h4" fontWeight="bold">
            17:10
          </Typography>
          <Typography> Mumbai Chhatrapati Shivaji Intl (BOM)</Typography>
        </Grid>
        <Grid item xs={1} textAlign="center">
          <Typography>1h 55m</Typography>
          <AirplanemodeActiveIcon />
        </Grid>
        <Grid item xs>
          <Typography variant="h4" fontWeight="bold">
            19:05
          </Typography>
          <Typography>Chennai (MAA)</Typography>
        </Grid>
      </Grid>
      <Typography
        variant="body2"
        color="error"
        fontWeight="bold"
        pt={1}
        pb={2}
      >
        Limited seats remaining at this price
      </Typography>

      <Divider />

      {/* {/ Connecting flight /} */}
      <Typography variant="body2" color="text.secondary" pt={2}>
        1h 45m · Change planes in Chennai (MAA)
      </Typography>

      <Typography variant="h6" fontWeight="bold" pt={2}>
        Air India 9552{" "}
        <span style={{ fontSize: "0.8rem" }}>Operated by Air India Express · Boeing 737</span>
      </Typography>

      <Grid container spacing={2} alignItems="center" pt={1}>
        <Grid item>
          <Avatar>
            <FlightIcon />
          </Avatar>
        </Grid>
        <Grid item xs>
          <Typography variant="h4" fontWeight="bold">
            20:50
          </Typography>
          <Typography>Chennai (MAA)</Typography>
        </Grid>
        <Grid item xs={1} textAlign="center">
          <Typography>1h 40m</Typography>
          <AirplanemodeActiveIcon />
        </Grid>
        <Grid item xs>
          <Typography variant="h4" fontWeight="bold">
            22:30
          </Typography>
          <Typography>Pune Lohegaon (PNQ)</Typography>
        </Grid>
      </Grid>
      <Typography
        variant="body2"
        color="error"
        fontWeight="bold"
        pt={1}
        pb={2}
      >
        Limited seats remaining at this price
      </Typography>

      {/* {/ Actions and icons /} */}
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Typography variant="body2" color="text.secondary">
          5h 20m
        </Typography>
        <Stack direction="row" alignItems="center" spacing={1}>
          <Button size="small" variant="outlined" endIcon={<ArrowDropDownIcon />}>
            More Details
          </Button>
        </Stack>
      </Box>

      <Divider style={{ marginTop: "16px" }} />

      {/* {/ Info Section /} */}
      <Typography variant="body2" color="text.secondary" pt={2}>
        Baggage fees may be estimated and vary across booking sites.{" "}
        <a href="#">See baggage size and weight limit.</a>
      </Typography>
    </Box>
  );
};

export default FlightCardMerlin;
