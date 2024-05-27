const connectDB = require('./config/db')
const { updateFollowers } = require('./app/services/Influencer.service')
const { 
  registerWorker, 
  deregisterWorker, 
  updateHeartbeat, 
  getActiveWorkers 
} = require('./app/services/Worker.service')
const { v4: uuidv4 } = require('uuid')

connectDB()

const INSTANCE_ID = uuidv4() // Unique identifier for this worker instance
console.log( `Worker's INSTANCE_ID is "${INSTANCE_ID}"`)

const main = async () => {
  const workerId = await registerWorker(INSTANCE_ID)
  
  setInterval(async () => {
    await updateHeartbeat(INSTANCE_ID)
    const workers = await getActiveWorkers()
    // const totalWorkers = workers.length
    updateFollowers(workerId, workers)
  }, 60000)
}

process.on('SIGINT', async () => {
  await deregisterWorker(INSTANCE_ID)
  process.exit()
})

process.on('SIGTERM', async () => {
  await deregisterWorker(INSTANCE_ID)
  process.exit()
})

main()