const {request, response} = require('express');



const checkRol = (...roles) => {

    return (req = request, res = response, next) => {

        if(!req.userAuth){
            
            return res.status(500).json({
                ok : false,
                msg : 'Se quiere validar el rol sin validar el token primero'
            })
        }
    
        const {name, rol} = req.userAuth;
    
        if(!roles.includes(req.userAuth.rol)){
            
            return res.status(401).json({
                ok : false,
                msg : `Solo los ${roles} tienen autorización`
            })
        }
    
        next()
    
    }
} 

module.exports = {
    checkRol
}