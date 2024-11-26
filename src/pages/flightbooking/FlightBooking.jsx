import React, { useState } from "react";
import {
    Box,
    Typography,
    TextField,
    MenuItem,
    Button,
    IconButton,
} from "@mui/material";
import SwapHorizIcon from "@mui/icons-material/SwapHoriz";
import { LocalizationProvider, DatePicker } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import Grid from '@mui/material/Grid2';

const FlightSearch = () => {
    const [tripType, setTripType] = useState("Round trip");
    const [passengers, setPassengers] = useState(1);
    const [classType, setClassType] = useState("Economy");
    const [from, setFrom] = useState("");
    const [to, setTo] = useState("");
    const [departureDate, setDepartureDate] = useState(null);
    const [returnDate, setReturnDate] = useState(null);

    const handleSwapLocations = () => {
        const temp = from;
        setFrom(to);
        setTo(temp);
    };

    return (
        <Box
            sx={{
                bgcolor: "background.default",
                color: "text.primary",
                p: 4,
                maxWidth: 800,
                mx: "auto",
                boxShadow: 3,
                borderRadius: 2,
            }}
        >
            <Typography variant="h4" textAlign="center" mb={3}>
                Flights
            </Typography>

            {/* Top Controls */}
            <Box display="flex" mb={1} gap={1}>
                <TextField
                    select
                    value={tripType}
                    onChange={(e) => setTripType(e.target.value)}
                    size="small"
                    variant="filled"
                >
                    <MenuItem value="Round trip">Round trip</MenuItem>
                    <MenuItem value="One-way">One-way</MenuItem>
                </TextField>

                <TextField
                    type="number"
                    value={passengers}
                    onChange={(e) => setPassengers(e.target.value)}
                    size="small"
                    variant="filled"
                    InputProps={{ inputProps: { min: 1 } }}
                />
                <TextField
                    select
                    value={classType}
                    onChange={(e) => setClassType(e.target.value)}
                    variant="filled"
                    size="small"
                >
                    <MenuItem value="Economy">Economy</MenuItem>
                    <MenuItem value="Business">Business</MenuItem>
                    <MenuItem value="First">First</MenuItem>
                </TextField>
            </Box>

            <Grid container spacing={2}>
                <Grid size={7}>
                    <Box display="flex" alignItems="center" gap={2} mb={3}>
                        <TextField
                            label="From"
                            value={from}
                            onChange={(e) => setFrom(e.target.value)}
                            fullWidth
                        />
                        <IconButton onClick={handleSwapLocations}>
                            <SwapHorizIcon />
                        </IconButton>
                        <TextField
                            label="To"
                            value={to}
                            onChange={(e) => setTo(e.target.value)}
                            fullWidth
                        />
                    </Box>
                </Grid>
                <Grid size={5}>
                    <Box display="flex" gap={2} mb={3}>
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <DatePicker
                                label="Departure"
                                value={departureDate}
                                onChange={(newValue) => setDepartureDate(newValue)}
                                renderInput={(params) => <TextField {...params} fullWidth />}
                            />
                            {tripType === "Round trip" && (
                                <DatePicker
                                    label="Return"
                                    value={returnDate}
                                    onChange={(newValue) => setReturnDate(newValue)}
                                    renderInput={(params) => <TextField {...params} fullWidth />}
                                />
                            )}
                        </LocalizationProvider>
                    </Box>
                </Grid>
            </Grid>

            {/* Location and Date Selection */}




            {/* Explore Button */}
            <Box textAlign="center">
                <Button variant="contained" color="primary" size="large">
                    Explore
                </Button>
            </Box>
        </Box>
    );
};

export default FlightSearch;
