import {InfluencerModel} from "../influencer/influencer.model";

export class SuspiciousInfluencerClassifier {

    // Calculated as the 10th percentile of followerCount / followingCount among 1m influencers.
    private static readonly EXPECTED_RATIO = 5.64;

    classify(influencer: InfluencerModel): boolean {
        return influencer.followerCount / influencer.followingCount <= SuspiciousInfluencerClassifier.EXPECTED_RATIO
    }

}

export const suspiciousInfluencerClassifier = new SuspiciousInfluencerClassifier();