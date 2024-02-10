const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const knex = require("../knex"); 
const { authenticateToken } = require('../middleware/authMiddleware');



const registerUser = async (req, res) => {
  const { username, email, password } = req.body;

  if (!username || !email || !password) {
    return res
      .status(400)
      .json({ message: "Please provide all required fields." });
  }

  try {

    const userExists = await knex("users").where({ email }).first();
    if (userExists) {
      return res
        .status(400)
        .json({ message: "User already exists with this email." });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const [newUserId] = await knex("users").insert(
      {
        username,
        email,
        password: hashedPassword,
      },
      "id"
    ); 
    const token = jwt.sign({ id: newUserId }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });
    res.status(201).json({
      message: "User registered successfully.",
      token,
      user: {
        id: newUserId,
        username,
        email,
      },
    });
  } catch (error) {
    console.error("Registration error:", error);
    res.status(500).json({ message: "Server error during registration." });
  }
};

const loginUser = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res
      .status(400)
      .json({ message: "Please provide both email and password." });
  }

  try {
    const user = await knex("users").where({ email }).first();
    if (!user) {
      return res.status(400).json({ message: "User does not exist." });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials." });
    }
    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });
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
    console.error("Login error:", error);
    res.status(500).json({ message: "Server error during login." });
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
