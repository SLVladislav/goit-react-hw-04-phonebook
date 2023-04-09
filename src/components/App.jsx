// import useLocalStorage from '../hooks/localStorage';
import { useState, useEffect } from 'react';
import { nanoid } from 'nanoid';
import ContactForm from './ContactForm';
import Filter from './Filter';
import ContactList from './Contacts/ContactList';
import { Container, Title, Header, Subtitle } from './App.styled';

export default function App() {
  // const [contacts, setContacts] = useLocalStorage([]);
  // const [filter, setFilter] = useLocalStorage('');
  const [contacts, setContacts] = useState(() => {
    return JSON.parse(localStorage.getItem('contacts')) ?? [];
  });
 
  const [filter, setFilter] = useState('');

  useEffect(() => {
    window.localStorage.setItem('contacts', JSON.stringify(contacts));
  }, [contacts]);

  const addContact = obj => {
    setContacts(prevState => [...prevState, { id: nanoid(), ...obj }]);
  };

  const handlChangeFilter = e => {
    setFilter(e.currentTarget.value);
  };

  const deleteContact = id => {
    setContacts(prevState => prevState.filter(contact => contact.id !== id));
  };

  const getVisibleContacts = () => {
    const normalizedFilter = filter.toLowerCase();

    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(normalizedFilter)
    );
  };

  return (
    <Container>
      <Header>
        Phone<Title>book</Title>
      </Header>
      <ContactForm addContact={addContact} contacts={contacts} />
      <Subtitle>Contacts</Subtitle>
      <Filter handlChangeFilter={handlChangeFilter} filter={filter} />
      <ContactList
        contacts={contacts.length}
        deleteContact={deleteContact}
        visibleContacts={getVisibleContacts()}
      />
    </Container>
  );
}
