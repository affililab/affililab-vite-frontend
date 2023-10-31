import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    firstWizardDone: false
};

const slice = createSlice({
    name: 'welcome',
    initialState,
    reducers: {
        finishFirstWizard(state: any) {
            state.firstWizardDone = true
        },
    }
});

export default slice.reducer;

export const {
    finishFirstWizard
} = slice.actions;
