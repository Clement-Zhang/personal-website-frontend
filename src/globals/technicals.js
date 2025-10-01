import { wake } from '../services/dating';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const start = createAsyncThunk('dating/wake', async () => {
    await wake();
    console.log('awake');
});

const technicalsSlice = createSlice({
    name: 'technicals',
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
