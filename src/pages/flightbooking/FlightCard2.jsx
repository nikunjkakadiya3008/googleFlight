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
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { dateFormat, dateToTimeFormat, minToTime } from "../../utils/common";

const FlightCard2 = ({ data }) => {
  console.log(data, "data123");
  return (
    <div>
      {data?.legs?.map((legs) => {
        console.log('legs: ', legs);
        return (
          <Accordion sx={{  }}>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              sx={{ padding: 2, backgroundColor: "#f7f7f7" }}
            >
              <Box display="flex" justifyContent="space-between" width="100%" alignItems="center">
                <Box display="flex" width="100%" alignItems="center" gap={2}>
                  <img src={legs.carriers.marketing[0].logoUrl} />
                  <div>
                    <Typography variant="subtitle1" color="text.secondary">
                      {dateToTimeFormat(legs.departure)} - {dateToTimeFormat(legs.arrival)}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {legs.carriers.marketing[0].name}
                    </Typography>
                  </div>
                  <div>
                    <Typography variant="subtitle1" color="text.secondary">
                      {minToTime(legs.durationInMinutes)}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {legs.origin.displayCode}-{legs.destination.displayCode}
                    </Typography>
                  </div>
                  <div>
                    <Typography variant="subtitle1" color="text.secondary">
                      {legs.segments.length - 1} stop{legs.segments.length > 2 && "s"}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {legs.segments.slice(0, legs.segments.length - 1).map((obj) => obj.destination.displayCode)?.toString()}
                    </Typography>
                  </div>
                </Box>
                <Box>
                  <Typography variant="h6" fontWeight="bold" color="primary">
                    {data?.price?.formatted}
                  </Typography>

                </Box>
              </Box>
            </AccordionSummary>
            <AccordionDetails>
              {legs?.segments?.map((step, index) => {
                return (
                  <Stepper orientation="vertical">
                    <Step key={index} active={false} completed={false}>
                      <StepLabel StepIconComponent={() => <img src={'./journey.png'} height={30} />}>
                        <Typography variant="body1" fontWeight="bold">
                          {dateFormat(step.departure)} • {step?.origin?.name}
                        </Typography>
                        Travel time: {minToTime(step.durationInMinutes)}
                        <Typography variant="body1" fontWeight="bold">
                          {dateFormat(step.arrival)} • {step?.destination?.name}
                        </Typography>
                      </StepLabel>
                    </Step>
                  </Stepper>
                )
              })}
            </AccordionDetails>
          </Accordion>
        )
      })}
    </div>
  );
};

export default FlightCard2;
