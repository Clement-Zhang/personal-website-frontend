import { wake } from '../services/generic.service';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const start = createAsyncThunk('dating/wake', async () => {
    await wake();
});

export function selectGlobal(state) {
    return state.generic;
}

const technicalsSlice = createSlice({
    name: 'generic',
    initialState: {
        loading: true,
    },
    reducers: {},
    extraReducers: (builder) =>
        builder.addCase(start.fulfilled, (state) => {
            state.loading = false;
        }),
});

export default technicalsSlice.reducer;
