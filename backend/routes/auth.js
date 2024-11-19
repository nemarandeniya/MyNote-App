import express from 'express';
import User from '../models/Users.js'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

const router = express.Router()

router.post('/register', async (req, res) => {
    try {
        const { name, email, password } = req.body;
        const user = await User.findOne({ email })
        if (user) {
            return res.status(401).json({ success: false, message: "User already exists" })
        }
        const hashPassword = await bcrypt.hash(password, 10)
        const newUser = new User({
            name, email, password: hashPassword
        })
        await newUser.save()
        res.status(201).json({ success: true, message: "User added successfully!" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, error: error.message });
    }
})

router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email })
        if (!user) {
            return res.status(401).json({ success: false, message: "User Not exists" })
        }

        const checkpassword = await bcrypt.compare(password, user.password)
        if (!checkpassword) {
            return res.status(401).json({ success: false, message: "Wrong Credentials" })
        }
        const token = jwt.sign({ id: user._id }, "secretkey123@#", { expiresIn: "24h" }
        )

        res.status(200).json({ success: true, token, user: { name: user.name }, message: "Login successfully!" });
    } catch (error) {
        return res.status(500).json({ success: false, message: "Something wrong! Error in login Server!" })
    }
})

export default router;