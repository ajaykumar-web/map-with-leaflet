const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");
const authenticateToken = require("../middleware/authenticateToken");

/**
 * Route to register a new user.
 */
router.post("/register", authController.register);

/**
 * Route to log in an existing user.
 */
router.post("/login", authController.login);

/**
 * Route to access some private data, requiring authentication.
 */
router.get("/getsomedata", authenticateToken, authController.someData);

module.exports = router;
