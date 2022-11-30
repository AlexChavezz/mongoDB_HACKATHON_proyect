const client = require("../database/client");
const { ObjectId } = require('mongodb')
const commentsCollection = client.db('ConstellationsDB').collection('comments');

const saveComment = async (req, res) => {
    try {
        const { comment, user, user_id, constellation_id } = req.body;
        const response = await commentsCollection.insertOne({
            comment,
            user,
            user_id: ObjectId(user_id),
            constellation_id: ObjectId(constellation_id)
        });
        if(response.insertedId)
        {
            return res.status(201).json({
                message: 'Comment published successfully',
                insertedId: response.insertedId
            })    
        }
        res.status(400).json({message:"Bad request"})
    }
    catch (error) {
        console.log(error);
    }
}


module.exports = {
    saveComment
}