import {combineReducers} from 'redux'

import {thunk} from 'redux-thunk'

import {configureStore} from '@reduxjs/toolkit'

import TripReducer from './Reducers/TripReducer.js';
import UserReducer from './Reducers/UserReducer.js';
import AdminReducer from './Reducers/AdminReducer.js';

const reducer=combineReducers({
    trips:TripReducer,
    user:UserReducer,
    admin:AdminReducer,
});

const initialState={};

const middleware=[thunk];

const store=configureStore({
    reducer:reducer,
    initialState:initialState,
    middleware:(getDefaultMiddleware) => getDefaultMiddleware().concat(middleware),
})

export default store;