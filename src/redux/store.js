import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query/react";
import { LoginApi } from "../api/Login";
import _ from "lodash";
import cartReducer, { cartSlice } from "./slices/CartSlice";

export const store = configureStore({
  reducer: {
    cart: cartReducer,
    [LoginApi.reducerPath]: LoginApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(LoginApi.middleware)
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
