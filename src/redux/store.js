import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query/react";
import { FlightsApi, LoginApi } from "../api/flights";
import _ from "lodash";
import cartReducer, { cartSlice } from "./slices/CartSlice";

export const store = configureStore({
  reducer: {
    cart: cartReducer,
    [FlightsApi.reducerPath]: FlightsApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(FlightsApi.middleware)
});

setupListeners(store.dispatch);

const createActions = (slice) =>
  _.mapValues(
    slice.actions,
    (actionCreator) => (payload) => store.dispatch(actionCreator(payload))
  );

export const actions = {
  cart : createActions(cartSlice)
};
