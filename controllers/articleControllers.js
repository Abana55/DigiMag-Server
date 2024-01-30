const knex = require('../knex');


exports.getAllArticles = async (req, res) => {
  try {
      const articles = await knex.select('*').from('articles');
      res.json(articles);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  };
  
  exports.getArticleById = async (req, res) => {
    try {
      const article = await knex('articles').where('id', req.params.id).first();
      if (!article) {
        return res.status(404).json({ message: "Article not found" });
      }
      res.json(article);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  };

  exports.createArticle = async (req, res) => {
    const { title, content, author } = req.body;
    try {
        const [newArticleId] = await knex('articles').insert({ title, content, author });
        const newArticle = await knex('articles').where('id', newArticleId).first();
        res.status(201).json(newArticle);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

exports.updateArticle = async (req, res) => {
    const { id } = req.params;
    try {
        const updated = await knex('articles').where('id', id).update(req.body);
        if (!updated) return res.status(404).json({ message: "Article not found" });
        const updatedArticle = await knex('articles').where('id', id).first();
        res.json(updatedArticle);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

exports.deleteArticle = async (req, res) => {
    const { id } = req.params;
    try {
        const deleted = await knex('articles').where('id', id).del();
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
    deleteArticle
  };

