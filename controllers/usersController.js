const { response, request } = require('express');
const bcryptjs = require('bcryptjs');

const User = require('../models/user');
const user = require('../models/user');

const usersGet = async (req = request, res = response) => {

    const { limit = 5, from = 0 } = req.query;
    const query = { state: true }; //solo mostrará los usuarios cuyo estado sea true

    const [users, total] = await Promise.all([//Promise.all corre las promesas en simultáneo
        User.find(query)
            .skip(+from)
            .limit(+limit), //parseo el limit de string a number,
        User.countDocuments(query)
    ]); 

    return res.json({
        ok: true,
        total,
        data: users
    })
}

const usersPost = async (req, res = response) => {

    const { name, email, password, rol } = req.body;
    const user = new User({
        name,
        email,
        password,
        rol
    });

    //verificar si el correo existe | fue movido a las validacioens custom
    /*  const emailExists = await User.findOne({ email });
 
     if (emailExists) {
         return res.status(400).json({
             ok: false,
             msg: 'El correo ya está registrado'
         })
     } */

    // encriptar la contraseña
    const salt = bcryptjs.genSaltSync(12);
    user.password = bcryptjs.hashSync(password, salt);

    //guardar en la base datos
    await user.save({ validateBeforeSave: false }); //incluí esta configuración para utilizar la validacion del modelo

    return res.json({
        ok: true,
        data: user
    });
}

const usersPut = async (req, res = response) => {

    const { id } = req.params;
    const { _id, password, google, ...rest } = req.body; //destructuración y spreed operator para despejar los datos a utilizar y excluír otros

    //validar contra base de datos
    if (password) {
        const salt = bcryptjs.genSaltSync(12);
        rest.password = bcryptjs.hashSync(password, salt);
    }

    const user = await User.findByIdAndUpdate(id, rest, { new: true }); //establezco la opción new en true para recuperar la información luego de ser actualizada

    return res.json({
        ok: true,
        data: user
    })
}

const usersDelete = async (req, res = response) => {
    
    const { id } = req.params;

    //eliminación física
    /* const user = await User.findByIdAndDelete(id); */

    //eliminación ocultando el usuario
    const user = await User.findByIdAndUpdate(id,{state : false},{new:true});

    return res.json({
        data: user
    })
}


module.exports = {
    usersGet,
    usersPost,
    usersPut,
    usersDelete
}