const {Schema, model} =require('mongoose');

const UserSchema = Schema({

    name : {
        type : String,
        required : [true, 'El nombre es obligatorio'], //Si es requerido, se puede enviar una msg de validación
    },
    email : {
        type : String,
        required : [true, 'El correo es obligatorio'],
        unique : true
    },
    password : {
        type : String,
        required : [true, 'La contraseña es obligatoria'],
    },
    img : {
        type : String,
    },
    rol : {
        type : String,
        required : [true, 'El rol es obligatorio'],
        default : 'USER_ROL'
    },
    state : {
        type : Boolean,
        default : true
    },
    google : {
        type : Boolean,
        default : false
    }
});

UserSchema.methods.toJSON = function(){
    const {__v, password, _id, ...user} = this.toObject(); //oculta datos sensibles
    user.uid = _id; //creo una nueva propiedad solo para visualizar el id
    return user
}


module.exports = model('User',UserSchema);