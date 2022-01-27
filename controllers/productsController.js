const { request, response } = require('express');
const { Product } = require('../models');


const getAll = async (req = request, res = response) => {

    //IMPLEMENTAR paginado
    const { limit = 5, from = 0 } = req.query;

    //MOSTRAR solo las categorías activas
    const query = { state: true };

    try {

        const [products, total] = await Promise.all(
            [
                Product.find(query)
                    .skip(+from)
                    .limit(+limit)
                    .populate('user', 'name')
                    .populate('category','name'),
                Product.countDocuments(query)
            ]
        )
        return res.json({
            ok: true,
            total,
            data: products
        })
    } catch (error) {
        console.log(error);
        return res.status(error.statusCode || 500).json({
            ok: false,
            msg: error.message ? error.message : "Comuníquese con el administrador"
        })
    }
}

const getById = async (req = request, res = response) => {

    const { id } = req.params;

    try {

        const product = await Product.findById(id).populate('user', 'name').populate('category','name')

        return res.json({
            ok: true,
            data: product
        })

    } catch (error) {

        console.log(error);
        return res.status(error.statusCode || 500).json({
            ok: false,
            msg: error.message ? error.message : "Comuníquese con el administrador"
        })
    }

}

const createProduct = async (req = request, res = response) => {

    const {state, user, ...data} = req.body;

    try {
        //VERIFICAR si el producto existe en la base de datos
        const productDB = await Product.findOne({name: data.name});
        if (productDB) {

            return res.status(400).json({
                ok: false,
                msg: `El producto ${productDB.name}, ya existe`
            })
        }

        //GENERAR la data a guardar

        const product = new Product({
            ...data,
            name : data.name.toUpperCase(),
            user: req.userAuth._id, //recupero la información del middleware 'validateJwt'
        });

        //GUARDAR en la base de datos
        await product.save();

        return res.status(201).json({
            data: product
        })
    } catch (error) {
        console.log(error);
        return res.status(error.statusCode || 500).json({
            ok: false,
            msg: error.message ? error.message : "Comuníquese con el administrador"
        })
    }

}


const updateProduct = async (req = request, res = response) => {

    const { id } = req.params;
    const {state, user, ...data} = req.body;

    try {

        if(data.name){
            data.name = data.name.toUpperCase();
        }
        data.user = req.userAuth._id
      
        //ACTUALIZAR la informacioń en la base de datos
        const product = await Product.findByIdAndUpdate(id, data,{ new: true})

        //ENVIAR la respuesta
        return res.status(201).json({
            data: product
        })

    } catch (error) {
        return res.status(error.statusCode || 500).json({
            ok: false,
            msg: error.message ? error.message : "Comuníquese con el administrador"
        })
    }

}

const deleteProduct = async (req = request, res = response) => {

    const { id } = req.params;

    try {
        const product = await Product.findByIdAndUpdate(id, { state: false }, { new: true })

        return res.json({
            msg: 'El producto ha sido eliminado correctamente',
            data: product
        })

    } catch (error) {
        return res.status(error.statusCode || 500).json({
            ok: false,
            msg: error.message ? error.message : "Comuníquese con el administrador"
        })
    }
}

module.exports = {
    getAll,
    getById,
    createProduct,
    updateProduct,
    deleteProduct
}