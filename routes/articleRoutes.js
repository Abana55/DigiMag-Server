const express = require('express');
const router = express.Router();
const articleController = require('/Users/anb/Desktop/NewProjects/my-magazine-app/magezine-server/controllers/articleController');

router.get('/', articleController.getArticles);
router.post('/', articleController.createArticle);
router.put('/:id', articleController.updateArticle);
router.delete('/:id', articleController.deleteArticle);

module.exports = router;

console.log(__dirname);
console.log(require('path').join(__dirname, '../controllers/articleController'));