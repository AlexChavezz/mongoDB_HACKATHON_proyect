const { verify } = require("jsonwebtoken");

const validateJWT = (req, res, next) => 
{
    // const token = req.header("x-token");
    const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOiI2MzgyNDZlMzBhYWU1NGE2MzlmNGYxMTAiLCJpYXQiOjE2Njk1MjQ3MDAsImV4cCI6MTY2OTUyODMwMH0.zLufFrSPTIZiAXxlYp2EcsWHv7LiY_tbzg7PWdIszUM"
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