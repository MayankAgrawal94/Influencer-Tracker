const mongoose = require('mongoose');
const { MongoDbConfig } = require('./env.constant');

const connectDB = async () => {
  try {
    await mongoose.connect( MongoDbConfig.connString, MongoDbConfig.connOptions );
    console.log('MongoDB connected');
  } catch (err) {
    console.error(err.message);
    process.exit(1);
  }
};

module.exports = connectDB;
