import { KYC_URL } from "../../constants";
import { apiSlice } from "./apiSlice";

export const kycApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // Query for fetching all KYC data
    getKycAllData: builder.query({
      query: () => ({
        url: `${KYC_URL}`,
        method: "GET",
      }),
      providesTags: ["KycData"], // Add a tag to identify this data
    }),
    // Query for fetching a single KYC record
    getKycData: builder.query({
      query: (id) => ({
        url: `${KYC_URL}/${id}/admin`,
      }),
      providesTags: (result, error, id) => [{ type: "KycData", id }], // Tag based on the specific ID
    }),
    // Mutation for updating KYC status
    updateKycStatus: builder.mutation({
      query: ({ id, status }) => ({
        url: `${KYC_URL}/${id}/status`,
        method: "PUT",
        body: { kycStatus: status }, // Assuming the API expects the status in the body
      }),
      // Invalidates `getKycAllData` and `getKycData` for the specific ID
      invalidatesTags: (result, error, { id }) => [
        "KycData", // Refetch all KYC data
        { type: "KycData", id }, // Refetch specific KYC record
      ],
    }),
  }),
});

// Export hooks generated by RTK Query
export const {
  useGetKycAllDataQuery,
  useGetKycDataQuery,
  useUpdateKycStatusMutation,
} = kycApiSlice;
