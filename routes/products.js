const { Router } = require('express');
const { check } = require('express-validator');

const {getAll, getById, createProduct, updateProduct, deleteProduct} = require('../controllers/productsController');
const { productVerifyId, categoryVerifyId } = require('../helpers/db-validators');
const { validateJwt } = require('../middlewares');
const { validateFiels } = require('../middlewares/validateFields');
const { validateRol } = require('../middlewares/validateRol');


const router = Router();

router

    //obtener todas las categorías || púbico
    .get('/',getAll)

    //obtener un producto || público
    .get('/:id',[
        check('id','No es un ID válido').isMongoId(),
        check('id').custom(productVerifyId),
        validateFiels
    ], getById)

    //crear un producto || privado
    .post('/', [
        validateJwt,
        check('name', 'El nombre es obligatorio').notEmpty(),
        check('category', 'No es un ID válido').isMongoId(),
        check('category').custom(categoryVerifyId),
        validateFiels
    ],createProduct)

    //actualizar un registro || privado
    .put('/:id',[
        validateJwt,
        check('id','No es un ID válido').isMongoId(),
        check('id').custom(productVerifyId),
        validateFiels
    ],updateProduct)

    //eliminar un regsitro || privado (solo admin)
    .delete('/:id',[
        validateJwt,
        validateRol,
        check('id', 'No es un ID válido').isMongoId(),
        check('id').custom(productVerifyId),
        validateFiels
    ],deleteProduct)


module.exports = router