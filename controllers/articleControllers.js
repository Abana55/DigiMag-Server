const knex = require("../knex");

const getAllArticles = async (req, res) => {
  try {
    const articles = await knex.select("*").from("articles");
    res.json(articles);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const getArticleById = async (req, res) => {
  const { id } = req.params;
  try {
    const article = await knex("articles").where("id", id).first();
    if (!article) {
      return res.status(404).json({ message: "Article not found" });
    }
    res.json(article);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const createArticle = async (req, res) => {
  const { title, content, authorId } = req.body; // Make sure these align with your table's column names
  try {
    const [newArticleId] = await knex("articles").insert({
      title,
      content,
      authorId,
    });
    const newArticle = await knex("articles").where("id", newArticleId).first();
    res.status(201).json(newArticle);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const updateArticle = async (req, res) => {
  const { id } = req.params;
  const { title, content, authorId } = req.body; // Depending on what you allow to be updated
  try {
    const updated = await knex("articles")
      .where("id", id)
      .update({ title, content, authorId });
    if (!updated) return res.status(404).json({ message: "Article not found" });
    const updatedArticle = await knex("articles").where("id", id).first();
    res.json(updatedArticle);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const deleteArticle = async (req, res) => {
  const { id } = req.params;
  try {
    const deleted = await knex("articles").where("id", id).del();
    if (!deleted) return res.status(404).json({ message: "Article not found" });
    res.json({ message: "Article deleted successfully" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

module.exports = {
  getAllArticles,
  getArticleById,
  createArticle,
  updateArticle,
  deleteArticle,
};
