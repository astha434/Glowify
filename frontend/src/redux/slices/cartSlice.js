import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Async Thunks
export const fetchCart = createAsyncThunk('cart/fetchCart', async (_, { getState, rejectWithValue }) => {
    try {
        const { userLogin: { userInfo } } = getState();
        const config = {
            headers: { Authorization: `Bearer ${userInfo.token}` },
        };
        const { data } = await axios.get('/api/cart', config);

        // Normalize backend data to match frontend structure
        const normalizedItems = (data.cartItems || []).reduce((acc, item) => {
            if (item.product && item.product._id) {
                acc.push({
                    product: item.product._id,
                    name: item.product.name,
                    image: item.product.image,
                    price: item.product.price,
                    countInStock: item.product.countInStock,
                    quantity: item.quantity
                });
            }
            return acc;
        }, []);

        return normalizedItems;
    } catch (error) {
        return rejectWithValue(error.response && error.response.data.message ? error.response.data.message : error.message);
    }
});

export const addToCart = createAsyncThunk('cart/addToCart', async ({ productId, quantity }, { getState, rejectWithValue }) => {
    try {
        const { userLogin: { userInfo } } = getState();
        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`
            },
        };
        const { data } = await axios.post('/api/cart', { productId, quantity }, config);

        // Normalize backend data
        const normalizedItems = (data.cartItems || []).map(item => ({
            product: item.product._id,
            name: item.product.name,
            image: item.product.image,
            price: item.product.price,
            countInStock: item.product.countInStock,
            quantity: item.quantity
        }));

        return normalizedItems;
    } catch (error) {
        return rejectWithValue(error.response && error.response.data.message ? error.response.data.message : error.message);
    }
});

export const removeFromCart = createAsyncThunk('cart/removeFromCart', async (id, { getState, rejectWithValue }) => {
    try {
        const { userLogin: { userInfo } } = getState();
        const config = {
            headers: { Authorization: `Bearer ${userInfo.token}` },
        };
        const { data } = await axios.delete(`/api/cart/${id}`, config);

        // Normalize backend data
        const normalizedItems = (data.cartItems || []).map(item => ({
            product: item.product._id,
            name: item.product.name,
            image: item.product.image,
            price: item.product.price,
            countInStock: item.product.countInStock,
            quantity: item.quantity
        }));

        return normalizedItems;
    } catch (error) {
        return rejectWithValue(error.response && error.response.data.message ? error.response.data.message : error.message);
    }
});

export const clearCart = createAsyncThunk('cart/clearCart', async (_, { getState, rejectWithValue }) => {
    try {
        const { userLogin: { userInfo } } = getState();
        const config = {
            headers: { Authorization: `Bearer ${userInfo.token}` },
        };
        await axios.delete('/api/cart', config);
        return [];
    } catch (error) {
        return rejectWithValue(error.response && error.response.data.message ? error.response.data.message : error.message);
    }
});

const shippingAddressFromStorage = localStorage.getItem('shippingAddress')
    ? JSON.parse(localStorage.getItem('shippingAddress'))
    : {};

const paymentMethodFromStorage = localStorage.getItem('paymentMethod')
    ? JSON.parse(localStorage.getItem('paymentMethod'))
    : {};

const cartSlice = createSlice({
    name: 'cart',
    initialState: {
        cartItems: [],
        shippingAddress: shippingAddressFromStorage,
        paymentMethod: paymentMethodFromStorage,
        loading: false,
        error: null
    },
    reducers: {
        saveShippingAddress: (state, action) => {
            state.shippingAddress = action.payload;
            localStorage.setItem('shippingAddress', JSON.stringify(action.payload));
        },
        savePaymentMethod: (state, action) => {
            state.paymentMethod = action.payload;
            localStorage.setItem('paymentMethod', JSON.stringify(action.payload));
        },
        cartClearItems: (state) => {
            state.cartItems = [];
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchCart.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchCart.fulfilled, (state, action) => {
                state.loading = false;
                state.cartItems = action.payload;
            })
            .addCase(fetchCart.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(addToCart.fulfilled, (state, action) => {
                state.cartItems = action.payload;
            })
            .addCase(removeFromCart.fulfilled, (state, action) => {
                state.cartItems = action.payload;
            })
            .addCase(clearCart.fulfilled, (state, action) => {
                state.cartItems = [];
            });
    }
});

export const { saveShippingAddress, savePaymentMethod, cartClearItems } = cartSlice.actions;
export default cartSlice.reducer;
