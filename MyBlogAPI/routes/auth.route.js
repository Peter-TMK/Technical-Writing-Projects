const express = require('express');
const AuthRouter = express.Router();

const AuthController = require("../controllers/auth.controller")

// Register
AuthRouter.post("/register", AuthController.signup);

// Login
AuthRouter.post("/login", AuthController.login);


module.exports = AuthRouter
