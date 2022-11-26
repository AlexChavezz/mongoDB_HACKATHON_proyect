const bcryptjs = require("bcryptjs");
const { json } = require("express");
const { GridFSBucket } = require("mongodb");
const client = require('../database/client');

const usersCollection = client.db('ConstellationsDB').collection('users');

const isUserExist = async (req, res) => {
    const { userName } = req.params;
    const pipeline = [
        { $search: { autocomplete: { query: userName, path: "userName" } } },
        { $limit: 1 },
    ];
    const user = await usersCollection.aggregate(pipeline).toArray();
    if (user.length === 0)
    {
        return res.status(200).json({isAllowed: true})
    }
    if (user[0].userName === userName) {
        return res.status(200).json({ isAllowed: false });
    }
    res.status(200).json({ isAllowed: true });
}

const getUser = async (req, res) => {
    const { userName, password } = req.body;
    try
    {
        const user = await usersCollection.findOne({userName:{$eq:userName}});
            if(user && bcryptjs.compareSync(password, user.password))
            {
                return res.status(200).json(user);
            }
            return res.status(200).json({message: "user name or password is incorrect"});
    } 
    catch(error)
    {
        res.status(500).json({message:"INTERNAL SERVER ERROR"})
        console.log(error);
    }
}

const saveUser = async (req, res) => {
    const { userName, password, captcha } = req.body;
    console.log(userName)
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
        const { acknowledged } = await usersCollection.insertOne({ userName, password: hash });
        if(acknowledged)
        {
            return res.status(201).json({ message: "User created successfully" });
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

module.exports = {
    isUserExist,
    getUser,
    saveUser
}