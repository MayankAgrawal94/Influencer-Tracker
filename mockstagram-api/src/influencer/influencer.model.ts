export interface InfluencerModel {
    pk: number
    username: string
    followerCount: number
    followingCount: number
}

export class Influencer implements InfluencerModel {
    constructor(
        public pk: number,
        public username: string,
        public followerCount: number,
        public followingCount: number
    ) {}

    modifyFollowerCount() {
        const change = Math.min(10000, 0.05 * this.followerCount) * randn(); // Max change of 5% of current followers (but no more than 10k)
        const followerCount =  +Math.max(this.followerCount + change, 5000).toFixed(); // Atleast 5k followers.
        return new Influencer(this.pk, this.username, followerCount, this.followingCount);
    }

    modifyFollowingCount() {
        const change = 100 * randn();
        const followingCount = +Math.max(this.followingCount + change, 50).toFixed(); // Atleast 50 followings
        return new Influencer(this.pk, this.username, this.followerCount, followingCount);
    }

    static build(pk: number): Influencer {
        const username = 'influencer-'+pk;
        const followerCount = +Math.max(100000 * (1 + randn()), 5000).toFixed();
        const followingCount = +Math.max(1000 * (1 + randn()), 50).toFixed();

        return new Influencer(pk, username, followerCount, followingCount)
    }
}

// Approximates Gaussian Distribution
// TODO: Move to utils.
export function randn(): number {
    var u = 0, v = 0;
    while(u === 0) u = Math.random(); //Converting [0,1) to (0,1)
    while(v === 0) v = Math.random();
    return Math.sqrt( -2.0 * Math.log( u ) ) * Math.cos( 2.0 * Math.PI * v );
}