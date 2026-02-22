require("dotenv").config();
const { GoogleGenAI } = require("@google/genai");
const fs = require('fs');
const API_KEY = process.env.GEMINI_API_KEY
const ai = new GoogleGenAI({apiKey: API_KEY});

async function generateFlashcards(filepath) {
    // uploading file based on the user's pdf
    const file = await ai.files.upload({
        file: fs.createReadStream(filepath),
        config: {
            displayName: "Study Document",
            mimeType: "application/pdf"
        }
    });

    // processing document
    let getFile = await ai.files.get({ name: file.name });
    while (getFile.state === 'PROCESSING') {
        getFile = await ai.files.get({ name: file.name });
        console.log(`current file status: ${getFile.state}`);
        console.log('File is still processing, retrying in 5 seconds');

        await new Promise((resolve) => {
            setTimeout(resolve, 5000);
        });
    }
    if (file.state === 'FAILED') {
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
                        { text: "Create 10 flashcards from this PDF. These flashcards consist of questions and answers that correlate to each other. Return a JSON array of objects with 'question' and 'answer' keys." }
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
