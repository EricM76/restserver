const Rol = require('../models/rol');
const User = require('../models/user');

const isRolValid = async (rol = '') => {
    
    if(rol){
        const rolExists = await Rol.findOne({ rol });
        if (!rolExists) {
            throw new Error(`El rol ${rol} no está registrado en la base de datos`);
        }
    }
   
}

const emailVerify = async (email = '') => {
    
    const emailExists = await User.findOne({ email });
    if (emailExists) {
        throw new Error(`El email ${email} ya está registrado en el sistema`);
    }
}

const userVerifyId = async (id) => {
    
    const userExists = await User.findById(id);
    if(!userExists){
        throw new Error(`El ${id} no existe en la base de datos`);
    }
}


module.exports = {
    isRolValid,
    emailVerify,
    userVerifyId
}