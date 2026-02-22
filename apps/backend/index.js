const express = require("express");
const fileUpload = require("express-fileupload");
const fs = require("fs");
const cors = require("cors");

require("dotenv").config();

// Needs to be imported after dotenv config to ensure MONGO_URI is available
const { connectToMongo } = require('./connection');

const mongoose = require('mongoose');
const User = require('./db/user'); 
const StudySet = require('./db/studyset'); 


const app = express();
app.use(fileUpload());
app.use(cors());
app.use(express.json());

const { generateFlashcards } = require('./gemini.js'); 


app.get("/api/test", (req, res) => {
  res.send({ id: 1, test: "This is a test response from the backend!" });
});


app.post("/api/user/register", async (req, res) => {
  try {
    const newUser = new User(req.body);
    await newUser.save();
    res.status(201).json(newUser);
  } catch (error) {
    console.error("Registration error:", error);
    res.status(500).json({ error: error.message });
  }
});


app.post("/api/user/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user || user.password !== password) {
      return res.status(401).json({ message: "Invalid email or password" });
    }
    res.status(200).json({ 
      message: "Login successful", 
      user: { id: user._id, username: user?.username } 
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.post("/api/flashcard/uploadGemini/:userId", async (req, res) => {
  let tempPath;
  try {
    const userId = req.params.userId // or get from auth/session
    if (!userId) return res.status(401).json({ error: 'Unauthorized' });

    if (!req.files || !req.files.uploadFile) {
      return res.status(400).json({ error: 'No file uploaded' });
    }

    const uploadFile = req.files.uploadFile;
    tempPath = `uploads/${uploadFile.name}`;
    await uploadFile.mv(tempPath);

    const flashcards = await generateFlashcards(tempPath);

    // Create StudySet in DB
    const newStudySet = await StudySet.create({
      creator: userId,
      title: req.body.title || 'New Flashcard Set',
      description: req.body.description || '',
      flashcards
    });

    res.status(200).json({
      message: 'Studyset created from file',
      studyset: newStudySet
    });

  } catch (error) {
    console.error('Upload failed:', error);
    res.status(500).json({ error: error.message });
  } finally {
    if (tempPath && fs.existsSync(tempPath)) {
      fs.unlink(tempPath, (err) => {
        if (err) console.error('Failed to remove temp file', err);
      });
    }
  }
});

// get all flashcards for a user
app.route("/api/flashcard/:id")
.post(async(req, res) => {
  // create a studyset for the user id in the route (assumes :id is the user id)
  try {
    const userId = req.params.id;
    if (!userId) return res.status(400).json({ error: 'user id required' });
    if (!mongoose.Types.ObjectId.isValid(userId)) return res.status(400).json({ error: 'invalid user id' });

    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ error: 'user not found' });

    const newUStudySet = new StudySet({ ...req.body, creator: userId });
    await newUStudySet.save();

    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { $push: { studysets: newUStudySet._id } },
      { new: true }
    );

    res.status(201).json({ studyset: newUStudySet, user: updatedUser });
  } catch (error) {
    console.error("Create studyset error:", error);
    res.status(500).json({ error: error.message });
  }
  })


  .get(async (req, res) => {
  try {
    const userId = req.params.id;

    if (!userId) {
      return res.status(400).json({ error: 'user id required' });
    }

    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).json({ error: 'invalid user id' });
    }

    const studysets = await StudySet.find({ creator: userId }).lean();

    if (!studysets.length) {
      return res.status(200).json({
        message: 'No studysets found',
        count: 0,
        studysets: []
      });
    }

    return res.status(200).json({
      message: 'Studysets retrieved',
      count: studysets.length,
      studysets
    });

  } catch (error) {
    console.error('Get studyset error:', error);
    return res.status(500).json({ error: error.message });
  }
})

.delete(async (req, res) => {
  try {
    const userId = req.params.id;

    if (!userId) {
      return res.status(400).json({ error: 'user id required' });
    }

    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).json({ error: 'Invalid user id' });
    }

    let studysetId = req.body.studysetId;

    if (!studysetId) {
      const latest = await StudySet.findOne({ creator: userId }).sort({ _id: -1 });
      if (!latest) {
        return res.status(404).json({ message: 'No studyset found to delete' });
      }
      studysetId = latest._id;
    }

    if (!mongoose.Types.ObjectId.isValid(studysetId)) {
      return res.status(400).json({ error: 'Invalid studyset id' });
    }

    const deleted = await StudySet.findOneAndDelete({
      _id: studysetId,
      creator: userId
    });

    if (!deleted) {
      return res.status(404).json({ message: 'Studyset not found or not authorized' });
    }

    await User.findByIdAndUpdate(userId, {
      $pull: { studysets: studysetId }
    });

    return res.status(200).json({
      message: 'Studyset deleted',
      studysetId
    });

  } catch (error) {
    console.error('Delete studyset error:', error);
    return res.status(500).json({ error: error.message });
  }
});

app.route("/api/flashcard/:userId/:studysetId").put(async (req, res) => {
  try {
    const { userId, studysetId } = req.params;

    if (
      !mongoose.Types.ObjectId.isValid(userId) ||
      !mongoose.Types.ObjectId.isValid(studysetId)
    ) {
      return res.status(400).json({ error: 'Invalid id' });
    }

    if (!Array.isArray(req.body.flashcards)) {
      return res.status(400).json({ error: 'flashcards must be an array' });
    }

    const updated = await StudySet.findOneAndUpdate(
      { _id: studysetId, creator: userId },
      {
        $set: {
          flashcards: req.body.flashcards.map(card => ({
            question: card.question,
            answer: card.answer
          }))
        }
      },
      { new: true, runValidators: true }
    ).lean();

    if (!updated) {
      return res.status(404).json({
        message: 'Not found or unauthorized'
      });
    }

    res.status(200).json({
      message: 'Updated successfully',
      studyset: updated
    });

  } catch (error) {
    console.error("Update error:", error);
    res.status(500).json({ error: error.message });
  }
});

const PORT = process.env.PORT || 5000;

async function start() {
  try {
    await connectToMongo();
    const mongoUri = process.env.MONGO_URI || process.env.MONGODB_URI;
    if (mongoUri) {
      await mongoose.connect(mongoUri);
      console.log('Mongoose connected');
    }
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  } catch (err) {
    console.error('Failed to start server:', err && (err.stack || err));
    process.exit(1);
  }
}

start();