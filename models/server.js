const express = require('express');
const cors = require('cors');
const { dbConnection } = require('../database/config');

class Server {

    constructor() {

        this.app = express();
        this.port = process.env.PORT;
        this.usersPath = '/api/users';

        //Conectar a la base de datos
        this.connectionDB();

        //Middlewares
        this.middlewares();

        //Rutas
        this.routes();
    }

    async connectionDB(){
        await dbConnection();
    }


    middlewares(){
        
        //CORS
        this.app.use(cors());

        //Lectura y parseo del body
        this.app.use(express.json());

        // static
        this.app.use(express.static('public'));
    }

    routes() {

       this.app.use(this.usersPath, require('../routes/user'));
    }

    listen() {

        this.app.listen(this.port)

    }


}

module.exports = Server;