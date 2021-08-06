import { configureStore, combineReducers } from '@reduxjs/toolkit';

import { reducers } from './slices';

const appReducer = combineReducers(reducers);

const store = configureStore({ reducer: appReducer });

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof appReducer>;

export default store;
