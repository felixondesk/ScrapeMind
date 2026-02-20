const { GoogleGenAI } = require("@google/genai");
const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '.env') });

const genAI = new GoogleGenAI({ apiKey: process.env.API_KEY });

async function testModel(modelName) {
    try {
        console.log(`Testing model: ${modelName}`);
        const response = await genAI.models.embedContent({
            model: modelName,
            contents: [{ parts: [{ text: "hi" }] }],
        });
        console.log(`✅ Success with ${modelName}!`);
        return true;
    } catch (error) {
        console.log(`❌ Failed with ${modelName}: ${error.message}`);
        return false;
    }
}

async function runTests() {
    const models = ["text-embedding-004", "text-embedding-001", "embedding-001", "models/text-embedding-004", "models/embedding-001"];
    for (const model of models) {
        const success = await testModel(model);
        if (success) break;
    }
}

runTests();
