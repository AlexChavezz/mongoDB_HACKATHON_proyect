const bcryptjs = require("bcryptjs");
const { ObjectId } = require("mongodb");
const client = require('../database/client');
const { generateJWT } = require("../helpers/generateJWT");
const isThereErrors = require("../helpers/isThereErrors");

const usersCollection = client.db('ConstellationsDB').collection('users');

const isUserExist = async (req, res) => {
    const { userName } = req.params;
    // const pipeline = [
    //     { $search: { autocomplete: { query: userName, path: "userName" }}},
    //     { $project: { userName: 1 }}
    // ];
    // const user = await usersCollection.aggregate(pipeline).toArray();
    // let isAllowed;
    // 
    const user = await usersCollection.findOne({userName: {$eq: userName}});
    res.json({userName: userName});
    
    // user.forEach((user) => user.userName === userName? isAllowed = false: isAllowed = true);
    // res.status(200).json({isAllowed});
    
    // if(user.userName)
    //     if (user.length === 0)
//     {
//         return res.status(200).json({isAllowed: true})
//     }
//     if (user[0].userName === userName) {
//         return res.status(200).json({ isAllowed: false });
//     }
//     res.status(200).json({ isAllowed: true });
}

const getUser = async (req, res) => {
    const { userName, password } = req.body;
    if (isThereErrors(req))
    {
        return res.status(400).json({ error: "User name or password are invalid" });
    }
    try
    {
        const user = await usersCollection.findOne({userName:{$eq:userName}});
        if(user && bcryptjs.compareSync(password, user.password))
        {
            const {password:pass , ...rest} = user;
            const token = await generateJWT(user._id);
            return res.status(200).json({...rest, token });
        }
        return res.status(400).json({message: "user name or password is incorrect"});
    } 
    catch(error)
    {
        res.status(500).json({message:"INTERNAL SERVER ERROR"})
        console.log(error);
    }
}

const saveUser = async (req, res) => {
    const { userName, password, captcha } = req.body;
    if(isThereErrors(req))
    {
        return res.status(400).json({ error: "invalid requirements" });
    }
    try
    {

        // -> validate that user name is not exist
        const user = await usersCollection.findOne({userName: {$eq:userName}});
        if( user )
        {
            return res.status(200).json({
                message: "user name is already exist",                
            });
        }

        // -> hash password 
        const salt = bcryptjs.genSaltSync(10);
        const hash = bcryptjs.hashSync(password, salt);

        // -> save user
        const response = await usersCollection.insertOne({ userName, password: hash });
        if(response.acknowledged)
        {
            const token = await generateJWT(response.insertedId);
            return res.status(201).json({userName, _id: response.insertedId, token});
        }
        else
        {
            res.status(200).json({ message: "User not created" });            
        }
    }
    catch(error)
    {
        return res.status(500).json({ message: "INTERNAL SERVER ERROR" });
    }
}

const validateUserByToken = async (req, res) => {
    const uid = req.uid;
    if(uid)
    {
        const user = await usersCollection.findOne({_id: {$eq: ObjectId(uid)}});
        const {password, ...rest} = user;
        const token = await generateJWT(user._id);
        return res.status(200).json( { ...rest, token } );
    }
}

module.exports = {
    isUserExist,
    getUser,
    saveUser,
    validateUserByToken
}