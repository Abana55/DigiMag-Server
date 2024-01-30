const knex = require('../knex');

const getAllUsers = async (req, res) => {
    try {
      const users = await knex.select('*').from('users');
      res.json(users);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  };

  const getUserById = async (req, res) => {
    try {
      const user = await knex('users').where('id', req.params.id).first();
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
      res.json(user);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  };

  const createUser = async (req, res) => {
    const { username, email } = req.body;
    try {
      const [newUserId] = await knex('users').insert({ username, email });
      const newUser = await knex('users').where('id', newUserId).first();
      res.status(201).json(newUser);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  };

  const updateUser = async (req, res) => {
    const { id } = req.params;
    try {
      const updated = await knex('users').where('id', id).update(req.body);
      if (!updated) return res.status(404).json({ message: "User not found" });
      const updatedUser = await knex('users').where('id', id).first();
      res.json(updatedUser);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  };

  const deleteUser = async (req, res) => {
    const { id } = req.params;
    try {
      const deleted = await knex('users').where('id', id).del();
      if (!deleted) return res.status(404).json({ message: "User not found" });
      res.json({ message: "User deleted successfully" });
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  };

  module.exports = {
    getAllUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser
  };