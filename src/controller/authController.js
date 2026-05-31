const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const sendEmail = require('../utils/sendEmail');

const registerUser = async (req, res) => {
    const { email, password, name } = req.body;
    try {
        const existingUser = await User.findOne({ email });
        if(existingUser){
            return res.status(422).json({ message: "Email already exists" });
        }

        const user = await User.create({ email, password, name });
        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '7d' });
        res.cookie('token', token);

        try {
            const message = `Welcome ${name},\n\nThank you for registering!\n\nBest regards,\nThe Team`;
            await sendEmail(email, "Welcome to Our Site!", message);
        } catch(emailError) {
            console.error("Email failed:", emailError);
        }
        res.status(201).json({ 
            user: {
                id: user._id,
                email: user.email,
                name: user.name
            },
            token
        });        
    } catch(error) {
        res.status(500).json({ message: "Internal server error" });
    }
};
const loginUser = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email }).select('+password');
        if (!user) {
            return res.status(401).json({ message: "Invalid email or password" });
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ message: "Invalid email or password" });
        }   
        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '7d' });
        res.cookie('token', token);
        res.status(200).json({ 
            user: {
                id: user._id,
                email: user.email,
                name: user.name
            },
            token
        });
    } catch (error) {
        res.status(500).json({ message: "Internal server error" });
    }   
}

module.exports = { registerUser, loginUser };