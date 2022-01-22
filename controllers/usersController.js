const {response, request} = require('express')

const usersGet = (req = request, res = response) => {

    const {q,nombre,apikey, page = 1, limit} = req.query;

    res.json({
        msg : 'get API - controlador',
        data : {
            q,
            nombre,
            apikey,
            page,
            limit
        }
    })
}

const usersPost = (req, res = response) => {

    const {nombre, edad} = req.body;
    res.json({
        msg : 'post API - controlador',
        data : {
            nombre,
            edad
        }
    })
}

const usersPut = (req, res = response) => {

    const {id} = req.params;

    res.json({
        msg : 'put API - controlador',
        data : {
            id
        }
    })
}

const usersDelete = (req, res = response) => {
    const {id} = req.params;

    res.json({
        msg : 'delete API - controlador',
        data : {
            id
        }
    })
}


module.exports = {
    usersGet,
    usersPost,
    usersPut,
    usersDelete
}