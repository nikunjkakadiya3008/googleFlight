import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { prepareHeaders } from "./Utils";

export const FlightsApi = createApi({
  reducerPath: "flightsApi",
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.REACT_APP_BASE_URL,
    prepareHeaders: prepareHeaders,
  }),
  endpoints: (builder) => ({
    getNearByAirports: builder.query({
      query: (params) => {
        return {
          url: '/getNearByAirports',
          params
        };
      },
      providesTags: ['Airports'],
    }),
    searchAirport: builder.query({
      query: (params) => {
        return {
          url: '/searchAirport',
          params
        };
      },
      providesTags: ['Airports'],
    }),
    searchFlights: builder.query({
      query: (params) => {
        return {
          url: '/searchFlights',
          params
        };
      },
      providesTags: ['Airports'],
    }),

  }),
});

export const {
  useGetNearByAirportsQuery,
  useSearchAirportQuery,
  useSearchFlightsQuery,
} = FlightsApi;
