import React from 'react';

export const ContactList = ({ contacts, onDeleteContact, onFilterChange }) => (
  <div>
    <input
      type="text"
      name="filter"
      placeholder="Search contacts"
      onChange={onFilterChange}
    />
    <ul>
      {contacts.map((contact) => (
        <li key={contact.id}>
          {contact.name}: {contact.number}
          <button onClick={() => onDeleteContact(contact.id)}>Delete</button>
        </li>
      ))}
    </ul>
  </div>
);
export default ContactList;