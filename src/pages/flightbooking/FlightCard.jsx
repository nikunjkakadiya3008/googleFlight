import React from "react";
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from "@mui/material";
import FlightSummary from "./FlightSummary";
import FlightItinerary from "./FlightItinerary";

const FlightCard = ({ data }) => {
  return (
    <div>
      {data?.legs?.map((legs) => {
        return (
          <Accordion
            sx={{ backgroundColor: "#fff", borderRadius: 15, boxShadow: '0 3px 6px rgba(25,27,36,0.16),0 -1px 4px rgba(25,27,36,0.04)' }}
          >
            <AccordionSummary>
              <FlightSummary data={data} legs={legs} />
            </AccordionSummary>
            <AccordionDetails sx={{ backgroundColor: '#f9f9fb', display: 'flex', justifyContent: 'center' }}>
              <FlightItinerary data={data} legs={legs} />
            </AccordionDetails>
          </Accordion>
        )
      })}
    </div>
  );
};

export default FlightCard;

