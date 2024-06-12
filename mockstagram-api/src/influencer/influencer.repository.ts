import {Influencer} from "./influencer.model";
import percentile = require("percentile");

export class InfluencerRepository {

    private store: Map<ID, Influencer> = new Map();

    // n: number of influencers to seed the repo with.
    constructor(n: number) {
        Array(n).fill(0).forEach((_, i) => { this.seed(i) });
        console.log(`[INFLUENCER_REPOSITORY]: Seeded ${n} influencers`);
        this.print_stats();
    }

    private print_stats() {
        const tenth_percentile = percentile(10, Array.from(this.store.values()), (influencer: Influencer) => influencer.followerCount / influencer.followingCount);
        console.log(`[INFLUENCER_REPOSITORY]: 10th Percentile of follower ratio: ${tenth_percentile.followerCount / tenth_percentile.followingCount}`);
    }

    // Adds the ith influencer to the repository
    private seed(i: number) {
        if(i === undefined) { i = this.store.size }
        const pk = 1000000 + i;
        const model = Influencer.build(pk);
        this.save(model)
    }

    get(pk: ID): Influencer {
        const influencer = this.store.get(pk);
        // TODO: Replace with optional type.
        if(influencer === undefined) {
            const error = new Error("Influencer with pk: " + pk + " not found!");
            error.name = 'InfluencerNotFoundError';
            throw error;
        }
        return influencer
    }

    // Constraint: Don't use this method to create new influencers
    save(influencer: Influencer) {
        return this.store.set(influencer.pk, influencer)
    }
}

// Create the repository with 10000 influencers
export const repository = new InfluencerRepository(1000000);
export type ID = number