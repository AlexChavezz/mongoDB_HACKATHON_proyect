const { verify } = require("jsonwebtoken");

const validateJWT = (req, res, next) => 
{
    let token = req.header("x-token");
    if(!token)
    {
        return res.status(401).json({message: "No token provided"});
    }
    try
    {
        const { uid } = verify(token, "shhhhh");
        req.uid = uid;
        next();
    }
    catch(error)
    {
        return res.status(401).json({message: "Invalid token"});
    }
}

module.exports = validateJWT;