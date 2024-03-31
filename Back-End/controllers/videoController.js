const val = require("../models/formModels/valForm");
const videoVote = require("../models/voteModels/videoVote");

exports.getAllVideos = async (req, res) => {
  try {
    const videos = await val.find({});
    res.json(videos);
  } catch (error) {
    console.error("Failed to fetch videos:", error);
    res
      .status(500)
      .json({ message: "Failed to fetch videos", error: error.message });
  }
};

exports.videoVote = async (req, res) => {
  const { id, rank } = req.body;
  try {
    const video = await videoVote.findOne({ valFormId: id });
    if (!video) {
      return res.status(404).send("Video not found");
    }

    const currentVotes = video.votes.get(rank);
    if (currentVotes !== undefined) {
      video.votes.set(rank, currentVotes + 1);
    } else {
      return res.status(400).send("Invalid rank specified");
    }

    video.markModified("votes");
    console.log(video);
    await video.save();
    res.status(200).send("Vote updated successfully");
  } catch (error) {
    console.error(error);
    res.status(500).send("Error updating vote");
  }
};

exports.createVideoVote = async (req, res) => {
  const { valFormId } = req.body;
  if (!valFormId) {
    return res
      .status(400)
      .json({ message: "valFormId must be provided and cannot be null." });
  }

  try {
    const existingId = await videoVote.findOne({ valFormId });
    if (existingId) {
      return res.status(500);
    }
    const newVideoVote = new videoVote({ valFormId });
    const savedVideoVote = await newVideoVote.save();
    res.status(201).json(savedVideoVote);
  } catch (error) {
    console.error(error);
    if (error.code === 11000) {
      return res
        .status(409)
        .json({ message: "Duplicate entry", error: error.message });
    }
    res
      .status(500)
      .json({ message: "Failed to create video vote", error: error.message });
  }
};

exports.getVotesByValFormId = async (req, res) => {
  const { valFormId } = req.params;

  try {
    const video = await videoVote.findOne({ valFormId });
    if (!video) {
      return res
        .status(404)
        .json({ message: "No votes found for the provided valFormId" });
    }

    let totalVotes = 0;
    video.votes.forEach((count) => {
      totalVotes += count;
    });

    const votePercentages = {};
    video.votes.forEach((count, rank) => {
      votePercentages[rank] =
        totalVotes > 0 ? ((count / totalVotes) * 100).toFixed(2) : "0%";
    });

    res.json({
      valFormId: video.valFormId,
      votes: votePercentages,
    });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "Error fetching votes", error: error.message });
  }
};
