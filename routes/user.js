const { Router } = require('express');
const { check } = require('express-validator');

const { usersGet, usersPut, usersPost, usersDelete } = require('../controllers/usersController');
const { isRolValid, emailVerify, userVerifyId } = require('../helpers/db-validators');

/* const { validateFiels } = require('../middlewares/validateFields');
const { validateJwt } = require('../middlewares/validateJwt');
const { checkRol } = require('../middlewares/checkRol');
 */
const {validateFiels, validateJwt,checkRol} =require('../middlewares')

const router = Router();

router
    .get('/', usersGet)

    .post('/', [
        check('name', 'El nombre es obligatorio').notEmpty(),
        check('password', 'El password debe ser más de 6 caracteres').isLength({ min: 6 }),
        check('email', 'El email no es vádlido').isEmail(),
        check('email').custom(emailVerify),
        check('rol', 'El rol es requerido').notEmpty(),
        check('rol').custom(isRolValid), //es lo mismo que : .custom((rol) => isRolvalid(rol))
        validateFiels //revisa los errores de la validación
    ], usersPost)

    .put('/:id', [
        check('id', 'No es un ID válido').isMongoId(),
        check('id').custom(userVerifyId),
        check('rol').custom(isRolValid),
        validateFiels
    ], usersPut)

    .delete('/:id',[
        validateJwt,
        checkRol('ADMIN_ROL','VENTAS_ROL'),
        check('id', 'No es un ID válido').isMongoId(),
        check('id').custom(userVerifyId),
        validateFiels
    ], usersDelete)

module.exports = router;