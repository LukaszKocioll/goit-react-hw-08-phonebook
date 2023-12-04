import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import {
  useAddContactMutation,
  useDeleteContactMutation,
  useGetContactsQuery,
} from '../api/contactsApi';
import { setFilter, fetchContacts, addContact } from '../redux/contactsSlice';
import ContactForm from './PhoneBook/PhoneBookContactForm';
import ContactList from './PhoneBook/PhoneBookContactList';

const App = () => {
  const dispatch = useDispatch();
  const [contacts, setContacts] = useState([]);
  const { data: initialContacts, refetch } = useGetContactsQuery();

  useEffect(() => {
    if (initialContacts) {
      setContacts(initialContacts);
      dispatch(setFilter(''));
    }
  }, [initialContacts, dispatch]);

  const [addContactMutation] = useAddContactMutation();
  const [deleteContactMutation] = useDeleteContactMutation();

  const onAddContact = (newContact) => {
    setContacts((prevContacts) => [...prevContacts, newContact]);
  };

  const setName = () => {
  };

  const setNumber = () => {
  };

  const handleAddContact = async (newContact) => {
    try {
      const { data: addedContact } = await addContactMutation(newContact);

      await refetch();

      dispatch(addContact.fulfilled(addedContact));

      console.log('Contact added successfully', addedContact);

      onAddContact(addedContact);

      setName('');
      setNumber('');
    } catch (error) {
      console.error('Error adding contact:', error);
    }
  };

  const handleDeleteContact = async (id) => {
    try {
      await deleteContactMutation(id);

      const updatedContacts = await fetchContacts();
      dispatch(fetchContacts.fulfilled(updatedContacts.payload));

      setContacts((prevContacts) => prevContacts.filter((contact) => contact.id !== id));
    } catch (error) {
      console.error('Error deleting contact:', error);
    }
  };

  return (
    <div>
      <h1>Phonebook</h1>
      <h2>Add a Contact</h2>
      <ContactForm onAddContact={handleAddContact} />
      <h2>Contacts</h2>
      {}
      <ContactList
        contacts={contacts || []}
        onDeleteContact={handleDeleteContact}
        onAddContact={onAddContact}
      />
    </div>
  );
};

export default App;
