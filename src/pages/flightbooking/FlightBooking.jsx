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
import { debounce } from "lodash"; // Import debounce from lodash
import dayjs from "dayjs";
import TorontoFlightCard from "./TorontoFlightCard";
import Grid from "@mui/material/Grid2";
import FlightCard2 from "./FlightCard2";
// import FlightCard from "./TorontoFlightCard";

const FlightSearch = () => {
  const [tripType, setTripType] = useState("One-way");
  const [passengers, setPassengers] = useState(1);
  const [classType, setClassType] = useState("economy");
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [departureDate, setDepartureDate] = useState(null);
  const [returnDate, setReturnDate] = useState(null);
  const [selectedFrom, setSelectedFrom] = useState(null);
  const [selectedTo, setSelectedTo] = useState(null);

  const [fromInput, setFromInput] = useState("");
  const [toInput, setToInput] = useState(""); // User input for "To"

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

  // const { date: searchFlights, refetch,isLoading } = useSearchFlightsQuery({
  //   originSkyId: selectedFrom?.value?.skyId,
  //   destinationSkyId: selectedTo?.value?.skyId,
  //   originEntityId: selectedFrom?.value?.entityId,
  //   destinationEntityId: selectedTo?.value?.entityId,
  //   date: dayjs(departureDate).format("YYYY-MM-DD"),
  //   cabinClass: classType,
  //   adults: passengers.toString(),
  //   sortBy: "best",
  //   currency: "USD",
  //   market: "en-US",
  //   countryCode: "US",
  // });

  const [getFlightData, { isLoading }] = useExploreFlightMutation();

  const callExplore = async () => {
    // const params = {
    //   originSkyId: selectedFrom?.value?.skyId,
    //   destinationSkyId: selectedTo?.value?.skyId,
    //   originEntityId: selectedFrom?.value?.entityId,
    //   destinationEntityId: selectedTo?.value?.entityId,
    //   date: dayjs(departureDate).format("YYYY-MM-DD"),
    //   cabinClass: classType,
    //   adults: passengers.toString(),
    //   sortBy: "best",
    //   currency: "USD",
    //   market: "en-US",
    //   countryCode: "US",
    // };
    // const data = await getFlightData(params); // Pass the parameters to the mutation function
    // console.log(data?.data?.itineraries      , "datadatadatadatadata");
    // setSearchFlightsData(data?.data);
  };
  const [searchFlightsData, setSearchFlightsData] = useState({
    context: {
      status: "complete",
      totalResults: 44,
    },
    itineraries: [
      {
        id: "10075-2411272315--32213-1-15466-2411280410",
        price: {
          raw: 125.99,
          formatted: "$126",
          pricingOptionId: "hz9uvWCt6MuV",
        },
        legs: [
          {
            id: "10075-2411272315--32213-1-15466-2411280410",
            origin: {
              id: "BOM",
              entityId: "95673320",
              name: "Mumbai",
              displayCode: "BOM",
              city: "Mumbai",
              country: "India",
              isHighlighted: false,
            },
            destination: {
              id: "PNQ",
              entityId: "128668941",
              name: "Pune",
              displayCode: "PNQ",
              city: "Pune",
              country: "India",
              isHighlighted: false,
            },
            durationInMinutes: 295,
            stopCount: 1,
            isSmallestStops: false,
            departure: "2024-11-27T23:15:00",
            arrival: "2024-11-28T04:10:00",
            timeDeltaInDays: 1,
            carriers: {
              marketing: [
                {
                  id: -32213,
                  alternateId: "49",
                  logoUrl:
                    "https://logos.skyscnr.com/images/airlines/favicon/49.png",
                  name: "IndiGo",
                },
              ],
              operationType: "fully_operated",
            },
            segments: [
              {
                id: "10075-9436-2411272315-2411280025--32213",
                origin: {
                  flightPlaceId: "BOM",
                  displayCode: "BOM",
                  parent: {
                    flightPlaceId: "IBOM",
                    displayCode: "BOM",
                    name: "Mumbai",
                    type: "City",
                  },
                  name: "Mumbai",
                  type: "Airport",
                  country: "India",
                },
                destination: {
                  flightPlaceId: "AMD",
                  displayCode: "AMD",
                  parent: {
                    flightPlaceId: "IAMD",
                    displayCode: "AMD",
                    name: "Ahmedabad",
                    type: "City",
                  },
                  name: "Ahmedabad",
                  type: "Airport",
                  country: "India",
                },
                departure: "2024-11-27T23:15:00",
                arrival: "2024-11-28T00:25:00",
                durationInMinutes: 70,
                flightNumber: "296",
                marketingCarrier: {
                  id: -32213,
                  name: "IndiGo",
                  alternateId: "49",
                  allianceId: 0,
                  displayCode: "",
                },
                operatingCarrier: {
                  id: -32213,
                  name: "IndiGo",
                  alternateId: "49",
                  allianceId: 0,
                  displayCode: "",
                },
              },
              {
                id: "9436-15466-2411280300-2411280410--32213",
                origin: {
                  flightPlaceId: "AMD",
                  displayCode: "AMD",
                  parent: {
                    flightPlaceId: "IAMD",
                    displayCode: "AMD",
                    name: "Ahmedabad",
                    type: "City",
                  },
                  name: "Ahmedabad",
                  type: "Airport",
                  country: "India",
                },
                destination: {
                  flightPlaceId: "PNQ",
                  displayCode: "PNQ",
                  parent: {
                    flightPlaceId: "IPNQ",
                    displayCode: "PNQ",
                    name: "Pune",
                    type: "City",
                  },
                  name: "Pune",
                  type: "Airport",
                  country: "India",
                },
                departure: "2024-11-28T03:00:00",
                arrival: "2024-11-28T04:10:00",
                durationInMinutes: 70,
                flightNumber: "699",
                marketingCarrier: {
                  id: -32213,
                  name: "IndiGo",
                  alternateId: "49",
                  allianceId: 0,
                  displayCode: "",
                },
                operatingCarrier: {
                  id: -32213,
                  name: "IndiGo",
                  alternateId: "49",
                  allianceId: 0,
                  displayCode: "",
                },
              },
            ],
          },
        ],
        isSelfTransfer: false,
        isProtectedSelfTransfer: true,
        farePolicy: {
          isChangeAllowed: false,
          isPartiallyChangeable: false,
          isCancellationAllowed: false,
          isPartiallyRefundable: false,
        },
        fareAttributes: {},
        isMashUp: false,
        hasFlexibleOptions: false,
        score: 0.999,
      },
    ],
    messages: [],
    filterStats: {
      duration: {
        min: 200,
        max: 1665,
        multiCityMin: 200,
        multiCityMax: 1665,
      },
      airports: [
        {
          city: "Mumbai",
          airports: [
            {
              id: "BOM",
              entityId: "95673320",
              name: "Mumbai",
            },
          ],
        },
        {
          city: "Pune",
          airports: [
            {
              id: "PNQ",
              entityId: "128668941",
              name: "Pune",
            },
          ],
        },
      ],
      carriers: [
        {
          id: -32672,
          alternateId: "AI",
          logoUrl: "https://logos.skyscnr.com/images/airlines/favicon/AI.png",
          name: "Air India",
        },
        {
          id: -32213,
          alternateId: "49",
          logoUrl: "https://logos.skyscnr.com/images/airlines/favicon/49.png",
          name: "IndiGo",
        },
      ],
      stopPrices: {
        direct: {
          isPresent: false,
        },
        one: {
          isPresent: true,
          formattedPrice: "$115",
        },
        twoOrMore: {
          isPresent: false,
        },
      },
    },
    flightsSessionId: "acc780dc-48df-40b6-9bcf-48320e812af4",
    destinationImageUrl:
      "https://content.skyscnr.com/m/3719e8f4a5daf43d/original/Flights-Placeholder.jpg",
  });

  console.log(searchFlightsData, "searchFlightsData");

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
      <Box display="flex" justifyContent="space-between" mb={2}>
        <TextField
          select
          value={tripType}
          onChange={(e) => setTripType(e.target.value)}
          size="small"
        >
          {/* <MenuItem value="Round trip">Round trip</MenuItem> */}
          <MenuItem value="One-way">One-way</MenuItem>
        </TextField>

        <TextField
          type="number"
          value={passengers}
          onChange={(e) => setPassengers(e.target.value)}
          size="small"
          InputProps={{ inputProps: { min: 1 } }}
        />
        <TextField
          select
          value={classType}
          onChange={(e) => setClassType(e.target.value)}
          size="small"
        >
          <MenuItem value="economy">Economy</MenuItem>
          <MenuItem value="business">Business</MenuItem>
        </TextField>
      </Box>

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
          } // Ensure comparison works
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
        >
          Explore
        </Button>
      </Box>
      <Grid container spacing={2}>
        {searchFlightsData?.itineraries?.map((value) => {
          return (
            <Grid size={12}>
              {/* <FlightCard data={value} /> */}
              <FlightCard2 data={value} />
            </Grid>
          );
        })}
      </Grid>
    </Box>
  );
};

export default FlightSearch;
