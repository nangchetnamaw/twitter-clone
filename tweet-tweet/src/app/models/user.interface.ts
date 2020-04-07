export interface ICount{
  followerCount: number;
  followingCount: number;
  tweetCount: number;
}

export interface IUser {
  location ?: string;
  dob: string;
  userhandle: string;
  email: string;
  password?: string;
  name: string;
  bio?: string;
  profileImg?: string;
  joined?: string;
  count?: ICount;
}

export interface IJwtPayload {
  _id: string,
  userhandle: string,
  name: string,
}