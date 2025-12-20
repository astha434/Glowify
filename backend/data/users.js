const bcrypt = require('bcryptjs');

const users = [
    {
        name: 'Admin User',
        email: 'admin@example.com',
        password: 'password123',
        isAdmin: true,
    },
    {
        name: 'Jane Doe',
        email: 'jane@example.com',
        password: 'password123',
        isAdmin: false,
    },
    {
        name: 'John Smith',
        email: 'john@example.com',
        password: 'password123',
        isAdmin: false,
    },
];

module.exports = users;
