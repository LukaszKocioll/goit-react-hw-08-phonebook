import { createSlice } from '@reduxjs/toolkit';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { useGetContactsQuery, useAddContactMutation, useDeleteContactMutation } from '../api/contactsApi';

export const fetchContacts = createAsyncThunk('contacts/fetchContacts', async () => {
  const response = await useGetContactsQuery();
  return response.data;
});

export const addContact = createAsyncThunk('contacts/addContact', async (newContact) => {
  const response = await useAddContactMutation(newContact);
  return response.data;
});

export const deleteContact = createAsyncThunk('contacts/deleteContact', async (id) => {
  await useDeleteContactMutation(id);

  const updatedContacts = await useGetContactsQuery();
  return updatedContacts.data;
});

const contactsSlice = createSlice({
  name: 'contacts',
  initialState: { contacts: [], filter: '' },
  reducers: {
    setFilter: (state, action) => {
      state.filter = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchContacts.fulfilled, (state, action) => {
        state.contacts = action.payload;
      })
      .addCase(addContact.fulfilled, (state, action) => {
        state.contacts = [...state.contacts, action.payload];
      })
      .addCase(deleteContact.fulfilled, (state, action) => {
        state.contacts = action.payload;
      });
  },
});

export const { setFilter } = contactsSlice.actions;
export default contactsSlice.reducer;
