const express = require('express');
const dbConnection = require('../database/dbConnection');
const cors = require('cors');

var corsOptions = {
    origin: 'http://127.0.0.1:5173/',
    optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
  }

class Server {
    constructor()
    {
        this.app = express();
        this.port = process.env['PORT'] || 3000;
        this.mainPath = '/api';

        this.mongoConnect();
        this.routes();
        this.middlewares();
    }
    middlewares()
    {
        this.app.use(cors(corsOptions));
        this.app.use(express.json());
    }
    routes()
    {
        this.app.use(this.mainPath, require('../routes/constellations.route.js'));
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