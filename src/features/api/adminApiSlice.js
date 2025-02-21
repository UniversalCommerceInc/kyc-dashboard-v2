import { ADMIN_URL } from "../../constants";
import { apiSlice } from "./apiSlice";

export const adminApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (creds) => ({
        url: `${ADMIN_URL}/login`,
        method: "POST",
        body: creds,
      }),

    }),
  
    matrics: builder.query({
      query: () => ({
        url: `${ADMIN_URL}/metrics`
      }),
    }),
  }),
});

export const { useLoginMutation,  useMatricsQuery
  // useRegisterMutation, useMeQuery 
} = adminApiSlice;
