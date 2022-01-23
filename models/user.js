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
        required : [true, 'El rol es obligatorio']
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
    const {__v, password, ...user} = this.toObject(); //oculta datos sensibles
    return user
}

module.exports = model('User',UserSchema);