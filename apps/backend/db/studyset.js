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
    dateCreated: { type: Date, default: Date.now },
    creator: { type: Schema.Types.ObjectId, ref: 'User', required: true }, // link to your User model
    description: { type: String, default: '' }
});

module.exports = mongoose.model('StudySet', studysetSchema);