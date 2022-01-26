const { request, response } = require('express');
const { Category } = require('../models');

const User = require('../models/user');

const getAll = async (req = request, res = response) => {

    //IMPLEMENTAR paginado
    const { limit = 5, from = 0 } = req.query;

    //MOSTRAR solo las categorías activas
    const query = { state: true };

    try {

        const [categories, total] = await Promise.all(
            [
                Category.find(query)
                    .skip(+from)
                    .limit(+limit)
                    .populate('user', 'name'),
                Category.countDocuments(query)
            ]
        )
        return res.json({
            ok: true,
            total,
            data: categories
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

        const category = await Category.findById(id).populate('user', 'name')

        return res.json({
            ok: true,
            data: category
        })

    } catch (error) {

        console.log(error);
        return res.status(error.statusCode || 500).json({
            ok: false,
            msg: error.message ? error.message : "Comuníquese con el administrador"
        })
    }

}

const createCategory = async (req = request, res = response) => {

    const name = req.body.name.toUpperCase();

    try {
        //VERIFICAR si la categoría existe en la base de datos
        const categoryDB = await Category.findOne({ name });
        if (categoryDB) {

            return res.status(400).json({
                ok: false,
                msg: `La categoría ${categoryDB.name}, ya existe`
            })
        }

        //GENERAR la data a guardar

        const data = {
            name,
            user: req.userAuth._id //reqcupero la información del middleware 'validateJwt'
        }
        const category = new Category(data);

        //GUARDAR en la base de datos
        await category.save();

        return res.status(201).json({
            data: category
        })
    } catch (error) {
        console.log(error);
        return res.status(error.statusCode || 500).json({
            ok: false,
            msg: error.message ? error.message : "Comuníquese con el administrador"
        })
    }

}


const updateCategory = async (req = request, res = response) => {

    const { id } = req.params;
    const name = req.body.name.toUpperCase();

    try {

        //VERIFICAR si la categoría ya está registrada
        const categoryDB = await Category.findOne({ name });
        if (categoryDB) {

            return res.status(400).json({
                ok: false,
                msg: `La categoría ${categoryDB.name}, ya existe`
            })
        }

        //ACTUALIZAR la informacioń en la base de datos
        const category = await Category.findByIdAndUpdate(id,
            {
                name,
                user: req.userAuth._id
            },
            {
                new: true
            }
        )

        //ENVIAR la respuesta
        return res.status(201).json({
            data: category
        })

    } catch (error) {
        return res.status(error.statusCode || 500).json({
            ok: false,
            msg: error.message ? error.message : "Comuníquese con el administrador"
        })
    }

}

const deleteCategory = async (req = request, res = response) => {

    const { id } = req.params;

    try {
        const category = await Category.findByIdAndUpdate(id, { state: false }, { new: true })

        return res.json({
            msg: 'La categoría ha sido eliminada correctamente',
            data: category
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
    createCategory,
    updateCategory,
    deleteCategory
}