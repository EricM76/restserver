const { Router } = require('express');
const { check } = require('express-validator');
const { login, googleSignin } = require('../controllers/authController');
const { validateFiels } = require('../middlewares/validateFields');


const router = Router();

router
    .post('/login',[
        check('email','El email es obligatorio').isEmail(),
        check('password', 'La contraseña es obligatoria').notEmpty(),
        validateFiels
    ],login)

    .post('/google',[
        check('id_token','El id_token es obligatorio').notEmpty(),
        validateFiels
    ],googleSignin)


module.exports = router