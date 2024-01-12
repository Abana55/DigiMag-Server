const getArticles = async (req, res) => {
    try {
        const articles = await Article.find();
        res.json(articles)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
};