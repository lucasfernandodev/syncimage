const mongoose = require('mongoose');
const bcrypt = require('bcrypt')

const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    avatar: {
        type: String,
        required: true
    },
    description: {
        type: String,
    },
    email: {
        type: String,
        unique: true,
        required: true,
        lowercase: true,
    },
    password: {
        type: String,
        required: true,
        select: false
    },
    createdAt:{
        type: Date,
        default: Date.now
    }
})

UserSchema.pre('save', async function(next){
    const hash =  await bcrypt.hash(this.password, 10);
    this.password = hash;

    next();
})

mongoose.model('User', UserSchema);