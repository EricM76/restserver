const { request, response } = require('express');
const { isValidObjectId } = require('mongoose');

const {User, Product, Category} = require('../models');

const allowedCollections = [
    'products',
    'users',
    'categories',
    'rols'
]


const search = (req = request, res = response) => {

    const { collection, keyword } = req.params;

    if (!allowedCollections.includes(collection)) {
        return res.status(400).json({
            ok: false,
            msg: `Las colecciones permitidas son ${allowedCollections}`
        })
    }

    const searchProducts = async (keyword = "", res = response) => {

        const isMongoID = isValidObjectId(keyword); //verifica si es un id válido de mongoDB
    
        if(isMongoID){
    
            const product = await Product.findById(keyword);
    
            return res.json({
                results : product ? [product] : [] //si no hay resultados se envía un array vacío
            })
        }else{
    
            //TRANSFORMAR en insensible la palabra clave (soporta mayúsculas y minúsculas)
            const regEx = new RegExp(keyword, 'i');
    
            //BUSCAR por nombre o por email
            const products = await Product.find({
                $or : [
                    {name : regEx},
                    {description : regEx}
                ],
                $and : [{state : true}]
            }).populate('category','name')
    
            const total = await Product.count({
                $or : [
                    {name : regEx},
                    {description : regEx}
                ],
                $and : [{state : true}]
            })
            
            return res.json({
                total,
                results : products
            })
        }
    }

    const searchUsers = async (keyword = "", res = response) => {

        const isMongoID = isValidObjectId(keyword); //verifica si es un id válido de mongoDB

        if(isMongoID){

            const user = await User.findById(keyword);

            return res.json({
                results : user ? [user] : [] //si no hay resultados se envía un array vacío
            })
        }else{

            //TRANSFORMAR en insensible la palabra clave (soporta mayúsculas y minúsculas)
            const regEx = new RegExp(keyword, 'i');

            //BUSCAR por nombre o por email
            const users = await User.find({
                $or : [
                    {name : regEx},
                    {email : regEx}
                ],
                $and : [{state : true}]
            })

            const total = await User.count({
                $or : [
                    {name : regEx},
                    {email : regEx}
                ],
                $and : [{state : true}]
            })
            
            return res.json({
                total,
                results : users
            })
        }
    }

    const searchCategories = async (keyword = "", res = response) => {

        const isMongoID = isValidObjectId(keyword); //verifica si es un id válido de mongoDB

        if(isMongoID){

            const category = await Category.findById(keyword);

            return res.json({
                results : category ? [category] : [] //si no hay resultados se envía un array vacío
            })
        }else{

            //TRANSFORMAR en insensible la palabra clave (soporta mayúsculas y minúsculas)
            const regEx = new RegExp(keyword, 'i');

            //BUSCAR por nombre o por email
            const categories = await Category.find({
                name : regEx,
                $and : [{state : true}]
            })

            const total = await Category.count({
                name : regEx,
                $and : [{state : true}]
            })
            
            return res.json({
                total,
                results : categories
            })
        }
    }

    switch (collection) {
        case 'products':
            searchProducts(keyword, res)
            break;
        case 'users':
            searchUsers(keyword, res)
            break;
        case 'categories':
            searchCategories(keyword, res)
            break;
        default:
            return res.status(500).json({
                ok: false,
                msg: 'Falta procesar la categoría ' + collection
            })
    }

}


module.exports = {
    search
}