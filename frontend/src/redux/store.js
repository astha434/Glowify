import { configureStore } from '@reduxjs/toolkit';
import productReducer from './slices/productSlice';
import userReducer from './slices/userSlice';
import userListReducer from './slices/userListSlice';
import cartReducer from './slices/cartSlice';
import themeReducer from './slices/themeSlice';
import orderReducer from './slices/orderSlice';

const store = configureStore({
    reducer: {
        productList: productReducer,
        userLogin: userReducer,
        userList: userListReducer,
        cart: cartReducer,
        order: orderReducer,
        theme: themeReducer,
    },
});

export default store;
