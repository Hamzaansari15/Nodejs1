import mongoose, { Schema } from "mongoose";


const userSchema = new mongoose.Schema({
    first_name: {type: String, required: true},
    last_name: {type: String, required: true},
    contact: {type: Number, required: true},
    email: {type: String, required: true, unique: true},
    password: {type: String, required: true}
})

const userModel = mongoose.model('users', userSchema);

export  { userModel }