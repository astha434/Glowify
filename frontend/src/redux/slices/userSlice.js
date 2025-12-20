import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const login = createAsyncThunk('user/login', async ({ email, password }) => {
    const config = {
        headers: {
            'Content-Type': 'application/json',
        },
    };
    const { data } = await axios.post('/api/users/login', { email, password }, config);
    localStorage.setItem('userInfo', JSON.stringify(data));
    return data;
});

export const logout = createAsyncThunk('user/logout', async () => {
    localStorage.removeItem('userInfo');
});

export const register = createAsyncThunk('user/register', async ({ name, email, password }) => {
    const config = {
        headers: {
            'Content-Type': 'application/json',
        },
    };
    const { data } = await axios.post('/api/users', { name, email, password }, config);
    localStorage.setItem('userInfo', JSON.stringify(data));
    return data;
});

export const listUsers = createAsyncThunk('user/list', async (_, { getState }) => {
    const {
        userLogin: { userInfo },
    } = getState();

    const config = {
        headers: {
            Authorization: `Bearer ${userInfo.token}`,
        },
    };

    const { data } = await axios.get('/api/users', config);
    return data;
});

const userInfoFromStorage = localStorage.getItem('userInfo')
    ? JSON.parse(localStorage.getItem('userInfo'))
    : null;

const userSlice = createSlice({
    name: 'userLogin',
    initialState: { userInfo: userInfoFromStorage, users: [], loading: false, error: null },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(login.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(login.fulfilled, (state, action) => {
                state.loading = false;
                state.userInfo = action.payload;
            })
            .addCase(login.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })
            .addCase(logout.fulfilled, (state) => {
                state.userInfo = null;
            })
            .addCase(register.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(register.fulfilled, (state, action) => {
                state.loading = false;
                state.userInfo = action.payload;
            })
            .addCase(register.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })
            .addCase(listUsers.pending, (state) => {
                state.loading = true;
            })
            .addCase(listUsers.fulfilled, (state, action) => {
                state.loading = false;
                state.users = action.payload;
            })
            .addCase(listUsers.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            });
    },
});

export default userSlice.reducer;
