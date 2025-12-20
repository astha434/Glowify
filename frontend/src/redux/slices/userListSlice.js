import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const listUsers = createAsyncThunk('userList/listUsers', async (_, { getState }) => {
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

export const deleteUser = createAsyncThunk('userList/deleteUser', async (id, { getState, rejectWithValue }) => {
    try {
        const {
            userLogin: { userInfo },
        } = getState();

        const config = {
            headers: {
                Authorization: `Bearer ${userInfo.token}`,
            },
        };

        await axios.delete(`/api/users/${id}`, config);
        return id;
    } catch (error) {
        return rejectWithValue(
            error.response && error.response.data.message
                ? error.response.data.message
                : error.message
        );
    }
});

const userListSlice = createSlice({
    name: 'userList',
    initialState: { users: [], loading: false, error: null, successDelete: false, deleteError: null },
    reducers: {
        userListReset: (state) => {
            state.users = [];
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(listUsers.pending, (state) => {
                state.loading = true;
                state.successDelete = false;
                state.deleteError = null;
            })
            .addCase(listUsers.fulfilled, (state, action) => {
                state.loading = false;
                state.users = action.payload;
            })
            .addCase(listUsers.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })
            .addCase(deleteUser.fulfilled, (state, action) => {
                state.successDelete = true;
                state.deleteError = null;
                // Optimistic update as well
                state.users = state.users.filter((user) => user._id !== action.payload);
            })
            .addCase(deleteUser.rejected, (state, action) => {
                state.successDelete = false;
                state.deleteError = action.payload || action.error.message;
            });
    },
});

export const { userListReset } = userListSlice.actions;

export default userListSlice.reducer;
