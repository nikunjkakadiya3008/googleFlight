import React from 'react';
import { Box, Card, Typography, Stack, Divider, IconButton } from '@mui/material';
import FlightTakeoffIcon from '@mui/icons-material/FlightTakeoff';
import FlightLandIcon from '@mui/icons-material/FlightLand';
import dayjs from 'dayjs';
import { calculateDateDifference, dateFormat, dateToTimeFormat, minToTime } from '../../utils/common';
import { AirlineSeatReclineNormal, MoreVert, PowerInput, Restaurant } from '@mui/icons-material';

export default function FlightItinerary({ data, legs }) {
    return (
        <Card sx={{ width: '100%', p: 3, borderRadius: 3, boxShadow: 3, m: 3 }}>
            <Box sx={{ mb: 3 }}>
                <Typography variant="h6" fontWeight="bold">
                    Depart • {dayjs(legs.departure).format("ddd, D MMM")}
                    <Typography component="span" sx={{ float: 'right', color: 'text.secondary' }}>
                        {minToTime(legs.durationInMinutes)}
                    </Typography>
                </Typography>
            </Box>

            {legs?.segments?.map((step, index) => {
                return (
                    <Box sx={{ mb: 3 }}>
                        <Stack direction="row" alignItems="center" sx={{ mb: 2 }}>
                            <img src={legs.carriers.marketing[0].logoUrl} alt="Air India" style={{ width: 40, height: 40, borderRadius: '50%', marginRight: 10 }} />
                            <Typography variant="subtitle1" fontWeight="medium">{step.operatingCarrier.name} {step.flightNumber} • Operated by {step.operatingCarrier.name}</Typography>
                            <Box sx={{ ml: 'auto' }}>
                                <IconButton size="small">
                                    <PowerInput fontSize="small" />
                                </IconButton>
                                <IconButton size="small">
                                    <AirlineSeatReclineNormal fontSize="small" />
                                </IconButton>
                                <IconButton size="small">
                                    <Restaurant fontSize="small" />
                                </IconButton>
                                <IconButton size="small">
                                    <MoreVert fontSize="small" />
                                </IconButton>
                            </Box>
                        </Stack>

                        <Stack direction="row" spacing={2}>
                            <Box sx={{ minWidth: 24, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                                <FlightTakeoffIcon sx={{ fontSize: 20, color: 'primary.main' }} />
                                <Box sx={{ flex: 1, width: 2, bgcolor: 'primary.main', my: 1 }} />
                                <FlightLandIcon sx={{ fontSize: 20, color: 'primary.main' }} />
                            </Box>
                            <Box sx={{ width: 70, textAlign: 'right', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'space-between' }}>
                                <Typography variant="subtitle1" fontWeight="bold">{dateToTimeFormat(step.departure)}</Typography>
                                <Typography variant="caption" sx={{ width: '100%', bgcolor: 'background.paper', color: 'text.secondary', px: 1 }}>
                                    {minToTime(step.durationInMinutes)}
                                </Typography>
                                <Typography variant="subtitle1" fontWeight="bold">{dateToTimeFormat(step.arrival)}</Typography>
                            </Box>
                            <Box sx={{ flex: 1 }}>
                                <Typography variant="body1" fontWeight="medium">{step.origin.name}({step.origin.displayCode})</Typography>
                                <Typography variant="body1" fontWeight="medium" sx={{ mt: 4 }}>{step.destination.name}({step.destination.displayCode})</Typography>
                                <Typography variant="caption" color="error" sx={{ display: 'block', mt: 1 }}>
                                    {dateFormat(step.arrival)}
                                </Typography>
                            </Box>
                        </Stack>
                        {/* Connection Information */}
                        {index !== legs?.segments?.length - 1 &&
                            <div>
                                <Divider sx={{ my: 3 }} />
                                <Box sx={{ py: 2, bgcolor: 'action.hover', borderRadius: 1, px: 2, mt: 3 }}>
                                    <Typography variant="body2" color="text.secondary" fontWeight="medium">
                                        {minToTime(calculateDateDifference(legs?.segments[index+1].departure,step.arrival))} • Change planes in {step.destination.name} ({step.destination.displayCode})
                                    </Typography>
                                </Box>
                            </div>
                        }

                    </Box>
                )
            })}
        </Card>
    );
}

