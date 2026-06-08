const {Router} = require('express');
const authController = require('../controller/auth.controller');
const authMiddleware = require('../middleware/auth.middleware');
const authRouter = Router();


/**
 * @route POST /api/auth/register
 * @description Register a new user
 * @access Public
 */

authRouter.post('/register', authController.registerUser);

/**
 * @route POST /api/auth/login
 * @description Login a user, expects username and password in the request body
 * @access Public
 */

authRouter.post('/login', authController.loginUser);

/**
 * @route POST /api/auth/logout
 * @description Logout a user, expects a valid JWT token in the request cookies
 * @access Public
 */

authRouter.post('/logout', authController.logoutUser);

/**
 * @route GET /api/auth/get-me
 * @description gets the details of current user
 * @access Private
 */

authRouter.get('/get-me', authMiddleware, authController.getme);




module.exports = authRouter;