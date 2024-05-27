const mongoose = require('mongoose');

const InfluencerSchema = new mongoose.Schema({
  pk: { type: Number, required: true, unique: true },
  username: { type: String, required: true },
  currentFollowerCount: { type: Number, required: true },
  followerCountTimeline: [{ followerCount: Number, timestamp: Date }],
  averageFollowerCount: { type: Number, required: true },
});

module.exports = mongoose.model('Influencer', InfluencerSchema);
