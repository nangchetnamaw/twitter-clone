interface ILike{
    tweetId: string;
    likedBy: string;
}

interface IUnlike{
    tweetId: string;
    likedBy: string;
}


export { ILike, IUnlike};