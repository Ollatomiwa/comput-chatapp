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
                _id:newUser._id, fullName, email: newUser.email, profilePic: newUser.profilePic,
            });

        }else {
            res.status(400).json({ message: "Invalid user data"});
        }

    } catch (error) {
        console.log("Error in signup controller". error.message);
        res.status(500).json({ message: "Internet Server Error"})
        
        
    }
};

export const login = (req, res) => {
    res.send('login route')
};

export const logout = (req, res) => {
    res.send('logout route')
};