const express = require('express');
const cors = require('cors');
const { dbConnection } = require('../database/config');

class Server {

    constructor() {

        this.app = express();
        this.port = process.env.PORT;

        this.usersPath = '/api/users';
        this.authPath = '/api/auth';
        this.categoriesPath = '/api/categories';
        this.productsPath = '/api/products';
        this.searchPath = '/api/search'

        //Conectar a la base de datos
        this.connectionDB();

        //Middlewares
        this.middlewares();

        //Rutas
        this.routes();
    }

    async connectionDB() {
        await dbConnection();
    }


    middlewares() {

        //CORS
        this.app.use(cors());

        //Lectura y parseo del body
        this.app.use(express.json());

        // static
        this.app.use(express.static('public'));
    }

    routes() {

        this.app.use(this.authPath, require('../routes/auth'));
        this.app.use(this.usersPath, require('../routes/user'));
        this.app.use(this.categoriesPath, require('../routes/categories'));
        this.app.use(this.productsPath, require('../routes/products'));
        this.app.use(this.searchPath, require('../routes/search'))
    }

    listen() {

        this.app.listen(this.port)

    }


}

module.exports = Server;