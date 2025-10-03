import { wake } from '../services/generic';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const start = createAsyncThunk('dating/wake', async () => {
    await wake();
});

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
