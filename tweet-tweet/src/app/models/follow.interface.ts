interface IFollower{
    userhandle: string;
    followerhandle: string;
}

interface IFollowing{
    userId: string;
    followingId: string;
}

interface IUnfollow{
    userId: string;
    followerId: string;
}

export { IFollower, IFollowing, IUnfollow };