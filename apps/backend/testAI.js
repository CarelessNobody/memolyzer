const { generateFlashcards } = require('./index.js'); 
const path = require('path');

async function runTest() {
    const testFilePath = path.join(require('os').homedir(), 'Desktop', 'sample.pdf');

    console.log(`--- Starting Test ---`);
    console.log(`Target File: ${testFilePath}`);

    try {
        const flashcards = await generateFlashcards(testFilePath);
        
        console.log('\n--- Success! Generated Flashcards ---');
        console.log(JSON.stringify(flashcards, null, 2));
    
        console.log(`\nTotal Flashcards: ${flashcards.length}`);
    } catch (error) {
        console.error('\n--- Test Failed ---');
        console.error(error.message);
    }
}

runTest();