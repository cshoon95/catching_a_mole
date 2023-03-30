import { configureStore } from '@reduxjs/toolkit';
import logger from 'redux-logger';
import data from './Data';
import view from './View';

export const store = configureStore({
    reducer: {
        data,
        view
    },
    middleware: getDefaultMiddleware =>
                getDefaultMiddleware({
                    serializableCheck: false,
                }).concat(logger),
})