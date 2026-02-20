var express = require('express');
var router = express.Router();
const { createEmbedding } = require('./embeddings');

/* GET home page. */
router.get('/', function (req, res, next) {
  res.json({ title: 'Express' });
});

router.get('/embeddings', async (req, res) => {
  try {
    const { text } = req.query;
    const embedding = await createEmbedding("Hello world");
    res.json({ embedding });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
