const { GoogleGenAI } = require("@google/genai");
const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '.env') });

const genAI = new GoogleGenAI({ apiKey: process.env.API_KEY });

async function createEmbedding(text) {
    try {
        console.log("text", text);
        const response = await genAI.models.embedContent({
            model: "text-embedding-004",
            contents: [{ parts: [{ text }] }],
        });
        return response.embeddings[0].values;
    } catch (error) {
        console.log(error);
        return null;
    }
}

async function test() {
    console.log("Starting test with API Key:", process.env.API_KEY ? "Set" : "Not Set");
    const embedding = await createEmbedding("hi");
    if (embedding) {
        console.log("Success! Embedding received. Length:", embedding.length);
    } else {
        console.log("Failed to receive embedding.");
    }
}

test();
