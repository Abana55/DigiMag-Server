const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const { authenticateToken } = require("./middleware/authenticateToken"); // Ensure path is correct

// Public routes
router.post("/register", userController.registerUser);
router.post("/login", userController.loginUser);

// Protected route examples
router.get("/", authenticateToken, userController.getAllUsers); // Making getAllUsers a protected route
router.get("/:id", authenticateToken, userController.getUserById); // Making getUserById a protected route

// Other user-related routes that require authentication
router.put("/:id", authenticateToken, userController.updateUser);
router.delete("/:id", authenticateToken, userController.deleteUser);

module.exports = router;