const {Router} = require('express');
const { usersGet, usersPut, usersPost, usersDelete } = require('../controllers/usersController');
const router = Router();

router
    .get('/', usersGet)
    .post('/', usersPost)
    .put('/:id', usersPut)
    .delete('/:id',usersDelete)

module.exports = router;