import { combineReducers } from 'redux';
import storage from 'redux-persist/lib/storage';
import {createAction, createReducer} from "@reduxjs/toolkit";

const rootPersistConfig = {
    key: 'root',
    storage,
    keyPrefix: 'redux-',
    whitelist: [],
};

interface CounterState {
    value: number
}

const increment = createAction('counter/increment');
const decrement = createAction('counter/decrement');
const incrementByAmount = createAction<number>('counter/incrementByAmount');

const initialState = { value: 0 } as CounterState;

const counterReducer = createReducer(initialState, (builder) => {
    builder
        .addCase(increment, (state, action) => {
            state.value++
        })
        .addCase(decrement, (state, action) => {
            state.value--
        })
        .addCase(incrementByAmount, (state, action) => {
            state.value += action.payload
        })
})

const rootReducer = combineReducers({
    counterReducer
});

export { rootPersistConfig, rootReducer };
