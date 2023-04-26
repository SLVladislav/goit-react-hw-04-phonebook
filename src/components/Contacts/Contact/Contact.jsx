import PropTypes from 'prop-types';
import { FaUserAlt, FaTrash } from 'react-icons/fa';
import { Icon, Number, Wrapper, Button } from './Contact.styled';
import { deleteContact } from '../../../redux/store';
import { useDispatch } from 'react-redux';

const Contact = ({ name, number, id }) => {
  const dispatch = useDispatch();
  const deleteContacts = id => {
    dispatch(deleteContact(id));
  };
  return (
    <>
      <Wrapper>
        <Icon>
          <FaUserAlt />
        </Icon>
        <p>{`${name}`}</p>
      </Wrapper>
      <Wrapper>
        <Number>{`${number}`}</Number>
        <Button type="button" onClick={() => deleteContacts(id)}>
          <FaTrash />
        </Button>
      </Wrapper>
    </>
  );
};

Contact.propTypes = {
  name: PropTypes.string.isRequired,
  number: PropTypes.string.isRequired,
  deleteContact: PropTypes.func.isRequired,
  id: PropTypes.string.isRequired,
};

export default Contact;
