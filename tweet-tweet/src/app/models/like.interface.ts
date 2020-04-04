interface ILike{
    tweetId: string;
    userId: string;
}

interface IUnlike{
    tweetId: string;
    likedBy: string;
}


export { ILike, IUnlike};