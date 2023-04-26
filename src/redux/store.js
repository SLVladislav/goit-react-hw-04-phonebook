import { configureStore, createSlice } from '@reduxjs/toolkit';
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist';
import storage from 'redux-persist/lib/storage';

//______________________________________________________________________________________________
export const contactSlice = createSlice({
  name: 'contacts',
  initialState: {
    list: [
      { id: 'id-1', name: 'Rosie', number: '459-12-56' },
      { id: 'id-2', name: 'Hermione', number: '443-89-12' },
      { id: 'id-3', name: 'Eden', number: '645-17-79' },
      { id: 'id-4', name: 'Annie', number: '227-91-26' },
    ],
  },
  reducers: {
    addContact(state, action) {
      // console.log(state);
      return (state.list = [...state, action.payload]);
      // state.list.push(action.payload);
    },
    deleteContact(state, action) {
      return (state.list = state.list.filter(
        contact => contact.id !== action.payload
      ));
    },
  },
});

export const getContactList = state => state.contacts.list;
console.log(getContactList);
export const getFilter = state => state.filter;
export const { addContact, deleteContact } = contactSlice.actions;

const persistConfig = {
  key: 'contacts',
  storage,
};

export const contactsReducer = persistReducer(
  persistConfig,
  contactSlice.reducer
);
//__________________________________________________________________________________
const filterSlice = createSlice({
  name: 'filter',
  initialState: '',
  reducers: {
    filterContacts(state, action) {
      return state === action.payload;
    },
  },
});

export const { filterContacts } = filterSlice.actions;
export const filterReducer = filterSlice.reducer;

//_________________________________________________________________________________
export const store = configureStore({
  reducer: {
    contact: contactsReducer,
    filter: filterReducer,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);
