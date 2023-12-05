import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const api = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://656228f7dcd355c083249ed6.mockapi.io/' }),
  endpoints: (builder) => ({
    getContacts: builder.query({
      query: () => 'contacts',
    }),
    addContact: builder.mutation({
      query: (newContact) => ({
        url: 'contacts',
        method: 'POST',
        body: newContact,
      }),
    }),
    deleteContact: builder.mutation({
      query: (id) => ({
        url: `contacts/${id}`,
        method: 'DELETE',
      }),
    }),
    register: builder.mutation({
      query: (newUserData) => ({
        url: 'users',
        method: 'POST',
        body: newUserData,
      }),
    }),
    login: builder.mutation({
      query: ({ username, password }) => ({
        url: `users?username=${username}&password=${password}`,
        method: 'GET',
      }),
    }),
  }),
});

export const {
  useGetContactsQuery,
  useAddContactMutation,
  useDeleteContactMutation,
  useRegisterMutation,
  useLoginMutation,
} = api;
