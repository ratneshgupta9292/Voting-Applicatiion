const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

// Define the User schema
const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    age: {
        type: Number
    },
    mobile: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    address: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true
    },
    password: {                    // ✅ Added this field
        type: String,
        required: true
    },
    adharCardNumber: {
        type: Number,
        required: true,
        unique: true
    },
    role: {
        type: String,
        required: true,
        enum: ["voter", "admin"],
        default: "voter"
    },
    isVoted: {
        type: Boolean,
        default: false
    }
});

// 🔐 Hash password before saving
userSchema.pre('save', async function(next) {
    const user = this;

    if (!user.isModified('password')) return next();

    try {
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(user.password, salt);
        next();
    } catch (err) {
        return next(err);
    }
});

// 🔐 Password comparison method
userSchema.methods.comparePassword = async function(candidatePassword) {
    try {
        return await bcrypt.compare(candidatePassword, this.password);
    } catch (err) {
        throw err;
    }
};

// Export the model
const User = mongoose.model('User', userSchema);
module.exports = User;
