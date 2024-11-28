import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  TextField,
  MenuItem,
  Button,
  IconButton,
  Autocomplete,
  CircularProgress,
} from "@mui/material";
import SwapHorizIcon from "@mui/icons-material/SwapHoriz";
import { LocalizationProvider, DatePicker } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import {
  useExploreFlightMutation,
  useSearchAirportQuery,
} from "../../api/flights";
import { debounce } from "lodash";
import dayjs from "dayjs";
import Grid from "@mui/material/Grid2";
import FlightCard from "./FlightCard";
import FlightTakeoffIcon from "@mui/icons-material/FlightTakeoff";

const FlightSearch = () => {
  const [tripType, setTripType] = useState("One-way");
  const [passengers, setPassengers] = useState(1);
  const [classType, setClassType] = useState("economy");
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [departureDate, setDepartureDate] = useState(dayjs().startOf('day'));
  const [returnDate, setReturnDate] = useState(null);
  const [selectedFrom, setSelectedFrom] = useState(null);
  const [selectedTo, setSelectedTo] = useState(null);

  const [fromInput, setFromInput] = useState("");
  const [toInput, setToInput] = useState("");

  // Separate state for location options for "From" and "To"
  const [locationOptionsFrom, setLocationOptionsFrom] = useState([]);
  const [locationOptionsTo, setLocationOptionsTo] = useState([]);

  // API query for "From"
  const { data: fromSearchData, isFetching: isFromFetching } =
    useSearchAirportQuery({
      query: fromInput,
      locale: "en-US",
    });

  // API query for "To"
  const { data: toSearchData, isFetching: isToFetching } =
    useSearchAirportQuery({
      query: toInput,
      locale: "en-US",
    });

  // Debounce the API calls to prevent excessive requests
  const debouncedFromSearch = debounce((value) => setFromInput(value), 1000);
  const debouncedToSearch = debounce((value) => setToInput(value), 1000);

  // Update location options when "From" search data changes
  useEffect(() => {
    if (fromSearchData?.data?.length) {
      const formattedOptions = fromSearchData?.data?.map((item) => ({
        label: item.presentation?.suggestionTitle, // Set the suggestionTitle as the label
        value: item, // Store the whole object as the value
      }));
      setLocationOptionsFrom(formattedOptions); // Update the "From" location options
    }
  }, [fromSearchData]);

  // Update location options when "To" search data changes
  useEffect(() => {
    if (toSearchData?.data?.length) {
      const formattedOptions = toSearchData?.data?.map((item) => ({
        label: item.presentation?.suggestionTitle, // Set the suggestionTitle as the label
        value: item, // Store the whole object as the value
      }));
      setLocationOptionsTo(formattedOptions); // Update the "To" location options
    }
  }, [toSearchData]);

  const handleSwapLocations = () => {
    const temp = from;
    const tempSelected = selectedFrom;
    setFrom(to);
    setTo(temp);
    setSelectedFrom(selectedTo);
    setSelectedTo(tempSelected);
  };

  const [getFlightData, { isLoading }] = useExploreFlightMutation();
  const [error, setError] = useState('');
  console.log('error: ', error);

  const callExplore = async () => {
    if (!selectedFrom?.value?.skyId || !selectedTo?.value?.skyId || !selectedFrom?.value?.entityId || !selectedTo?.value?.entityId || !departureDate || !classType || passengers < 1) {
      setError('Something went wrong!')
      return
    }
    const params = {
      originSkyId: selectedFrom?.value?.skyId,
      destinationSkyId: selectedTo?.value?.skyId,
      originEntityId: selectedFrom?.value?.entityId,
      destinationEntityId: selectedTo?.value?.entityId,
      date: dayjs(departureDate).format("YYYY-MM-DD"),
      cabinClass: classType,
      adults: passengers.toString(),
      sortBy: "best",
      currency: "USD",
      market: "en-US",
      countryCode: "US",
    };
    const data = await getFlightData(params); // Pass the parameters to the mutation function
    setSearchFlightsData(data?.data?.data);
  };

  const [searchFlightsData, setSearchFlightsData] = useState();

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
      <div style={{ border: '1px solid #8e8e8e', borderRadius: 10, padding: 15 }}>
        <Typography variant="h4" textAlign="center" mb={3}>
          Flights Search
        </Typography>

        {/* Top Controls */}
        <Box display="flex" mb={2} gap={1}>
          <TextField
            select
            value={tripType}
            onChange={(e) => setTripType(e.target.value)}
            size="small"
            variant="filled"
            placeholder="Trip"
          >
            <MenuItem value="One-way">One-way</MenuItem>
            <MenuItem value="Round trip">Round trip</MenuItem>
          </TextField>

          <TextField
            type="number"
            value={passengers}
            onChange={(e) => setPassengers(e.target.value)}
            size="small"
            variant="filled"
            InputProps={{ inputProps: { min: 1 } }}
            placeholder="No of person"
          />
          <TextField
            select
            value={classType}
            onChange={(e) => setClassType(e.target.value)}
            variant="filled"
            size="small"
            placeholder="Class"
          >
            <MenuItem value="economy">Economy</MenuItem>
            <MenuItem value="business">Business</MenuItem>
          </TextField>
        </Box>
        <Grid container spacing={2}>
          <Grid size={7}>
            {/* Location and Date Selection */}
            <Box display="flex" alignItems="center" gap={2} mb={3}>
              <Autocomplete
                fullWidth
                value={selectedFrom}
                onInputChange={(e, newValue) => debouncedFromSearch(newValue)} // Call debounced function
                onChange={(e, newValue) => {
                  setSelectedFrom(newValue);
                  setFrom(newValue?.value?.presentation?.title || ""); // Use newValue.value to access the full object
                }}
                options={locationOptionsFrom} // Use the separate location options for "From"
                getOptionLabel={(option) => option?.label || ""} // Use the 'label' field
                isOptionEqualToValue={(option, value) =>
                  option.label === value?.label
                }
                loading={isFromFetching}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="From"
                    fullWidth
                    InputProps={{
                      ...params.InputProps,
                      endAdornment: (
                        <>
                          {isFromFetching ? <CircularProgress size={20} /> : null}
                          {params.InputProps.endAdornment}
                        </>
                      ),
                    }}
                  />
                )}
              />

              <IconButton onClick={handleSwapLocations}>
                <SwapHorizIcon />
              </IconButton>

              <Autocomplete
                fullWidth
                value={selectedTo}
                onInputChange={(e, newValue) => debouncedToSearch(newValue)} // Call debounced function
                onChange={(e, newValue) => {
                  setSelectedTo(newValue);
                  setTo(newValue?.value?.presentation?.title || ""); // Use newValue.value to access the full object
                }}
                options={locationOptionsTo} // Use the separate location options for "To"
                getOptionLabel={(option) => option?.label || ""}
                isOptionEqualToValue={(option, value) =>
                  option.label === value?.label
                } // Ensure comparison works
                loading={isToFetching}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="To"
                    fullWidth
                    InputProps={{
                      ...params.InputProps,
                      endAdornment: (
                        <>
                          {isToFetching ? <CircularProgress size={20} /> : null}
                          {params.InputProps.endAdornment}
                        </>
                      ),
                    }}
                  />
                )}
              />
            </Box>
          </Grid>
          <Grid size={5}>
            <Box display="flex" gap={2} mb={3}>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                  label="Departure"
                  value={departureDate}
                  onChange={(newValue) => {
                    setDepartureDate(newValue)
                    setReturnDate(null)
                  }}
                  minDate={dayjs().startOf('day')}
                  renderInput={(params) => <TextField {...params} fullWidth />}
                />
                {tripType === "Round trip" && (
                  <DatePicker
                    label="Return"
                    value={returnDate}
                    onChange={(newValue) => setReturnDate(newValue)}
                    renderInput={(params) => <TextField {...params} fullWidth />}
                    minDate={departureDate}
                  />
                )}
              </LocalizationProvider>
            </Box>
          </Grid>
        </Grid>

        {/* Explore Button */}
        <Box textAlign="center">
          <Button
            variant="contained"
            color="primary"
            size="large"
            onClick={callExplore}
            disabled={isLoading} // Disable button when loading
            endIcon={
              isLoading ? (
                <CircularProgress size={20} color="inherit" /> // Loading spinner as endIcon
              ) : null
            }
            style={{ borderRadius: '10px', textTransform: 'capitalize' }}
          >
            Explore
          </Button>
        </Box>
      </div>
      <Grid container spacing={2} mt={5}>
        {isLoading ? (
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              marginTop: "20px",
              width: '100%'
            }}
          >
            <FlightTakeoffIcon style={{ fontSize: "50px" }} />
          </div>
        )
          :
          searchFlightsData?.itineraries?.length === 0 ? (
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                width: "100%",
                marginTop: "30px",
              }}
            >
              <h2>oops! Data not found...</h2>
            </div>
          )
            : searchFlightsData?.itineraries?.map((value) => {
              return (
                <Grid size={12}>
                  <FlightCard data={value} />
                </Grid>
              );
            })}
      </Grid>
    </Box>
  );
};

export default FlightSearch;
