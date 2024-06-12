import {ID, InfluencerRepository, repository} from "./influencer.repository";
import {InfluencerModel} from "./influencer.model";

class InfluencerService {
    constructor(private repository: InfluencerRepository) {}

    // Returns the influencer given their pk
    // The follower and following count of the user is modified everytime this API is called.
    // This is to simulate real life updates of an influencers followers / followings.

    get(pk: ID): InfluencerModel {
        const influencer = this.repository.get(pk);
        const updatedInfluencer = influencer
            .modifyFollowerCount()
            .modifyFollowingCount();

        this.repository.save(updatedInfluencer);
        return updatedInfluencer
    }
}

export const influencerService = new InfluencerService(repository);