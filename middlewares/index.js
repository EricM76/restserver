const validateFiels = require('../middlewares/validateFields');
const validateJwt = require('../middlewares/validateJwt');
const checkRol = require('../middlewares/checkRol');

module.exports = {
    ...validateFiels,
    ...validateJwt,
    ...checkRol
}
