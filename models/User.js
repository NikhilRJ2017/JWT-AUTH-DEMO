const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');

/**
 * USER SCHEMA: 
 *              name: String
 *              email: String
 *              password: String
 */

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },

    email: {
        type: String,
        required: true,
        unique: true,
        validate: {
            validator: validator.isEmail,
            message: "Please provide valid email"
        }
    },

    password: {
        type: String,
        required: true
    }
}, {
    timestamps: true
});

// ********************** hashing out password before saving it in db **************************//
UserSchema.pre('save', async function () {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt)
});

// ********************** comparing passwords ****************************//
UserSchema.methods.comparePassword = async function (userEnteredPassword) {  
    const isMatch = await bcrypt.compare(userEnteredPassword, this.password);
    return isMatch;

}

const User = mongoose.model('User', UserSchema);
module.exports = User;

