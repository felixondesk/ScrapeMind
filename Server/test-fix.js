const { createEmbedding } = require('./routes/embeddings');
require('dotenv').config();

async function test() {
    console.log("Starting test...");
    const embedding = await createEmbedding("hi");
    if (embedding) {
        console.log("Success! Embedding received.");
        console.log("First 5 values:", embedding.slice(0, 5));
    } else {
        console.log("Failed to receive embedding.");
    }
}

test();
