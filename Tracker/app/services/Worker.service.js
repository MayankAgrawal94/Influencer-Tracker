const Worker = require('../models/Worker.model')
const { InfluencerConfig }  = require('../../config/env.constant')

const getWorkerId = async () => {
  const workers = await Worker.find({}).sort({ workerId: 1 })
  let workerId = 0

  if (workers.length > 0) {
    for (let i = 0; i < workers.length; i++) {
      if (workers[i].workerId !== i) {
        workerId = i
        break
      }
    }
    if (workerId === 0 && workers.length > 0 && workers[0].workerId !== 0) {
      workerId = 0
    } else if (workerId === 0) {
      workerId = workers.length
    }
  }

  return workerId
}

exports.registerWorker = async (INSTANCE_ID) => {
  const workerId = await getWorkerId()
  const newWorker = new Worker({ workerId, instanceId: INSTANCE_ID, timestamp: new Date() })
  await newWorker.save()

  console.log(`Worker ${workerId} registered with instance ID ${INSTANCE_ID}`)

  return workerId
}

exports.deregisterWorker = async (INSTANCE_ID) => {
  await Worker.deleteOne({ instanceId: INSTANCE_ID });
  console.log(`Worker with instance ID ${INSTANCE_ID} deregistered`);
}

exports.updateHeartbeat = async (INSTANCE_ID) => {
  try {
    const updatedResp = await Worker.updateOne(
      { instanceId: INSTANCE_ID },
      { $set: { timestamp: new Date() } }
    )
    
    if( updatedResp && updatedResp.acknowledged == true 
        && updatedResp.matchedCount > 0 ) {
        
        return true
    } else {
      return false
    }
  } catch ( err ) {
    console.error(`ERROR: 'updateHeartbeat' | INSTANCE_ID: ${INSTANCE_ID}`, err)
    return false;
  }
}

exports.getActiveWorkers = async () => {
  const now = new Date()
  const fiveMinutesAgo = new Date(now - 5 * 60000)

  await Worker.deleteMany({ timestamp: { $lt: fiveMinutesAgo } })

  const workers = await Worker.find({})
  return workers
}

// 0, 1, 2 -> currect: 0, length = 2, rangeSize = 500000
exports.calculateRange = (workerId, workers) => {
  const totalWorkers = workers.length 
  const minPk = 1000000;
  const maxPk = 1999999;
  const rangeSize = Math.ceil((maxPk - minPk + 1) / totalWorkers);
  
  let startIndex = 0;
  let rangeStart = minPk;
  
  for (let i = 0; i < workers.length; i++) {
    if (workers[i].workerId === workerId) {
      startIndex = i;
      break;
    }
  }
  
  for (let i = 0; i < startIndex; i++) {
    rangeStart += rangeSize;
  }

  const rangeEnd = Math.min(rangeStart + rangeSize - 1, maxPk);

  console.log(`Worker ${workerId} handling pk range: ${rangeStart} to ${rangeEnd}`);
  return { rangeStart, rangeEnd };
}