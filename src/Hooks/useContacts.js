import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { fetchContacts } from '../redux/contactsSlice';
import { useGetContactsQuery } from '../api/contactsApi';

export function useContacts() {
  const [contacts, setContacts] = useState([]);
  const dispatch = useDispatch();
  const getContactsQuery = useGetContactsQuery(); 

  useEffect(() => {
    const storedContacts = localStorage.getItem('contacts');
    if (storedContacts) {
      setContacts(JSON.parse(storedContacts));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('contacts', JSON.stringify(contacts));
  }, [contacts]);

  const handleAddContact = async (newContact) => {
    setContacts((prevContacts) => [...prevContacts, newContact]);

    const updatedContacts = await getContactsQuery;
    dispatch(fetchContacts.fulfilled(updatedContacts.data));
  };

  const handleDeleteContact = (id) => {
    setContacts((prevContacts) => prevContacts.filter((contact) => contact.id !== id));
  };

  return { contacts, handleAddContact, handleDeleteContact };
}
