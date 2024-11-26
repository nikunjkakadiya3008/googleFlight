import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { prepareHeaders } from "./Utils";

export const LoginApi = createApi({
  reducerPath: "loginApi",
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.REACT_APP_BASE_URL,
    prepareHeaders: prepareHeaders,
  }),
  endpoints: (builder) => ({
    ResetPassword: builder.mutation({
      query: ({ id, newPassword }) => ({
        url: `/reset-password?id=${id || "-"}`,
        method: "post",
        body: { newPassword },
      }),
    }),
    ChangePassword: builder.mutation({
      query: (body) => ({
        url: `/change-password`,
        method: "post",
        body,
      }),
    }),
  }),
});

export const {
  useChangePaussswordMutation,
} = LoginApi;
