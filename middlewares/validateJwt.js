const { request, response } = require('express');
const jwt = require('jsonwebtoken');
const User = require('../models/user');

const validateJwt = async (req = request, res = response, next) => {

    const token = req.header('x-token');
    
    if(!token){
        return res.status(401).json({
            ok : false,
            msg : 'No hay token en la petición'
        })
    }
    try {

        const {uid} = jwt.verify(token,process.env.SECRETORPRIVATEKEY);

        const userAuth = await User.findById(uid);

        //verificar si el usuario no existe
        if(!userAuth){
            return res.status(401).json({
                ok : false,
                msg : 'Token no válido | usuario no existe'
            })
        }

        //verificar si el usuario ha sido eliminado
        if(!userAuth.state){
            return res.status(401).json({
                ok : false,
                msg : 'Token no válido | status:false'
            })
        }

        req.userAuth = userAuth;
        next()
        
    } catch (error) {
        console.log(error)
        return res.status(401).json({
            ok : false,
            msg : 'Token no válido'
        })
    }


}



module.exports = {
    validateJwt
}