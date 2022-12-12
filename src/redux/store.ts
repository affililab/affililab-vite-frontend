import {configureStore} from '@reduxjs/toolkit';
import {useDispatch as useAppDispatch, useSelector as useAppSelector} from 'react-redux';
import {persistReducer, persistStore} from 'redux-persist';
import storage from "redux-persist/lib/storage";
import {rootReducer} from "./rootReducer";

const rootPersistConfig = {
    key: 'root',
    storage,
    keyPrefix: 'redux-',
    whitelist: [],
};

export const store = configureStore({
    reducer: persistReducer(rootPersistConfig, rootReducer),
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: false,
            immutableCheck: false,
        }),
});

export const persistor = persistStore(store);

export const { dispatch } = store;

export const useSelector = useAppSelector;

export const useDispatch = () => useAppDispatch();

