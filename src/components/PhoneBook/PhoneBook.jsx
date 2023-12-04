import React from 'react';
import { useContacts } from '../../Hooks/useContacts';
import { useFilter } from '../../Hooks/useFilter'; 
import ContactForm from './PhoneBook/PhoneBookContactForm';
import ContactList from './PhoneBook/PhoneBookContactList';

const App = () => {
  const { contacts, handleAddContact, handleDeleteContact } = useContacts();
  const { filter, setFilter } = useFilter();

  const filteredContacts = contacts.filter((contact) =>
    contact.name.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <div>
      <h1>Phonebook</h1>
      <h2>Add a Contact</h2>
      <ContactForm onAddContact={handleAddContact} />
      <h2>Contacts</h2>
      <ContactList
        contacts={filteredContacts}
        onDeleteContact={handleDeleteContact}
        onFilterChange={(event) => setFilter(event.target.value)}
      />
    </div>
  );
};

export default App;
