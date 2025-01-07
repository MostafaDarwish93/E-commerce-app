import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: {type: String, required: true},
    email: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    cartData: {type: Object, default: {}},
},{minimize: false});
//{minimize: false} is used to store empty objects in the database

const userModel = mongoose.models.user || mongoose.model("user", userSchema); // if the model is already created, use it, otherwise create a new model

export default userModel;