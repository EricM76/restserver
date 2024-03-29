const {Schema, model} = require('mongoose');

const CategorySchema = Schema({

    name : {
        type: String,
        required : [true, 'El nombre es obligatorio']
    },
    state : {
        type : Boolean,
        default : true,
        required : true
    },
    user : {
        type : Schema.Types.ObjectId,
        ref : 'User',
        required : true
    }
});

CategorySchema.methods.toJSON = function(){
    const {__v, state, _id, ...category} = this.toObject();
    category.uid = _id;
    return category
}

module.exports = model('Category', CategorySchema)