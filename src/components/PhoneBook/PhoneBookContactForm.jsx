import React, { useState } from 'react';
import { useAddContactMutation } from '../../api/contactsApi';
import { nanoid } from 'nanoid';

const ContactForm = () => {
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');

  const [addContact, { isLoading }] = useAddContactMutation();

  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  const handleNumberChange = (event) => {
    setNumber(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (name.trim() === '' || number.trim() === '') {
      alert('Please enter a valid name and number.');
      return;
    }

    try {
      const response = await addContact({
        id: nanoid(),
        name,
        number,
      });

      console.log('Contact added successfully', response);
     
      setName('');
      setNumber('');
    } catch (error) {
      console.error('Error adding contact', error);
      
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label htmlFor="name">Name:</label>
        <input type="text" id="name" name="name" value={name} onChange={handleNameChange} />

        <label htmlFor="number">Number:</label>
        <input type="tel" id="number" name="number" value={number} onChange={handleNumberChange} />

        <button type="submit" disabled={isLoading}>Add Contact</button>
      </form>
    </div>
  );
};

export default ContactForm;
