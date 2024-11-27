
export const prepareHeaders = (headers) => {
    headers.set('x-rapidapi-key', process.env.REACT_APP_API_KEY);
    headers.set('x-rapidapi-host', process.env.REACT_APP_API_HOST);

    return headers;
};


// ResetPassword: builder.mutation({
    //   query: ({ id, newPassword }) => ({
    //     url: `/reset-password?id=${id || "-"}`,
    //     method: "post",
    //     body: { newPassword },
    //   }),
    // }),
    

     // const { date : searchFlightsComplete  } = useSearchFlightsCompleteQuery({
  //   originSkyId: 'LOND',
  //   destinationSkyId: 'NYCA',
  //   originEntityId: '27544008',
  //   destinationEntityId: '27537542',
  //   cabinClass: 'economy',
  //   adults: '1',
  //   sortBy: 'best',
  //   currency: 'USD',
  //   market: 'en-US',
  //   countryCode: 'US'
  // });

  // const { date : searchIncomplete  } = useSearchIncompleteQuery({
  //   currency: 'USD',
  //   market: 'en-US',
  //   countryCode: 'US'
  // });

  // const { date : getFlightDetails  } = useGetFlightDetailsQuery({
  //   legs: '"[{"destination":"LOND","origin":"LAXA","date":"2024-04-11"}]"',
  //   adults: '1',
  //   currency: 'USD',
  //   locale: 'en-US',
  //   market: 'en-US',
  //   countryCode: 'US'
  // });

  // const { date : getPriceCalendar  } = useGetPriceCalendarQuery({
  //   originSkyId: 'BOM',
  //   destinationSkyId: 'JFK',
  //   fromDate: '2024-02-20',
  //   currency: 'USD'
  // });

  // const { date : searchFlightsMultiStops  } = useSearchFlightsMultiStopsQuery({
  //   legs: '"[{"origin":"AMD","originEntityId":"95673366","destination":"STV","destinationEntityId":"128667060","date":"2025-02-07"},{"originEntityId":"128667060","destination":"BOM","destinationEntityId":"95673320","origin":"STV","date":"2025-02-12"}]"',
  //   cabinClass: 'economy',
  //   adults: '1',
  //   sortBy: 'best',
  //   currency: 'USD',
  //   countryCode: 'US',
  //   market: 'en-US'
  // });


  // const { date : searchFlightEverywhere  } = useSearchFlightEverywhereQuery({
  //   currency: 'USD',
  //   market: 'en-US',
  //   countryCode: 'US'
  // });
  
  
  
  // const { date : searchFlightEverywhereDetails  } = useSearchFlightEverywhereDetailsQuery({
  //   oneWay: 'false',
  //   currency: 'USD'
  // });
