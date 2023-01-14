const User = require("../model/User.model");
const CryptoJS = require("crypto-js")
const PASSWORD_SECRET_KEY = process.env.PASSWORD_SECRET_KEY
const jwt = require('jsonwebtoken');
const JWT_SECRET_TOKEN = process.env.JWT_SECRET_TOKEN

const signup = async (req, res)=> {
    try {
        // const salt = await bcrypt.genSalt(10);
        // const hashedPassword = await bcrypt.hash(req.body.password, salt)
        const encryptedPassword = CryptoJS.AES.encrypt(req.body.password, PASSWORD_SECRET_KEY).toString()
        const newUser = new User({
            firstname: req.body.firstname,
            lastname: req.body.lastname,
            username: req.body.username,
            email: req.body.email,
            password: encryptedPassword,
        });

        const user = await newUser.save();
        res.status(200).json({
            "message": "Registered Successfully!",
            user
        })
    } catch (err) {
        res.status(500).json(err);
    }
}

const login = async (req, res) => {
    try {
        const user = await User.findOne({ username: req.body.username });
        !user && res.status(400).json("Wrong username or password!");

        const decryptedPassword = CryptoJS.AES.decrypt(user.password, PASSWORD_SECRET_KEY);
        const OriginalPassword = decryptedPassword.toString(CryptoJS.enc.Utf8);

        OriginalPassword !== req.body.password && res.status(401).json("Wrong login details!");

        const accessToken = jwt.sign({
            id: user._id
        }, JWT_SECRET_TOKEN, {expiresIn: "1h"}
        );

        // Destructuring the user to send other details except password
        const { password, ...other } = user._doc;
        res.status(200).json({
            "message": "Login Successful!",
            ...other,
            accessToken
        });
    } catch (err) {
        res.status(500).json(err);
    }
}

module.exports = {
    login,
    signup
}