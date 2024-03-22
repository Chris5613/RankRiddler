const league = require('../models/formModels/leagueForm');
const leagueVote = require('../models/voteModels/leagueVote');

exports.getLeagueVideos = async (req, res) => {
  try {
    const videos = await league.find({});
    res.json(videos);
  } catch (error) {
    console.error('Failed to fetch videos:', error);
    res.status(500).json({ message: 'Failed to fetch videos', error: error.message });
  }
};

exports.leagueCreateVoteRecord = async (req, res) => {
  const { valFormId } = req.body;
  if (!valFormId) {
    return res.status(400).json({ message: 'valFormId must be provided and cannot be null.' });
  }
  try {
    const existingId = await leagueVote.findOne({valFormId})
    if (existingId) {
      return res.status(500)
    }
    const newVideoVote = new leagueVote({ valFormId });
    const savedVideoVote = await newVideoVote.save();

    res.status(201).json(savedVideoVote);
  } catch (error) {
    console.error(error);
    if (error.code === 11000) {
      return res.status(409).json({ message: 'Duplicate entry', error: error.message });
    }
    res.status(500).json({ message: 'Failed to create video vote', error: error.message });
  }
};


exports.leagueVideoVote = async (req, res) => {
  const { id, rank } = req.body; 
  try {
    const video = await leagueVote.findOne({valFormId: id})
    if (!video) {
      return res.status(404)
    } 
    if (video.votes[rank] !== undefined) {
      video.votes[rank] += 1;
    } else {
      return res.status(400).send('Invalid rank specified');
    }
    await video.save();
  } catch (error) {
    console.error(error);
    res.status(500).send('Error updating vote');
  }
};


exports.getLeagueVotesByValFormId = async (req, res) => {
  const { valFormId } = req.params; 
  try {
    const video = await leagueVote.findOne({ valFormId: valFormId });

    if (!video) {
      return res.status(404).json({ message: 'No votes found for the provided valFormId' });
    }

    const votes = video.votes; 
    const totalVotes = Object.values(votes).reduce((acc, count) => acc + count, 0);
    
    const votePercentages = {};
    for (const [rank, count] of Object.entries(votes)) {
      votePercentages[rank] = totalVotes > 0 ? ((count / totalVotes) * 100).toFixed(2) : '0%';
    }
    res.json({
      ...video.toObject(),
      votes: votePercentages,
    });
    
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error fetching votes', error: error.message });
  }
};