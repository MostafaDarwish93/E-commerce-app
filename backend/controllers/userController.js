import userModel from "../models/userModel.js";
import validator from "validator";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
// Route for user login

const createToken =(id) =>{
    return jwt.sign({id},process.env.JWT_SECRET)
}
const loginUser = async (req, res) => {
    try{

        const {email, password} = req.body; // get the user data

        const user = await userModel.findOne({email: email}); // find the user in the database

        if (!user){ // if the user does not exist
            return res.json({success:false,message: "User does not exist"});
        }
        const isMatch = await bcrypt.compare(password, user.password); // compare the password
        if (!isMatch){ // if the password is incorrect
            return res.json({success:false,message: "Invalid credentials"});
        }else{
            const token = createToken(user._id); // create a token for the user
            res.json({success:true, token: token, username: user.name }); // respond with a token and the user data
        }

    }catch(err){
        console.log(err);
        res.json({success:false, message: err.message});
    }
    
};


// Route for user registration

const registerUser = async (req, res) => {

    try{

        const {name, email, password} = req.body; // get the user data

        // check if the user already exists
        const exists = await userModel.findOne({email: email});
        if (exists){
            return res.json({success:false,message: "User already exists"});
        }

        // validate the user data

        if (!validator.isEmail(email)){
            return res.json({success:false,message: "Invalid email"});
        }
        if (password.length < 8){
            return res.json({success:false,message: "Please enter a password with at least 8 characters"});
        }

        // create a new user

        // hash the password
        const salt = await bcrypt.genSalt(10); // 
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = new userModel({
            name: name,
            email: email,
            password: hashedPassword
        })

        const user = await newUser.save(); // save the user to the database

        const token = createToken(user._id); // create a token for the user

        res.json({success:true, token: token, username: name }); // respond with a token and the user data
    }catch(err){
        console.log(err);
        res.json({success:false, message: err.message});
    }

};

// Route for admin login

const loginAdmin = async (req, res) => {
    try{
        const {email, password} = req.body; // get the admin data
        if(email !== process.env.ADMIN_EMAIL || password !== process.env.ADMIN_PASSWORD){
            return res.status(400).json({success:false,message: "Invalid credentials"});
        }else{
            const token = jwt.sign({id: process.env.ADMIN_ID}, process.env.JWT_SECRET); // create a token for the admin
            return res.json({success:true, token: token, username: process.env.ADMIN_NAME }); // respond with a token and the admin data
        }
    }catch(err){
        
        res.status(500).json({success:false, message: err.message});
    }

};

export { loginUser, registerUser, loginAdmin }; // export the functions