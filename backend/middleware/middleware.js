import jwt from 'jsonwebtoken'
import User from '../models/Users.js'


const middleware = async (req, res, next) => {
    try {
        const token = req.headers.authorization.split(' ')[1]
        if (!token) {
            return res.status(401).json({ success: false, message: "Unauthorized User!" })
        }
        const decoded = jwt.verify(token, "secretkey123@#")
        if (!decoded) {
            return res.status(401).json({ success: false, message: "Wrong token" })
        }

        const user = await User.findById({ _id: decoded.id })
        if (!user) {
            return res.status(404).json({ success: false, message: "no user" })
        }
        const newUser = { name: user.name, id: user._id }
        req.user = newUser
        next()
    } catch (error) {
        return res.status(500).json({ success: false, message: "Please login!" });
    }
}

export default middleware