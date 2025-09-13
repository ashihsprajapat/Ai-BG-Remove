

import { User } from './../model/user.model.js';
import bcrypt from 'bcrypt';
import crypto from "crypto"
import bodyParser from 'body-parser';

export const Login = async (req, res) => {
    let { username, password } = req.body;
    if (!username || !password) {
        return res.status(400).json({ message: "username or passworder  required" })
    }
    let user = await User.findOne({ username });
    if (!user) {
        return res.status(400).json({ message: "Username not exits" })
    }
    let match = await bcrypt.compare(password, user.password);
    if (!match) {
        return res.status(400).json({ message: "Wrong password" })
    }
    let token = await crypto.randomBytes(20).toString("hex");
    user.token = token;
    await user.save();
    return res.status(200).json({ token })
}


export const register = async (req, res) => {
    const { username, password, name } = req.body;
    if (!name || !username || !password) {
        return res.status(400).json({ message: "username or passworder  required" })
    }

    try {
        const user = await User.findOne({ username });
        if (user) {
            return res.status(400).json({ message: "username already exist" });
        }

        let hashPassword = await bcrypt.hash(password, 10);

        const newUser = new User({
            name: name,
            password: hashPassword,
            username: username,
        })

        await newUser.save()
            .then(() => {
                console.log(user)
            })

        return res.status(200).json({ message: "register successfull" })


    } catch (err) {
        throw err;
    }
}



