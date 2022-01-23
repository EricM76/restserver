const {request, response} = require('express');
const bcryptjs = require('bcryptjs');

const User = require('../models/user');
const { jwtGenerator } = require('../helpers/jwtGenerator');

const login =  async (req = request,res = response) => {

    const {email, password} = req.body;

    try {

        //verificar si el email existe
        const user = await User.findOne({email});
        if(!user){
            return res.status(400).json({
                ok : false,
                msg : 'Credenciales inválidas | correo'
            })
        }

        //verificar si el usuario está activo
        if(!user.state){
            return res.status(400).json({
                ok : false,
                msg : 'Credenciales inválidas | status: false'
            })
        }

        //verificar la contraseña
        const checkPassword = bcryptjs.compareSync(password, user.password);

        if(!checkPassword){
            return res.status(400).json({
                ok : false,
                msg : 'Credenciales inválidas | password'
            })
        }

        //genera el JWT
        const token = await jwtGenerator(user.id);

        return res.json({
            ok : true,
            token,
            data : user
        })
        
    } catch (error) {

        console.log(error)
        return res.status(error.statusCode || 500).json({
            ok : false,
            msg: error.message ? error.message : 'Comuníquese con el administrador'
        })
    }
 
   
}


module.exports = {
    login
}