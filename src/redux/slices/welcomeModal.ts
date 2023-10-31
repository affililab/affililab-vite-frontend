import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    welcomeDone: false
};

const slice = createSlice({
    name: 'welcome',
    initialState,
    reducers: {
        closeWelcomeModal(state: any) {
            state.welcomeDone = true
        },
        openModal(state: any) {
            state.welcomeDone = false
        },
    }
});

export default slice.reducer;

export const {
    closeWelcomeModal
} = slice.actions;
