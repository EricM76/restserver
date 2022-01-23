const { validationResult } = require('express-validator');

const validateFiels = (req,res, next) => {

    //validaciones
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({
            ok: false,
            errors: errors.mapped()
        })
    }

    next()
}

module.exports = {
    validateFiels
}