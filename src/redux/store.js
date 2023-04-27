import { combineReducers, configureStore, createSlice } from '@reduxjs/toolkit';
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
// import { nanoid } from 'nanoid';

//______________________________________________________________________________________________
export const contactSlice = createSlice({
  name: 'contacts',
  initialState: { items: [], filter: '' },
  reducers: {
    addContact(state, { payload }) {
      state.items.push(payload);
    },
    deleteContact(state, { payload }) {
      state.items = state.items.filter(item => item.id !== payload);
    },
    changeFilter(state, { payload }) {
      state.filter = payload;
    },
  },
});

// console.log(contactSlice.actions);

export const getContacts = state => state.contacts;
export const getFilter = state => state.filter;

export const { addContact, deleteContact, changeFilter } = contactSlice.actions;
// export const contactsReduser = contactSlice.reducer;

//__________________________________________________________________________________
// const filterSlice = createSlice({
//   name: 'filter',
//   initialState: '',
//   reducers: {
//     filterContacts(state, action) {
//       return (state = action.payload);
//     },
//   },
// });

// export const { filterContacts } = filterSlice.actions;
// export const filterReducer = filterSlice.reducer;

//_________________________________________________________________________________
// const rootReducer = combineReducers({
//   contacts: contactsReduser,
//   filter: filterReducer,
// });

const persistConfig = {
  key: 'root',
  whitelist: ['contacts'],
  storage,
};

const contactsReducer = persistReducer(persistConfig, contactSlice.reducer);

//__________________________________________________________________________
export const store = configureStore({
  reducer: {
    contact: contactsReducer,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);
