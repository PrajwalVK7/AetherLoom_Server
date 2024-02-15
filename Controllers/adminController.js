const admin = require('../Models/AdminSchema');
const jwt = require('jsonwebtoken');

exports.adminLogin = async (req, res) => {
    console.log("inside admin login");
    const { username, password } = req.body;
    console.log(req.body);

    try {
        const response = await admin.findOne({ username:username, password:password });
        console.log("res",response);

        if (response) {
            console.log("Login successful");
            const token = jwt.sign({ adminId: response._id }, "aetherloomkey1234");
            res.status(200).json({ token:token });
        } else {
            console.log("Authentication error: Invalid credentials");
            res.status(401).json({ message: 'Invalid credentials' });
        }

    } catch (err) {
        console.error("Login failed due to:", err);
        res.status(500).json({ message: 'Internal server error' });
    }
};
