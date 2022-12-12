import { createSlice } from '@reduxjs/toolkit';
import {dispatch} from "../store";

const initialState = {
    isModalOpen: false
};

const slice = createSlice({
    name: 'profileSetup',
    initialState,
    reducers: {
        openModal(state, action) {
            state.isModalOpen = true
        },
        closeModal(state, action) {
            state.isModalOpen = false
        }
    }
});

export default slice.reducer;

export function openModal() {
    dispatch(slice.actions.openModal());
}

export function closeModal() {
    dispatch(slice.actions.closeModal());
}