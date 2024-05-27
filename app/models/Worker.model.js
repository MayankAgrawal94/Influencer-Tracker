const mongoose = require('mongoose');

const WorkerSchema = new mongoose.Schema({
  workerId: { type: Number, required: true, unique: true },
  instanceId: { type: String, required: true, unique: true },
  timestamp: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Worker', WorkerSchema);
