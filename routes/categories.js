const { Router } = require('express');
const { check } = require('express-validator');

const {getAll, getById, createCategory, updateCategory, deleteCategory} = require('../controllers/categoriesController');
const { categoryVerifyId } = require('../helpers/db-validators');
const { validateJwt } = require('../middlewares');
const { validateFiels } = require('../middlewares/validateFields');
const { validateRol } = require('../middlewares/validateRol');


const router = Router();

router

    //obtener todas las categorías || púbico
    .get('/',getAll)

    //obtener una categoria || público
    .get('/:id',[
        check('id','No es un ID válido').isMongoId(),
        check('id').custom(categoryVerifyId),
        validateFiels
    ], getById)

    //crear un categoría || privado
    .post('/', [
        validateJwt,
        check('name', 'El nombre es obligatorio').notEmpty(),
        validateFiels
    ],createCategory)

    //actualizar un registro || privado
    .put('/:id',[
        validateJwt,
        check('name','El nombre es requerido').notEmpty(),
        check('id','No es un ID válido').isMongoId(),
        check('id').custom(categoryVerifyId),
        validateFiels
    ],updateCategory)

    //eliminar un regsitro || privado (solo admin)
    .delete('/:id',[
        validateJwt,
        validateRol,
        check('id', 'No es un ID válido').isMongoId(),
        check('id').custom(categoryVerifyId),
        validateFiels
    ],deleteCategory)


module.exports = router