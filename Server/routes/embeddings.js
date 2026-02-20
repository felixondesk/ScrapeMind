const { GoogleGenAI } = require("@google/genai");

const genAI = new GoogleGenAI({ apiKey: process.env.API_KEY });

async function createEmbedding(text) {
    try {
        console.log("text", text);
        const response = await genAI.models.embedContent({
            model: "gemini-embedding-001",  // ✅ correct model name
            contents: text,                  // ✅ plain string format
        });
        return response.embeddings[0].values;
    } catch (error) {
        console.log(error);
        return null;
    }
}

module.exports = { createEmbedding };
