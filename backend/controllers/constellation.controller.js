const client = require("../database/client")

const collectionConstellations = client.db('ConstellationsDB').collection('constellations');
const commentsConstellations = client.db('ConstellationsDB').collection('comments');
const getAllConstellations = async (req, res) => {
    try
    {
        const results = await collectionConstellations.find({}).toArray();
        res.json(results);
    }
    catch(error)
    {
        console.log(error);
    }
}

const autoComplete = async (req, res) => {
    const { name } = req.params;
    try
    {
        const result = await collectionConstellations.aggregate([
            {$search: {autocomplete: {query: name, path: "name"}}},
            {$limit:10},
            {$project: {name:1, _id:1}}
        ]).toArray();
        res.json(result);
    }
    catch(error)
    {
        console.log(error)
    }
}

const getByName = async(req, res) => {
    const { name } = req.params;
    try
    {
        const result = await collectionConstellations.findOne({name:{$eq:name}});
        if(result)
        {
            const comments = await commentsConstellations.find({constellation_id:{$eq:result._id}}).toArray();
            return res.status(200).json({...result, comments: comments});
        }
        res.status(200).json({message: "No constellation found with that name."});
    }
    catch(error)
    {
        res.status(500).json({ message: 'INTERNAL SERVER ERROR' });
        console.log(error);
    }
}


module.exports = {
    getAllConstellations,
    getByName,
    autoComplete
}