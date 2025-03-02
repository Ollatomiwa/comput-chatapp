import cloudinary from '../lib/cloudinary.js';
import { generateToken } from '../lib/utils.js';
import User from '../models/userModal.js'
import bcrypt from "bcryptjs"

export const signup = async (req, res) => {
    const {fullName, email, password} = req.body;
    try {
        //signup the user, hash their password with bcrypt and create a token to let them know they are authenticated
        
        //checking if user password is less than six or if any of the inputs are not provided

        if(!fullName || !email || !password) {
            return res.status(400).json ({message: "All fields are required"});
        }
        if(password.length < 6) {
            return res.status(400).json ({message: "Password must be at least 6 characters"});
        }
        //if it is more or equal to six
        const user = await User.findOne({email}) // checks if email already exists
        if (user) return res.status(400).json({ message: "Email already exists"})

        //hashing the password
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password,salt)

        const newUser = new User({
            fullName,
            email,
            password:hashedPassword
        })

        //if the new user creation is successful

        if(newUser) {
            //saving user to the db by generating jwt token 
            generateToken(newUser._id, res)
            //save user to db
            await newUser.save();
            res.status(201).json({
                _id:newUser._id, 
                fullName: newUser.fullName, 
                email: newUser.email, 
                profilePic: newUser.profilePic,
            });

        }else {
            res.status(400).json({ message: "Invalid user data"});
        }

    } catch (error) {
        console.log("Error in signup controller". error.message);
        res.status(500).json({ message: "Internet Server Error"})
        
        
    }
};

export const login = async (req, res) => {
    const {email, password} = req.body
    try {
        const user = await User.findOne({email})

        if(!user) {
            return res.status(400).json({message: "Invalid Login details"});
        }

        const isPasswordCorrect = await bcrypt.compare(password, user.password);
        if(!isPasswordCorrect) {
            return res.status(400).json({message: "Invalid Login details"});
        }

        // if password correct, generate tokem
        generateToken(user._id, res)
        
        res.status(200).json({
            _id:user._id, 
            fullName: user.fullName, 
            email: user.email, 
            profilePic: user.profilePic,
        });

    } catch (error) {
        console.log("Error in login details", error.message);
        return res.status(500).json({message: "Server error"});
    }
};

export const logout =  (req, res) => {
   try {
        res.cookie("jwt", "", {maxAge:0})
        return res.status(200).json({message: "Logout successful"});
   } catch (error) {
        console.log("Error in logout controller", error.message);
        return res.status(500).json({message: "Server error"});
   }
};

//TO BE ABLE TO UPDATE THE PROFILE IMAGE WE NEED A SERVICE SO WE CAN UPLOAD THE IMAGE INTO (CLOUDINARY)
export const updateProfile = async (req, res) => {
    try {
        const {profilePic} = req.body;
        const userId = req.user._id;

        if(!profilePic) {
            return res.status(400).json({message: "Profile Pic is required"});
        }
        const uploadResponse = await cloudinary.uploader.upload(profilePic);

        //updating the profile pic in the db
        const updatedUser = await User.findByIdAndUpdate(userId, {profilePic:uploadResponse.secure_url})
        return res.status(200).json(updatedUser);
        
    } catch (error) {
        console.log("Error in update profile:", error);
        return res.status(500).json({message: "Server Error"});
    }
};

//CHECKING IF USER IS AUTHENTICATED
export const checkAuth = (req, res) => {
    try {
        res.status(200).json(req.user);

    } catch (error) {
          console.log("Error in checkAuth controller:", error);
        return res.status(500).json({message: "Server Error"});
    }
}