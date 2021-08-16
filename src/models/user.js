const mongoose = require('mongoose');


const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: [true, 'A user must have a email'],
        unique: [true, 'That email address is taken.'],
    },
    password: {
        type: String,
        required: [true, 'A user must have a password']
    },
    name: { 
        type: String,
        required: [true, 'A user must have a name']
    },
    inventory: {
        type: Array,
        required: [true, 'A user must have a inventory']
    }
});


const User = mongoose.model('User', userSchema);

module.exports = User;