const express = require("express");
const router = express.Router();
const UserController = require("../controllers/users");

router.post('/user/register', UserController.register);

router.post('/user/login', UserController.login);

router.get('/users/?', UserController.getUsers);

router.get('/user/:id', UserController.getUser);

module.exports = router;