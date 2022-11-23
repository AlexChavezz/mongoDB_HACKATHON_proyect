const express = require('express');

class Server {
    constructor()
    {
        this.app = express();
        this.port = process.env['PORT'] || 3000;
    }

    listen()
    {
        this.app.listen(this.port, () => {
            console.log(`application listen on port ${this.port}`)
        })
    }
}


module.exports = Server;