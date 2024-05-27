exports.MongoDbConfig = {
    connString: process.env.DB_CONNECTION_STRING || 'mongodb://localhost:27017',
    connOptions: {
      minPoolSize: 2, // Maintain minimun 2 socket connections
      maxPoolSize: 10, // Maintain up to 10 socket connections
      // replicaSet:.'",
      // connectTimeoutMS: 20000,
      // maxConnecting: 2,
      // maxIdleTimeMS:
      dbName: process.env.DB_NAME || 'influencerDB',
      autoIndex: true,
      autoCreate: true,
      // directConnection:true,
      // LoadBalanced: true,
    }
}

exports.InfluencerConfig = {
  minPk: process.env.MIN_PK || 1000000,
  maxPk: process.env.MAX_PK || 1999999
} 

exports.BasicConfig = {
  baseUrl: process.env.BASE_URL || 'http://localhost:3000'
}