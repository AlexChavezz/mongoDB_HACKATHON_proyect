const client = require('../database/client');

const usersCollection = client.db('ConstellationsDB').collection('users');

const isUserExist = async (req, res) => {
    const { userName } = req.params;
    console.log(userName)
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

module.exports = {
    isUserExist
}