const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const knex = require("../knex"); 
const { authenticateToken } = require('../middleware/authMiddleware');



const registerUser = async (req, res) => {
  const { username, email, password } = req.body;

  if (!username || !email || !password) {
    return res.status(400).json({ error: "Please provide username, email, and password" });
  }

  try {
    const existingUser = await knex('users').where({ email }).first();
    if (existingUser) {
      return res.status(400).json({ error: "Email already in use" });
    }

    const hashedPassword = await bcrypt.hash(password, 10); // Example uses bcrypt for password hashing

    const [newUserId] = await knex('users').insert({
      username,
      email,
      password: hashedPassword
    });

    
    const newUser = await knex('users').select('id', 'username', 'email').where({ id: newUserId }).first();

    res.status(201).json({
      message: "User successfully registered",
      user: newUser
    });
  } catch (error) {
    console.error(`Registration error: ${error.message}`);
    res.status(500).json({
      message: `Server error during user registration: ${error.message}`
    });
  }
};

const loginUser = async (req, res) => {
  const { email, password } = req.body;
  console.log("Login attempt:", email);

  if (!email || !password) {
    console.log("Missing credentials");
    return res
      .status(400)
      .json({ message: "Please provide both email and password." });
  }

  try {
    console.log("Searching for user:", email);
    const user = await knex("users").where({ email }).first();

    if (!user) {
      console.log("User not found:", email);
      return res.status(400).json({ message: "User does not exist." });
    }

    console.log("User found, comparing password...");
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      console.log("Invalid password for:", email);
      return res.status(400).json({ message: "Invalid credentials." });
    }

    console.log("Password match, generating token...");
    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    console.log("Login successful for:", email);
    res.json({
      message: "User logged in successfully.",
      token,
      user: {
        id: user.id,
        username: user.username,
        email: user.email,
      },
    });
  } catch (error) {
    console.error("Login error for:", email, error);
    res.status(500).json({ message: "Server error during login.", error: error.toString() });
  }
};

const getAllUsers = async (req, res) => {
  try {
    const users = await knex.select("*").from("users");
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const getUserById = async (req, res) => {
  try {
    const user = await knex("users").where("id", req.params.id).first();
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.json(user);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const createUser = async (req, res) => {
  const { username, email, password } = req.body;

  if (!username || !email || !password) {
    return res
      .status(400)
      .json({ message: "Please provide username, email, and password" });
  }

  const userExists = await knex("users").where({ email }).first();
  if (userExists) {
    return res.status(400).json({ message: "User already exists" });
  }
  // Hash password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);
  // Save user
  try {
    const [newUserId] = await knex("users").insert({
      username,
      email,
      password: hashedPassword,
    });

    const newUser = await knex("users").where("id", newUserId).first();
    delete newUser.password;
    res.status(201).json(newUser);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updateUser = async (req, res) => {
  const { id } = req.params;
  try {
    const updated = await knex("users").where("id", id).update(req.body);
    if (!updated) return res.status(404).json({ message: "User not found" });
    const updatedUser = await knex("users").where("id", id).first();
    res.json(updatedUser);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const deleteUser = async (req, res) => {
  const { id } = req.params;
  try {
    const deleted = await knex("users").where("id", id).del();
    if (!deleted) return res.status(404).json({ message: "User not found" });
    res.json({ message: "User deleted successfully" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

module.exports = {
  registerUser,
  loginUser,
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
};
