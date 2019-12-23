import {  createStore } from 'redux';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import root_reducer from '../reducers';

const reducer = persistReducer(
    {
        key: 'rrsb',
        storage, 
        whitelist: [],
    },
    root_reducer
);

/* istanbul ignore next */
const configStore = (initialState = {}) => {
    const store = createStore(reducer, initialState, );

    return {
        persistor: persistStore(store),
        store,
    };
};

const { store, persistor } = configStore();

global.store = store;

export { store, persistor };
