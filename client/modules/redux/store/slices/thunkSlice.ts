import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import axios from "axios";
import {RootState} from "@/modules/redux/store/configureStore";

interface User {
    id: number;
    name: string;
    username: string;
    email: string;
    phone: string;
}

interface thunkState {
    user: User | null;
    loading: 'idle' | 'pending' | 'succeeded' | 'failed';
    error: string;
}

const initialState: thunkState = {
    user: null,
    loading: 'idle',
    error: ''
}

export const fetchRandomUser = createAsyncThunk('fetchUserById', async (arg, thunkAPI) => {
    const id = Math.round(Math.random() * 10)
    try {
        const response = await axios.get('https://jsonplaceholder.typicode.com/users/' + id);
        return response.data;
    } catch (e: any) {
        return thunkAPI.rejectWithValue(e.message)
    }
})

const thunkSlice = createSlice({
    name: 'thunk',
    initialState,
    reducers: {},
    extraReducers: builder => {
        builder.addCase(fetchRandomUser.pending, (state) => {
            state.error = '';
            state.loading = 'pending';
        })
        builder.addCase(fetchRandomUser.fulfilled, (state, action) => {
            state.loading = 'succeeded';
            state.user = action.payload;
        })
        builder.addCase(fetchRandomUser.rejected, (state, action: PayloadAction<any>) => {
            state.loading = 'failed';
            state.error = action.payload || 'Unexpected error'
        })
    }
})

export default thunkSlice.reducer;

export const selectThunkExample = (state: RootState) => state.thunk;