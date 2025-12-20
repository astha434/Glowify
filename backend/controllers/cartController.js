const asyncHandler = require('express-async-handler');
const Cart = require('../models/cartModel');

// @desc    Get user cart
// @route   GET /api/cart
// @access  Private
const getCart = asyncHandler(async (req, res) => {
    const cart = await Cart.findOne({ user: req.user._id }).populate('cartItems.product', 'name image price countInStock');
    if (cart) {
        res.json(cart);
    } else {
        // If no cart, return empty one or just Create one? 
        // For now, return empty object or null
        res.json({ cartItems: [] });
    }
});

// @desc    Add item to cart
// @route   POST /api/cart
// @access  Private
const addToCart = asyncHandler(async (req, res) => {
    const { productId, quantity } = req.body;

    let cart = await Cart.findOne({ user: req.user._id });

    if (cart) {
        // Check if product already exists in cart
        const itemIndex = cart.cartItems.findIndex(p => p.product.toString() === productId);

        if (itemIndex > -1) {
            // Product exists in the cart, update the quantity
            let productItem = cart.cartItems[itemIndex];
            productItem.quantity += quantity; // Or set to quantity if you prefer absolute set
            cart.cartItems[itemIndex] = productItem;
        } else {
            // Product does not exist in cart, add new item
            cart.cartItems.push({ product: productId, quantity });
        }
        await cart.save();
        const updatedCart = await Cart.findOne({ user: req.user._id }).populate('cartItems.product', 'name image price countInStock');
        res.json(updatedCart);
    } else {
        // No cart for user, create new cart
        const newCart = await Cart.create({
            user: req.user._id,
            cartItems: [{ product: productId, quantity }]
        });
        // Populate the new cart
        const populatedCart = await Cart.findById(newCart._id).populate('cartItems.product', 'name image price countInStock');
        res.status(201).json(populatedCart);
    }
});

// @desc    Remove item from cart
// @route   DELETE /api/cart/:id
// @access  Private
const removeFromCart = asyncHandler(async (req, res) => {
    const productId = req.params.id;
    let cart = await Cart.findOne({ user: req.user._id });

    if (cart) {
        cart.cartItems = cart.cartItems.filter(item => item.product.toString() !== productId);
        await cart.save();
        const updatedCart = await Cart.findById(cart._id).populate('cartItems.product', 'name image price countInStock');
        res.json(updatedCart);
    } else {
        res.status(404);
        throw new Error('Cart not found');
    }
});

const clearCart = asyncHandler(async (req, res) => {
    const cart = await Cart.findOne({ user: req.user._id });

    if (cart) {
        cart.cartItems = [];
        await cart.save();
        res.json({ message: 'Cart cleared' });
    } else {
        res.status(404);
        throw new Error('Cart not found');
    }
});

module.exports = {
    getCart,
    addToCart,
    removeFromCart,
    clearCart
};
