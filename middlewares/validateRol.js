const {request, response} = require('express');

const validateRol = (req = request, res = response, next) => {

    if(!req.userAuth){
        
        return res.status(500).json({
            ok : false,
            msg : 'Se quiere validar el rol sin validar el token primero'
        })
    }

    const {name, rol} = req.userAuth;

    if(rol !== 'ADMIN_ROL'){
        
        return res.status(401).json({
            ok : false,
            msg : `${name} no está autorizado para hacer esta acción`
        })
    }

    next()

}

module.exports = {
    validateRol
}