interface IFollower{
    userhandle: string;
    followerhandle: string;
}

interface IFollowing{
    userId: string;
    followingId: string;
}

interface IUnfollow{
    userhandle: string;
    followerhandle: string;
}

export { IFollower, IFollowing, IUnfollow };