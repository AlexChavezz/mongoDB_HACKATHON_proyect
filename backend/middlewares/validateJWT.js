const { verify } = require("jsonwebtoken");

const validateJWT = (req, res, next) => 
{
    let token = req.header("x-token");
    // token = JSON.parse(token)
    // token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOiI2MzgyNDZlMzBhYWU1NGE2MzlmNGYxMTAiLCJpYXQiOjE2Njk1MjgwMzQsImV4cCI6MTY2OTUzMTYzNH0.Wbc334z8-1rG9-4YItpY7Uk3nsnwABCkepD-Xe5hCvM"
    console.log(token)
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