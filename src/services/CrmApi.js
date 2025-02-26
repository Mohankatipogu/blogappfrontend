import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const CrmApi = createApi({
  reducerPath: 'CrmApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:5001/',
    prepareHeaders: (headers) => {
      headers.set('Content-Type', 'application/json');
      return headers;
    },
  }),
  endpoints: (builder) => ({

    getLead: builder.query({
      query: () => "/api/leads",
    }),

    login: builder.mutation({
      query: (body) => ({
        url: 'login',
        method: 'POST',
        body,
      }),
    }),

    signup: builder.mutation({
      query: (user) => ({
        url: "signup",
        method: "POST",
        body: user,
      }),
    }),

    addpost: builder.mutation({
      query: (post) => ({
        url: "/api/posts",
        method: "POST",
        body: post,
      }),
    }),
    getpost: builder.query({
      query: () => "/blogs",
    }),
    loginf: builder.query({
      query: () => "/",
    }),
  }),
});
export const { 
  useGetLeadQuery, 
  useLoginMutation, 
  useSignupMutation, 
  useAddpostMutation, 
  useGetpostQuery,
  useLoginfQuery,
} = CrmApi;
