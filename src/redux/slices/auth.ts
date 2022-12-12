import { createSlice } from '@reduxjs/toolkit';
import {dispatch} from "../store";

const initialState = {
    isModalOpen: false,
    mode: "login"
};

const slice = createSlice({
    name: 'authModal',
    initialState,
    reducers: {
        openModal(state, action) {
            state.isModalOpen = true
            state.mode = action.payload
        },
        closeModal(state, action) {
            state.isModalOpen = false
        }
    }
});

// Reducer
export default slice.reducer;

export function openModal(mode = "login") {
    dispatch(slice.actions.openModal(mode));
}

export function closeModal() {
    dispatch(slice.actions.closeModal());
}