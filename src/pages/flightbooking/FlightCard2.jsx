import React from "react";
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
  Stepper,
  Step,
  StepLabel,
  Box,
  Button,
  Divider,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

const FlightCard2 = ({ data }) => {
  console.log(data?.legs, "data123");
  
  const steps = [
    {
      time: "11:15 PM",
      location: "Chhatrapati Shivaji Maharaj International Airport Mumbai (BOM)",
      travelTime: "Travel time: 1 hr 25 min",
      details: "IndiGo • Economy • Airbus A321neo • 6E 5393",
      alert: "Often delayed by 30+ min",
    },
    {
      time: "Overnight layover",
      location: "Hyderabad (HYD)",
      travelTime: "3 hr 55 min layover",
      details: "Overnight 🛌",
    },
    {
      time: "4:35 AM",
      location: "Rajiv Gandhi International Airport (HYD)",
      travelTime: "Travel time: 1 hr 10 min",
      details: "IndiGo • Economy • Airbus A321neo • 6E 351",
      alert: "Overnight 🛌",
    },
    {
      time: "5:45 AM",
      location: "Pune International Airport (PNQ)",
      travelTime: "",
      details: "",
    },
  ];

  return (
    <Accordion sx={{ margin: 2, borderRadius: 2, boxShadow: 3 }}>
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        sx={{ padding: 2, backgroundColor: "#f7f7f7" }}
      >
        <Box display="flex" justifyContent="space-between" width="100%" alignItems="center">
          <Typography variant="subtitle1" color="text.secondary">
            Departure • Wed, Nov 27
          </Typography>
          <Box>
            <Typography variant="h6" fontWeight="bold" color="primary">
              ₹10,590
            </Typography>
            <Typography variant="subtitle2" color="green">
              107 kg CO₂e
            </Typography>
          </Box>
        </Box>
      </AccordionSummary>
      <AccordionDetails>
        <Stepper orientation="vertical">
          {steps.map((step, index) => (
            <Step key={index} active={true} completed={false}>
              <StepLabel>
                <Typography variant="body1" fontWeight="bold">
                  {step.time} • {step.location}
                </Typography>
                {step.travelTime && (
                  <Typography variant="body2" color="text.secondary">
                    {step.travelTime}
                  </Typography>
                )}
                {step.details && (
                  <Typography variant="body2" color="text.secondary">
                    {step.details}
                  </Typography>
                )}
                {step.alert && (
                  <Typography variant="body2" color="error">
                    {step.alert}
                  </Typography>
                )}
              </StepLabel>
            </Step>
          ))}
        </Stepper>
        <Divider sx={{ my: 2 }} />
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Button variant="contained" color="primary">
            Select flight
          </Button>
          <Typography variant="body2" color="text.secondary">
            Below average legroom (29 in) • Emissions estimate: 107 kg CO₂e
          </Typography>
        </Box>
      </AccordionDetails>
    </Accordion>
  );
};

export default FlightCard2;
