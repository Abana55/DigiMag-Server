const getArticles = async (req, res) => {
    try {
        const articles = await Article.find();
        res.json(articles)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
};

const createArticle = async (req, res) => {
    try {
        const {title, content, author} = req.body;
        const newArticle = new Article({title, content, author});
        await newArticle.save();
        res.status(201).json(newArticle);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}

const updateArticle = async (req, res) => {
    try {
        const { id } = req.params;
        const updatedArticle = await Article.findByIdAndUpdate(id, req.body, { new: true });
        if (!updatedArticle) {
            return res.status(404).json({ message: "Article not found" });
        }
        res.json(updatedArticle);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

const deleteArticle = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedArticle = await Article.findByIdAndDelete(id);
        if (!deletedArticle) {
            return res.status(404).json({ message: "Article not found" });
        }
        res.json({ message: "Article deleted successfully" });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

module.exports = {
    getArticles,
    createArticle,
    updateArticle,
    deleteArticle
};

