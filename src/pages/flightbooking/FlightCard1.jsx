import React from "react";
import { Box, Card, Grid, Typography, Divider, Chip, Button } from "@mui/material";

const FlightCard1 = () => {
  return (
    <Card sx={{ padding: 2, margin: 2, maxWidth: 600, borderRadius: 2, boxShadow: 3 }}>
      <Typography variant="subtitle1" color="text.secondary">
        Departure • Wed, Nov 27
      </Typography>
      <Box display="flex" justifyContent="space-between" alignItems="center" mt={1}>
        <Typography variant="h6" fontWeight="bold">
          107 kg CO₂e
        </Typography>
        <Button variant="contained" color="primary" size="small">
          Select flight
        </Button>
        <Typography variant="h6" color="green">
          ₹10,590
        </Typography>
      </Box>
      <Divider sx={{ my: 2 }} />
      {/* Flight Details */}
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Typography variant="body1" fontWeight="bold">
            11:15 PM • Chhatrapati Shivaji Maharaj International Airport Mumbai (BOM)
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Travel time: 1 hr 25 min
          </Typography>
          <Typography variant="body2" color="text.secondary" mt={1}>
            IndiGo • Economy • Airbus A321neo • 6E 5393
          </Typography>
          <Typography variant="body2" color="error" mt={1}>
            Often delayed by 30+ min
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Divider />
        </Grid>
        <Grid item xs={12}>
          <Typography variant="body1" color="text.secondary">
            3 hr 55 min layover • Hyderabad (HYD) • Overnight layover
          </Typography>
          <Typography variant="body2" color="error">
            Overnight 🛌
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Divider />
        </Grid>
        <Grid item xs={12}>
          <Typography variant="body1" fontWeight="bold">
            4:35 AM • Rajiv Gandhi International Airport (HYD)
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Travel time: 1 hr 10 min • Overnight
          </Typography>
          <Typography variant="body2" color="error">
            Overnight 🛌
          </Typography>
          <Typography variant="body2" color="text.secondary" mt={1}>
            IndiGo • Economy • Airbus A321neo • 6E 351
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Typography variant="body1" fontWeight="bold">
            5:45 AM • Pune International Airport (PNQ)
          </Typography>
        </Grid>
      </Grid>
      {/* Additional Details */}
      <Box mt={2}>
        <Typography variant="body2" color="text.secondary">
          Below average legroom (29 in)
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Emissions estimate: 107 kg CO₂e
        </Typography>
      </Box>
    </Card>
  );
};

export default FlightCard1;
