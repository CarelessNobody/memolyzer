const mongoose = require('mongoose');
const { Schema } = mongoose;

const flashcardSchema = new Schema({
    question: { 
        type: String, 
        required: true 
    },
    answer: { 
        type: String, 
        required: true 
    }
});

const studysetSchema = new Schema({
    isPublic: { type: Boolean, default: false },
    flashcards: { type: [flashcardSchema], default: [] },
    creator: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    description: { type: String, default: '' },
});

module.exports = mongoose.model('StudySet', studysetSchema);