import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    items: []
};

const slice = createSlice({
    name: 'product',
    initialState,
    reducers: {
        toggleNoticedPartnerProgram(state: any, action: any) {
            const find = state.items.find((item: any) => item.id === action.payload.id)
            state.items = find ? state.items.filter((item: any) => item.id !== action.payload.id) : [ ...state.items, action.payload ]
        },
    }
});

export default slice.reducer;

export const {
    toggleNoticedPartnerProgram
} = slice.actions;
