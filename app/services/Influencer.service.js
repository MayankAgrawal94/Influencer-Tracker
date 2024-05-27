const axios = require('axios')
const { BasicConfig } = require('../../constants/env.constant')
const Influencer = require('../models/Influencer.model')
const { calculateRange } = require('./Worker.service')

const getInfluencerData = async (pk) => {
    try {
      const response = await axios.get(`${BasicConfig.baseUrl}/api/v1/influencers/${pk}`)
      return response.data
    } catch (error) {
      console.error(`Error fetching data for influencer ${pk}:`, error.message)
    }
}
  
const updateInfluencerData = async (data) => {
    const { pk, username, followerCount } = data
    const timestamp = new Date()
  
    let influencer = await Influencer.findOne({ pk })
    if (!influencer) {
      influencer = new Influencer({
        pk,
        username,
        currentFollowerCount: followerCount,
        followerCountTimeline: [{ followerCount, timestamp }],
        averageFollowerCount: followerCount,
      })
    } else {
      influencer.currentFollowerCount = followerCount
      influencer.followerCountTimeline.push({ followerCount, timestamp })
      influencer.averageFollowerCount = ((influencer.averageFollowerCount * (influencer.followerCountTimeline.length - 1)) + followerCount) / influencer.followerCountTimeline.length
    }
  
    await influencer.save()
}

exports.updateFollowers = async (workerId, workers) => {
    const { rangeStart, rangeEnd } = calculateRange(workerId, workers)
  
    for (let pk = rangeStart; pk <= rangeEnd; pk++) {
      const data = await getInfluencerData(pk)
      if (data) {
        await updateInfluencerData(data)
      }
    }
}
