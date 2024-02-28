const jwt = require('jsonwebtoken')

const jwtMiddleware = (req,res,next)=>{
    console.log('sdfghj,')
    console.log(req.headers['authorization'])
    console.log("Verifying Token: jwtMiddleware...",req.headers['authorization']);
    const token = req.headers['authorization'].split(' ')[1]
    console.log('Token:', token);

    try{
        const jwtResponse = jwt.verify(token,"aetherloomkey1234");
        console.log("jwt response", jwtResponse);
        req.payload = jwtResponse.userID;
        next()
    }
    catch(err){
        console.log(err)
       res.status(401).json("Auothorization Failed, Please Login")
    }

}

module.exports = jwtMiddleware;