const mongoose = require('mongoose');
const { Schema } = mongoose;

const userSchema = new Schema({
  username: { type: String, required: true },
  email: { type: String, required: true, unique: true, index: true },
  password: { type: String, required: true },
  studysets: [{ type: Schema.Types.ObjectId, ref: 'StudySet' }],
});

module.exports = mongoose.model('User', userSchema);