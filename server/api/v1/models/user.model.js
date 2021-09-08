const mongoose = require('mongoose');
var Schema   = mongoose.Schema;

var userSchema = new Schema({
    fullName: {
        type: String,
    },
    userName: {
        type: String,
        trim: true
    },
    email: {
        type: String
    },
    password: {
        type: String,
    },
    refreshTokens: {
        type: [String],
        default: []
    },
    kiteAccessToken: {
        type: String
    }
},{timestamps: true});

    
module.exports = mongoose.model('User', userSchema);
