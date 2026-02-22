require("dotenv").config();
const { GoogleGenAI } = require("@google/genai");
const fs = require('fs');
const API_KEY = process.env.GEMINI_API_KEY
const ai = new GoogleGenAI({apiKey: API_KEY});

async function generateFlashcards(filepath) {
    // uploading file based on the user's pdf
    const path = require('path');

    // Read file into a Buffer 
    const buffer = fs.readFileSync(filepath);
    const stats = fs.statSync(filepath);
    const fileLike = {
        name: path.basename(filepath),
        size: buffer.length,
        slice: (start, end) => buffer.slice(start, end),
        stream: () => require('stream').Readable.from(buffer)
    };

    const file = await ai.files.upload({
        file: fileLike,
        filename: path.basename(filepath),
        config: {
            displayName: path.basename(filepath),
            mimeType: "application/pdf"
        }
    });

    // processing document
    let getFile = await ai.files.get({ name: file.name });
    while (getFile.state === 'PROCESSING') {
        getFile = await ai.files.get({ name: file.name });
        console.log(`current file status: ${getFile.state}`);
        console.log('File is still processing');

        await new Promise((resolve) => {
            setTimeout(resolve, 5000);
        });
    }
    if (getFile.state === 'FAILED') {
        throw new Error('File processing failed.');
    }

    // generate content
    const response = await ai.models.generateContent({
            model: 'gemini-flash-latest',
            contents: [
                {
                    role: 'user',
                    parts: [
                        { fileData: { fileUri: file.uri, mimeType: file.mimeType } },
                        { text: "Create 10 flashcards from this PDF. These flashcards consist of questions and answers that correlate to each other. Return a JSON array of objects where the chronological order of the question would be the 'id' of the flashcard, and content would be represent in the 'question' and 'answer' keys." }
                    ]
                }
            ],
            config: {
                responseMimeType: "application/json"
            }
        });
        
    return JSON.parse(response.text);
}

module.exports = { generateFlashcards };
