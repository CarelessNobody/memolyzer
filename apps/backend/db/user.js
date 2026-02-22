const mongoose = require('mongoose');
const Scheme = mongoose.Scheme;

const userSchema = new SchemaType({
    username: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
});

module.exports = mongoose.model('User', userSchema);