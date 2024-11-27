import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { prepareHeaders } from "./Utils";

export const FlightsApi = createApi({
  reducerPath: "flightsApi",
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.REACT_APP_BASE_URL,
    prepareHeaders: prepareHeaders,
  }),
  endpoints: (builder) => ({
    searchAirport: builder.query({
      query: (params) => {
        return {
          url: '/searchAirport',
          params
        };
      },
      providesTags: ['Airports'],
    }),
    exploreFlight: builder.mutation({
      query: (params) => {
        return {
          url: '/searchFlights',
          method : "GET",
          params
        };
      },
      providesTags: ['Airports'],
    }),

  }),
});

export const {
  useSearchAirportQuery,
useExploreFlightMutation
} = FlightsApi;
