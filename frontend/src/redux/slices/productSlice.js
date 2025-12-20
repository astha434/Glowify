import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const listProducts = createAsyncThunk('products/listProducts', async (keyword = '') => {
    const { data } = await axios.get(`/api/products?keyword=${keyword}`);
    return data;
});

export const listProductDetails = createAsyncThunk('products/listProductDetails', async (id) => {
    const { data } = await axios.get(`/api/products/${id}`);
    return data;
});

export const deleteProduct = createAsyncThunk('products/deleteProduct', async (id, { getState }) => {
    const {
        userLogin: { userInfo },
    } = getState();

    const config = {
        headers: {
            Authorization: `Bearer ${userInfo.token}`,
        },
    };

    await axios.delete(`/api/products/${id}`, config);
});

const productSlice = createSlice({
    name: 'productList',
    initialState: { products: [], product: {}, loading: false, error: null, deleteSuccess: false },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(listProducts.pending, (state) => {
                state.loading = true;
            })
            .addCase(listProducts.fulfilled, (state, action) => {
                state.loading = false;
                state.products = action.payload;
            })
            .addCase(listProducts.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })
            .addCase(listProductDetails.pending, (state) => {
                state.loading = true;
            })
            .addCase(listProductDetails.fulfilled, (state, action) => {
                state.loading = false;
                state.product = action.payload;
            })
            .addCase(listProductDetails.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })
            .addCase(deleteProduct.pending, (state) => {
                state.loading = true; // Or use a separate deleteLoading
                state.deleteSuccess = false;
            })
            .addCase(deleteProduct.fulfilled, (state) => {
                state.loading = false;
                state.deleteSuccess = true;
            })
            .addCase(deleteProduct.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
                state.deleteSuccess = false;
            });
    },
});

export default productSlice.reducer;
