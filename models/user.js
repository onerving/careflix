var mongoose = require('mongoose');
var UserSchema = new mongoose.Schema({
    license: {
        type: Number,
        unique: true,
        required: true,
    },
    firstName: {
        type: String,
        required: true,
        trim: true
    },
    lastName: {
        type: String,
        required: true,
        trim: true
    },
    specialty: {
        type: String,
        unique: true,
        required: true,
        trim: true
    },
    password: {
        type: String,
        required: true,
    }
});
var User = mongoose.model('User', UserSchema);
module.exports = User;