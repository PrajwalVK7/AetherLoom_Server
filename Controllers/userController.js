//=========== user - reg,profile,log..
const jwt = require('jsonwebtoken') // jwt web token
const users = require('../Models/UserSchema');
const bcrypt = require('bcrypt')

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
            const hashedPassword =  await bcrypt.hash(password, 10);
            console.log(hashedPassword)
            const newUser = new users({
                username: username,
                email: email,
                password: hashedPassword,
                mobile: "",
                pincode: "",
                street: "",
                district: "",
                state: "",
                profile: "",
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
    console.log("inside login");
    console.log("Req body:", req.body);
    const { email, password } = req.body;

    try {
        const existingUser = await users.findOne({ email: email });
        if (existingUser) {
            const checkPassword = await bcrypt.compare(password, existingUser.password);

            if (checkPassword) {
                const token = jwt.sign({ userID: existingUser._id }, "aetherloomkey1234");
                res.status(200).json({
                    existingUser: existingUser,
                    token: token
                });
            } else {
                res.status(406).json("Invalid email id or password");
            }
        } else {
            res.status(406).json("Invalid email id or password");
        }
    } catch (err) {
        res.status(401).json(`Login failed due to: ${err}`);
    }
};

// get userDetails

exports.getUserData = async (req, res) => {
    const userID = req.payload;

    try {
        const userData = await users.findById(userID)
        if (userData) {
            res.status(200).json(userData)
        }
        else {
            res.status(406).json("User Not Found")
        }

    } catch (err) {
        res.status(401).json("Request Failed ", err)
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
        else {
            res.status(406).json("No users")
        }

    }
    catch (err) {
        console.log(err);
        res.state(501).json("Internal Server err")
    }
}



// update profile
exports.updateProfile = async (req, res) => {
    const userID = req.payload;
    const { mobile, street, pincode, state, district, profile } = req.body
    const profileImage = req.file ? req.file.filename : profile;

    try {
        const editProfile = await users.findByIdAndUpdate({_id:userID},{
            mobile:mobile,
            pincode:pincode,
            street:street,
            district:district,
            state:state,
            profile:profileImage
        },
        {
            new: true
        })
        await editProfile.save()
        if(editProfile){
            res.status(200).json("Successfully Updated")
        }
        else{
            res.status(406).json("User Not Found")
        }
    }
    catch (err) {
        res.status(401).json("Update Failed due to", err)
    }
}
