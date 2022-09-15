import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import User from '../models/user.js';

const login = async(req, res) => {
    const { username, password } = req.body;
    try {
        const oldUser = await User.findOne({ username });
        if(!oldUser)
        {
            return res.status(400).json({msg: 'User does not exist'});
        }

        const isPasswordValid = await bcrypt.compare(password, oldUser.password);

        if(!isPasswordValid) {
            return res.status(400).json({msg: 'Invalid credentials'});
        }

        const token = jwt.sign({ username: oldUser.username, id: oldUser._id }, "1234", {expiresIn: "1h"});
        res.status(200).json({ result: oldUser, token });
    } catch(error) {
        res.status(500).json({msg: 'Something went wrong'});
    }   
};

const signup = async(req, res) => {
    const { username, password, cpassword } = req.body;
    try {
        const oldUser = await User.findOne({ username });

        if(oldUser) {
            return res.status(400).json({msg: 'Account already exists'});
        }

        if(password !== cpassword) {
            return res.status(400).json({msg: 'Passwords do not match'});
        }

        const encryptedPassword = await bcrypt.hash(password, 12);

        const result = await User.create({
            username,
            password: encryptedPassword
        });

        const token = jwt.sign({ username: result.username, id: result._id }, "1234", { expiresIn: "1h" });

        res.status(201).json({result, token });
    } catch(err) {
        res.send(500).json({msg: 'Something went wrong'});
    }
};

export {
    login,
    signup
};