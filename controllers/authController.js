const {request, response} = require('express');
const bcryptjs = require('bcryptjs');

const User = require('../models/user');
const { jwtGenerator } = require('../helpers/jwtGenerator');
const { googleVerify } = require('../helpers/googleVerify');

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

const googleSignin = async (req, res = response) => {

    //recibir el id_token desde el frontend
    const {id_token} = req.body;

    try {

        //recibir los datos de google
        const {email, name, img} = await googleVerify(id_token);
        //console.log(googleUser)

        //buscar si el email está registrado
        let user = await User.findOne({email});
        //console.log(user)

        //crear el usuario si este no existe en la base de datos
        if(!user){

            const data = {
                name,
                email,
                password : 'es indistinto!',
                img,
                google : true
            }

            user = new User(data);
            await user.save()
            
        }

        //validar que el usuario esté activo
        if(!user.state){
            return res.status(400).json({
                ok: false,
                msg : 'Usuario bloqueado, hable con el adminsitrador'
            })
        }

        //Generar el JWT
        const token = await jwtGenerator(user.id);

        //retornar la información
        return res.json({
            ok : true,
            user,
            token
        })
        
    } catch (error) {
        console.log(error)
        return res.status(400).json({
            ok : false,
            msg : ' Token no válido',
            error
        })
    }
    
}


module.exports = {
    login,
    googleSignin
}