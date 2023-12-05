import React, { useState, useEffect } from 'react';
import LoginForm from './LoginForm';
import RegisterForm from './RegisterForm';
import { useDispatch } from 'react-redux';
import {
  useAddContactMutation,
  useDeleteContactMutation,
  useGetContactsQuery,
  useLoginMutation,
  useRegisterMutation,
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
  const [loginMutation] = useLoginMutation();
  const [registerMutation] = useRegisterMutation();

  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const onAddContact = (newContact) => {
    setContacts((prevContacts) => [...prevContacts, newContact]);
  };

  const handleAddContact = async (newContact) => {
    try {
      const { data: addedContact } = await addContactMutation(newContact);

      await refetch();

      dispatch(addContact.fulfilled(addedContact));

      console.log('Contact added successfully', addedContact);

      onAddContact(addedContact);
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

  const handleLogin = async (loginData) => {
    try {
      const response = await loginMutation(loginData);

      if (response.data && response.data.length > 0) {
        console.log('Login successful', response);
        setIsLoggedIn(true);
      } else {
        console.error('Invalid login credentials');
      }
    } catch (error) {
      console.error('Login failed', error);
    }
  };

  const handleRegister = async (registerData) => {
    try {
      const response = await registerMutation(registerData);

      if (response.data && response.data.id) {
        console.log('Registration successful', response);
       
      } else {
        console.error('Invalid registration data');
      }
    } catch (error) {
      console.error('Registration failed', error);
    }
  };

  return (
    <div>
      {isLoggedIn ? (
        <>
          <h1>Phonebook</h1>
          <h2>Add a Contact</h2>
          <ContactForm onAddContact={handleAddContact} />
          <h2>Contacts</h2>
          <ContactList
            contacts={contacts || []}
            onDeleteContact={handleDeleteContact}
            onAddContact={onAddContact}
          />
        </>
      ) : (
        <>
          <LoginForm onLogin={handleLogin} />
          <RegisterForm onRegister={handleRegister} />
        </>
      )}
    </div>
  );
};

export default App;
