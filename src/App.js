import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [contacts, setContacts] = useState([]);
  const [newContact, setNewContact] = useState({ name: '', email: '', phone: '', job: '' });

  useEffect(() => {
    fetchContacts();
  }, []);

  const fetchContacts = async () => {
    try {
      const response = await axios.get('/api/contacts');
      setContacts(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setNewContact({ ...newContact, [name]: value });
  };

  const createContact = async () => {
    try {
      const response = await axios.post('/api/contacts', newContact);
      setContacts([...contacts, response.data]);
      setNewContact({ name: '', email: '', phone: '', job: '' });
    } catch (error) {
      console.error(error);
    }
  };

  const updateContact = async (id, updatedContact) => {
    try {
      const response = await axios.put(`/api/contacts/${id}`, updatedContact);
      const updatedContacts = contacts.map((contact) =>
        contact._id === id ? response.data : contact
      );
      setContacts(updatedContacts);
    } catch (error) {
      console.error(error);
    }
  };

  const deleteContact = async (id) => {
    try {
      await axios.delete(`/api/contacts/${id}`);
      const updatedContacts = contacts.filter((contact) => contact._id !== id);
      setContacts(updatedContacts);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="App">
      <h1>Contact List</h1>
      <div>
        <input
          type="text"
          name="name"
          placeholder="Name"
          value={newContact.name}
          onChange={handleInputChange}
        />
        <input
          type="text"
          name="email"
          placeholder="Email"
          value={newContact.email}
          onChange={handleInputChange}
        />
        <input
          type="text"
          name="phone"
          placeholder="Phone"
          value={newContact.phone}
          onChange={handleInputChange}
        />
        <input
          type="text"
          name="job"
          placeholder="Job"
          value={newContact.job}
          onChange={handleInputChange}
        />
        <button onClick={createContact}>Create Contact</button>
      </div>
      <ul>
        {contacts.map((contact) => (
          <li key={contact._id}>
            <span>{contact.name}</span>
            <span>{contact.email}</span>
            <span>{contact.phone}</span>
            <span>{contact.job}</span>
            <button onClick={() => updateContact(contact._id, { name: 'Updated Name' })}>
              Update
            </button>
            <button onClick={() => deleteContact(contact._id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
