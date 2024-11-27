import React from "react";
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Card,
  Grid,
  Typography,
  Divider,
  Box,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import dayjs from "dayjs"; // Importing Day.js

export default function FlightCard({ data }) {
  console.log(data?.legs, "data123");

  const formatDuration = (minutes) => {
    const hours = Math.floor(minutes / 60);
    const remainingMinutes = minutes % 60;
    return `${hours} hr ${remainingMinutes} min`;
  };

  return (
    <Accordion sx={{ margin: "auto", mt: 4 }}>
      {/* Accordion Summary */}
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls="flight-content"
        id="flight-header"
      >
        <Box display="flex" justifyContent="space-between" width="100%">
          <Typography variant="h6" fontWeight="bold">
            Departure · {dayjs(data?.legs?.[0]?.departure).format("ddd, MMM D")}
          </Typography>
          <Typography variant="subtitle1" color="text.secondary">
            {data?.price?.formatted}
          </Typography>
          
        </Box>
      </AccordionSummary>

      {/* Accordion Details */}
      <AccordionDetails>
        {data?.legs?.map((leg, index) => (
          <Card key={index} sx={{ p: 2 }}>
            {/* Header */}
            <Box
              display="flex"
              justifyContent="space-between"
              alignItems="center"
            >
              <Typography variant="h6" fontWeight="bold">
                Departure · {dayjs(leg?.departure).format("ddd, MMM D")}
              </Typography>
              <Typography variant="subtitle1" color="text.secondary">
                {/* CO₂ emissions placeholder */}
              </Typography>
            </Box>

            {/* Flight Information */}
            <Divider sx={{ my: 2 }} />
            <Grid container spacing={2}>
              <Grid item xs={12}>
                {/* First flight details */}
                <Box
                  display="flex"
                  justifyContent="space-between"
                  alignItems="center"
                >
                  <Box>
                    <Typography variant="body1" fontWeight="bold">
                      {dayjs(leg?.departure).format("h:mm A")} {/* Formatted time */}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {leg?.origin?.city} ({leg?.origin?.displayCode})
                    </Typography>
                  </Box>
                  <Typography variant="body2" color="text.secondary">
                    {/* Placeholder for flight duration */}
                  </Typography>
                </Box>
              </Grid>

              <Grid item xs={12}>
                <Box
                  display="flex"
                  justifyContent="space-between"
                  alignItems="center"
                >
                  <Typography variant="body2" color="text.secondary">
                    {/* Placeholder for flight details */}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {/* Placeholder for flight code */}
                  </Typography>
                </Box>
              </Grid>

              {/* Layover details */}
              <Grid item xs={12}>
                <Box mt={1} textAlign="center" color="error.main">
                  <Typography variant="body2">
                  {formatDuration(leg?.durationInMinutes)}
                  </Typography>
                </Box>
              </Grid>

              {/* Second flight details */}
              <Grid item xs={12}>
                <Box
                  display="flex"
                  justifyContent="space-between"
                  alignItems="center"
                >
                  <Box>
                    <Typography variant="body1" fontWeight="bold">
                      {dayjs(leg?.arrival).format("h:mm A")} {/* Formatted time */}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {leg?.destination?.city} ({leg?.destination?.displayCode})
                    </Typography>
                  </Box>
                </Box>
              </Grid>
            </Grid>

            {/* Footer */}
            <Divider sx={{ my: 2 }} />
          </Card>
        ))}
      </AccordionDetails>
    </Accordion>
  );
}
