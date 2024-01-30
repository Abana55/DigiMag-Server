const knex = require("../knex");

const getAllCategories = async (_req, res) => {
  try {
    const categories = await knex.select("*").from("categories");
    res.status(200).json(categories);
  } catch (error) {
    res.status(500).send(`Error retrieving categories: ${error}`);
  }
};

const getCategoryById = async (req, res) => {
  const { id } = req.params;
  try {
    const category = await knex("categories").where("id", id).first();
    if (category) {
      res.status(200).json(category);
    } else {
      res.status(404).json({ error: "Category not found" });
    }
  } catch (error) {
    res.status(500).send(`Error retrieving category: ${error}`);
  }
};

const createCategory = async (req, res) => {
  const { name, description } = req.body;
  try {
    const [newCategoryId] = await knex("categories").insert({
      name,
      description,
    });
    const newCategory = await knex("categories")
      .where("id", newCategoryId)
      .first();
    res.status(201).json(newCategory);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const updateCategory = async (req, res) => {
  const { id } = req.params;
  try {
    const updated = await knex("categories").where("id", id).update(req.body);
    if (!updated) return res.status(404).json({ error: "Category not found" });
    const updatedCategory = await knex("categories").where("id", id).first();
    res.json(updatedCategory);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const deleteCategory = async (req, res) => {
  const { id } = req.params;
  try {
    const deleted = await knex("categories").where("id", id).del();
    if (!deleted) return res.status(404).json({ error: "Category not found" });
    res.json({ message: "Category deleted successfully" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = {
  getAllCategories,
  getCategoryById,
  createCategory,
  updateCategory,
  deleteCategory,
};
