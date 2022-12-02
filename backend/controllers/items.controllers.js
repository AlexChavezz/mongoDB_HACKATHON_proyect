const client = require("../database/client")

const itemsCollection = client.db('ConstellationsDB').collection('Items');
const commentsConstellations = client.db('ConstellationsDB').collection('comments');
// const getAllConstellations = async (req, res) => {
//     try
//     {
//         const results = await itemsCollection.find({}).toArray();
//         res.json(results);
//     }
//     catch(error)
//     {
//         console.log(error);
//     }
// }

const autoComplete = async (req, res) => {
    const { name } = req.params;
    try
    {
        const result = await itemsCollection.aggregate([
            {$search: {autocomplete: {query: name, path: "name"}}},
            {$limit:10},
            {$project: { name:1 }}
        ]).toArray();
        res.status(200).json(result);
    }
    catch(error)
    {
        res.status(500).json({ message: 'INTERNAL SERVER ERROR' });
    }
}

const getByName = async(req, res) => {
    const { name } = req.params;
    try
    {
        const itemResult = await itemsCollection.findOne({ name });
        // -> If the item is not found, return a 400 code
        if(!itemResult)
        {
            return res.status(400).json({message: "No item found with that name."});
        }
        const comments = await commentsConstellations.find({item_id:{$eq:itemResult._id}}).toArray();
        return res.status(200).json({...itemResult, comments});
    }
    catch(error)
    {
        res.status(500).json({ message: 'INTERNAL SERVER ERROR' });
    }
}


module.exports = {
    // getAllConstellations,
    getByName,
    autoComplete
}