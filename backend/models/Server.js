const express = require('express');
const dbConnection = require('../database/dbConnection');
const cors = require('cors');

const corsOptions = {
    origin: 'https://delightful-smoke-038cf9010.2.azurestaticapps.net/',
    optionsSuccessStatus: 200
}

class Server {
    constructor()
    {
        this.app = express();
        this.port = process.env['PORT'] || 3000;
        this.mainPath = '/api';  
        this.middlewares();
        this.mongoConnect();
        this.routes();
    }
    middlewares()
    {
        this.app.use(express.json());
        this.app.use(cors(corsOptions));
        this.app.use(express.static('public'));
    }
    routes()
    {
        this.app.use(`${this.mainPath}/comments`, require('../routes/comments.routes'));
        this.app.use(`${this.mainPath}/items`, require('../routes/items.routes.js'));
        this.app.use(`${this.mainPath}/users`, require('../routes/users.routes.js'));
    }
    async mongoConnect()
    {
        await dbConnection();
    }
    listen()
    {
        this.app.listen(this.port, () => {
            console.log(`application listen on port ${this.port}`)
        })
    }
}


module.exports = Server;