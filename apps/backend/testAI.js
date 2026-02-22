// const { generateFlashcards } = require('./gemini.js'); 
// const path = require('path');

// async function runTest() {
//     // const testFilePath =  "C:\\Users\\weng2\\OneDrive\\Desktop\\School Work\\UF 26' Spring\\Inter Micro\\Microeconomics.pdf"

//     const testFilePath = "C:\\Users\\weng2\\OneDrive\\Desktop\\School Work\\Resume.pdf"

//     console.log(`--- Starting Test ---`);
//     console.log(`Target File: ${testFilePath}`);

//     try {
//         const flashcards = await generateFlashcards(testFilePath);
        
//         console.log('\n--- Success! Generated Flashcards ---');
//         console.log(JSON.stringify(flashcards, null, 2));
    
//         console.log(`\nTotal Flashcards: ${flashcards.length}`);
//     } catch (error) {
//         console.error('\n--- Test Failed ---');
//         console.error(error.message);
//     }
// }

// runTest();