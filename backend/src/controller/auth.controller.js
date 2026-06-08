const userModel = require('../models/user.model');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Blacklist = require('../models/blacklist.model');



/**
 * @name registerUserController
 * @description register a new user, expects username, email and password in the request body
 * @access Public
 */

const registerUser = async (req, res) => {
    const { username, email, password } = req.body;
    if(!username || !email || !password) {
        return res.status(400).json({ message: 'Username, email and password are required' });
    }

    try {
        // Check if the user already exists
        const existingUser = await userModel.findOne({
            $or: [{ username }, { email }],
        })
        if (existingUser) {
            return res.status(400).json({ message: 'Username or email already exists' });
        }

        const hash = await bcrypt.hash(password, 10);
        // Create a new user
        const newUser = await userModel.create({
            username,
            email,
            Password: hash,
        })

        const token = jwt.sign({
            id: newUser._id, username: newUser.username }, 
            process.env.JWT_SECRET,
            { expiresIn: '1d' }
        );
        res.cookie('token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',});
        
        res.status(201).json({
                message: 'User registered successfully',
                user: {
                    id: newUser._id,
                    username: newUser.username,
                    email: newUser.email
                }
        });

    }
    catch (error) { 
        console.error('Error registering user:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
}


/**
 * @name loginUserController
 * @description login a user, expects email and password in the request body
 * @access Public
 */
const loginUser = async (req, res) => {
    const { email, password } = req.body;   
    if(!email || !password) {
        return res.status(400).json({ message: 'Email and password are required' });
    }
    try{
        const user = await userModel.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: 'Invalid email or password' });
        }

        const isPasswordValid = await bcrypt.compare(password, user.Password);
        if (!isPasswordValid) {
            return res.status(400).json({ message: 'Invalid email or password' });
        }

        const token = jwt.sign({
            id: user._id, username: user.username }, 
            process.env.JWT_SECRET, 
            {expiresIn: '1d'})

        res.cookie('token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
        });
        res.status(200).json({
            message: 'User logged in successfully',
            user:{
                id:user._id,
                username: user.username,
                email: user.email
            }
        });

        

    }catch (error) {   
        console.error('Error logging in user:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
}

/**
 * @name logoutUserController
 * @description logout a user, expects a valid JWT token in the request cookies
 * @access Public
 */
const logoutUser = async (req, res) => {
    const token = req.cookies.token;
    if(token){
        await Blacklist.create({ token });
    }
    res.clearCookie('token');
    res.status(200).json({ message: 'User logged out successfully' });
}

/**
 * @name getMeController
 * @description gets the details of current user.
 * @access Private
 */
const getme = async (req, res) =>{
    const user = await userModel.findById(req.user.id).select('-Password');
    res.status(200).json({
        message: "user details fetched successfully",
        user: {
            id: user._id,
            username: user.username,
            email: user.email
        }
    })
}


module.exports = {
    registerUser,
    loginUser,
    logoutUser,
    getme
}