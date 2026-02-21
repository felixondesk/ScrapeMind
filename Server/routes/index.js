var express = require('express');
var router = express.Router();
const { createEmbedding } = require('./embeddings');
const PDFParser = require('pdf2json');
const fs = require('fs');
const path = require('path');
const pdfParser = new PDFParser(this, 1);
/* GET home page. */
router.get('/', function (req, res, next) {
  res.json({ title: 'Express' });
});

router.get('/loaddoc', async (req, res) => {
  try {
    pdfParser.loadPDF(path.join(__dirname, '..', 'docs', 'insurance.pdf'));
    res.json({ message: "PDF loaded successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
})

pdfParser.on("pdfParser_dataReady", async (pdfData) => {
  await fs.writeFileSync(path.join(__dirname, '..', '..', 'context.txt'), pdfParser.getRawTextContent());
});

pdfParser.on("pdfParser_dataError", async (error) => {
  console.error(error);
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
