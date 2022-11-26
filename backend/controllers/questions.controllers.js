const client = require("../database/client");

const questionsCollection = client.db('ConstellationsDB').collection('QUESTIONS');

const getQuestion = async (req, res) => {
    try
    {
        const questions = await questionsCollection.find({}).toArray();
        const index = Math.floor(Math.random() * questions.length);
        res.status(200).json(questions[index]);
    }
    catch(error)
    {
        console.log(error)
    }
}


module.exports = {
    getQuestion
}