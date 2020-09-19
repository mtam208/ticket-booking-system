var express = require('express');
var router = express.Router();

/* GET user info and booking history. */
router.get('/:id', userController.userInfo);

/* POST user login */
router.post('/login', userController.userLogin);

/* POST user register */
router.post('/register', userController.userRegister);

/* POST user logout */
router.post('/logout', userController.userLogout);

/* PATCH user change password */
router.patch('/change-pwd', userController.userChangePwd);

module.exports = router;
