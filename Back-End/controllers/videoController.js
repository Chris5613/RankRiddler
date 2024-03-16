const val = require('../models/valForm');
const videoVote = require('../models/videoVote');

exports.getAllVideos = async (req, res) => {
  try {
    const videos = await val.find({});
    res.json(videos);
  } catch (error) {
    console.error('Failed to fetch videos:', error);
    res.status(500).json({ message: 'Failed to fetch videos', error: error.message });
  }
};


exports.videoVote = async (req, res) => {
  const { id, rank } = req.body; 
  console.log(id)
  try {
    const video = await videoVote.findOne({valFormId: id})
    if (!video) {
      return res.status(404)
    }
    if (video.votes[rank] !== undefined) {
      video.votes[rank] += 1;
    } else {
      return res.status(400).send('Invalid rank specified');
    }
    console.log(video)
    await video.save();
  } catch (error) {
    console.error(error);
    res.status(500).send('Error updating vote');
  }
};


exports.createVideoVote = async (req, res) => {
  const { valFormId } = req.body;
  if (!valFormId) {
    return res.status(400).json({ message: 'valFormId must be provided and cannot be null.' });
  }

  try {

    const existingId = await videoVote.findOne({valFormId})
    if (existingId) {
      return res.status(500)
    }
    const newVideoVote = new videoVote({ valFormId });
    const savedVideoVote = await newVideoVote.save();

    res.status(201).json(savedVideoVote);
  } catch (error) {
    console.error(error);
    // Handle duplicate key error specifically, if needed
    if (error.code === 11000) {
      return res.status(409).json({ message: 'Duplicate entry', error: error.message });
    }
    res.status(500).json({ message: 'Failed to create video vote', error: error.message });
  }
};