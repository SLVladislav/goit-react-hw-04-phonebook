import PropTypes from 'prop-types';
import Contact from '../Contact/Contact';
import { Item } from './ContactList.styled';
import { useDispatch, useSelector } from 'react-redux';
import { getContactList } from 'redux/store';
// import { FaTrash } from 'react-icons/fa';

const ContactList = ({ contacts }) => {
  const dispatch = useDispatch();
  const contactsList = useSelector(getContactList);
  const getVisibleContacts = () => {
    const normalizedFilter = filter.toLowerCase();

    return contactsList.filter(contact =>
      contact.name.toLowerCase().includes(normalizedFilter)
    );
  };

  return contacts ? (
    <ul>
      {getVisibleContacts.map(({ id, name, number }) => {
        return (
          <Item key={id}>
            <Contact
              name={name}
              number={number}
              // deleteContact={deleteContact}
              id={id}
            />
          </Item>
        );
      })}
    </ul>
  ) : (
    <></>
  );
};

ContactList.propTypes = {
  contacts: PropTypes.number.isRequired,
  visibleContacts: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      number: PropTypes.string.isRequired,
    }).isRequired
  ).isRequired,
  deleteContact: PropTypes.func.isRequired,
};

export default ContactList;
