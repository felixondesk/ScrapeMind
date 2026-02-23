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
const { client } = require("../connection")

router.get('/loaddoc', async (req, res) => {
  try {
    pdfParser.loadPDF(path.join(__dirname, '..', 'docs', 'insurance.pdf'))
    pdfParser.on("pdfParser_dataReady", async (pdfData) => {
      await fs.writeFileSync(path.join(__dirname, '..', '..', 'context.txt'), pdfParser.getRawTextContent());
    });
    const context = await fs.readFileSync(path.join(__dirname, '..', '..', 'context.txt'), 'utf-8');
    const splitContents = context.split("\n");
    for (line of splitContents) {
      let embedding = await createEmbedding(line);
      const db = client.db("ScrapeMind");
      const collection = db.collection("embeddings");
      await collection.insertOne({ embedding, text: line });
    }
    res.json({ message: "PDF loaded successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
})



pdfParser.on("pdfParser_dataError", async (error) => {
  console.error(error);
});

router.get('/embeddings', async (req, res) => {
  try {
    const { text } = req.query;
    const embedding = await createEmbedding(text);
    res.json({ embedding });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
});

router.post("/conversation", async (req, res) => {
  try {
    let { sessionID } = req.body;
    const db = client.db("ScrapeMind");
    if (!sessionID) {
      const collection = db.collection("sessions");
      const session = await collection.insertOne({ createdAt: new Date() });
      sessionID = session._id;
    }
    res.json({ message: "Session created successfully" });

  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
})

module.exports = router;
