const mongoose = require('mongoose');
const dotenv = require('dotenv');
const bcrypt = require('bcryptjs');
const User = require('./models/userModel');
const connectDB = require('./config/db');

dotenv.config();
connectDB();

const updateAdmin = async () => {
    try {
        const email = 'admin@example.com'; // Change this to the target admin email if different
        const user = await User.findOne({ email });

        if (user) {
            console.log('Admin user found:', user.name);

            // HARDCODED NEW CREDENTIALS - CHANGE THESE BEFORE RUNNING OR USE PROMPT
            // For a better experience, we will use command line args or defaults
            const newPassword = process.argv[2] || '123456';

            user.password = newPassword;
            await user.save();

            console.log('-----------------------------------');
            console.log('Admin Password Updated Successfully');
            console.log('-----------------------------------');
            console.log(`Email: ${email}`);
            console.log(`New Password: ${newPassword}`);
            console.log('-----------------------------------');
        } else {
            console.log('Admin user not found with email:', email);
        }
        process.exit();
    } catch (error) {
        console.error(`Error: ${error.message}`);
        process.exit(1);
    }
};

updateAdmin();
