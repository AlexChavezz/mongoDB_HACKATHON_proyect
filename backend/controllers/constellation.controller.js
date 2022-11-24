const client = require("../database/client")

const collection = client.db('ConstellationsDB').collection('constellations');

const getAllConstellations = async (req, res) => {
    
    try
    {
        const results = await collection.find({}).toArray();
        res.json(results);
    }
    catch(error)
    {
        console.log(error);
    }
}

const getByName = async(req, res) => {
    const { name } = req.params;
    console.log(name)
    try
    {
        const result = await collection.findOne({name:{$eq:name}});
        if(result)
        {
            return res.status(200).json(result);
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
    getByName
}