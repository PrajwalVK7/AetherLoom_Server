//=========== user - reg,profile,log..
const jwt = require('jsonwebtoken') // jwt web token
const users = require('../Models/UserSchema');

/// user registration
exports.register = async (req, res) => {
    console.log("Inside user Registration");
    console.log("Req body:", req.body);

    const { username, email, password } = req.body;
    try {
        const existingUser = await users.findOne({ email: email });
        if (existingUser) {
            res.status(406).json("Account already exists , Please Login");
        }
        else {
            const newUser = new users({
                username: username,
                email: email,
                password: password,
                mobile: "",
                pincode: "",
                street: "",
                district: "",
                state: "",
                profile: "",
                wishlist: [],
                cart: []
            })
            await newUser.save()
            res.status(200).json(newUser)

        }
    } catch (err) {
        res.status(401).json(`registration failed due to : ${err}`)
    }


}

// login

exports.login = async (req, res) => {
    console.log("inside login")
    console.log("Req body:", req.body);
    const { email, password } = req.body;

    try {
        const existingUser = await users.findOne({ email: email, password: password })
        if (existingUser) {
            const token = jwt.sign({ userID: existingUser._id }, "aetherloomkey1234")
            res.status(200).json({
                existingUser: existingUser,
                token: token
            })
            console.log(token)
        }
        else {
            res.status(406).json("Invalid email id or password")
        }

    }
    catch (err) {
        res.status(401).json(`login failed due to : ${err}`)
    }
}

// get all users details

exports.getAllUsers = async (req, res) => {
    console.log("inside user details")
    console.log("Req body:", req.body);
    try {
        const allUsers = await users.find()
        if (allUsers.length > 0) {
            res.status(200).json(allUsers)
        }
        else{
            res.status(406).json("No users")
        }

    }
    catch (err) {
        console.log(err);
        res.state(501).json("Internal Server err")
    }
}