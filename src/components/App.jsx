import { useState, useEffect } from 'react';
import { ContactsList } from './ContactsList/ContactsList';
import ContactForm from './ContactForm/ContactForm';
import { ContactFilter } from './ContactFilter/ContactFilter';

const initial = [
  { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
  { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
  { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
  { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
];

export default function App() {
  const [contacts, setContacts] = useState(
    () => JSON.parse(localStorage.getItem('contacts')) ?? initial
  );
  const [filter, setFilter] = useState('');

  const addContact = contact => {
    if (
      !contacts.find(
        ({ name }) => name.toLocaleLowerCase() === contact.name.toLowerCase()
      )
    ) {
      setContacts(contacts => [...contacts, contact]);
    } else {
      alert(`${contact.name} is already in contacts.`);
    }
  };

  const findContact = ({ currentTarget: { value } }) => {
    setFilter(value);
  };

  const filterContacts = () => {
    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(filter.toLowerCase())
    );
  };

  const deleteContact = contactId => {
    setContacts(contacts => contacts.filter(({ id }) => id !== contactId));
  };

  useEffect(() => {
    localStorage.setItem('contacts', JSON.stringify(contacts));
  }, [contacts]);

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'center',
        fontSize: 40,
        color: '#010101',
      }}
    >
      <h1>Phonebook</h1>

      <ContactForm onSubmit={addContact} />

      <h2> Contacts</h2>

      {contacts.length !== 0 && (
        <ContactFilter value={filter} onChange={findContact} />
      )}

      <ContactsList
        contacts={filterContacts(contacts)}
        deleteContact={deleteContact}
      />

      {contacts.length === 0 && <p>There are no contacts!</p>}
    </div>
  );
}
