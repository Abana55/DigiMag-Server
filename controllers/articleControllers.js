const getArticles = async (req, res) => {
    try {
        const articles = await Article.find();
        res.json(articles)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
};

const createArticle = sync (req, res) => {
    try {
        const {title, content, author} = req.body;
        const newArticle = new Article({title, content, author});
        await newArticle.save();
        res.status(201).json(newArticle);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}
