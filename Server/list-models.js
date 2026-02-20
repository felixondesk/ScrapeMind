const { GoogleGenAI } = require("@google/genai");
const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '.env') });

const genAI = new GoogleGenAI({ apiKey: process.env.API_KEY });

async function listModels() {
    try {
        console.log("Listing models with API Key:", process.env.API_KEY ? "Set" : "Not Set");
        const response = await genAI.models.list();
        console.log("Available models:");
        response.models.forEach(model => {
            console.log(`- ${model.name} (Methods: ${model.supportedMethods.join(', ')})`);
        });
    } catch (error) {
        console.error("Error listing models:", error);
    }
}

listModels();
