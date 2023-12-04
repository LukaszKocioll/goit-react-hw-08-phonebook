import { configureStore } from '@reduxjs/toolkit';
import contactsReducer from './contactsSlice';
import { api } from '../api/contactsApi'; 

const store = configureStore({
  reducer: {
    contacts: contactsReducer,
    [api.reducerPath]: api.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(api.middleware),
});

export default store;
