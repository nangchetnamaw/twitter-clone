interface ICount{
  followerCount: number;
  followingCount: number;
}

export interface IUser {
  userhandle: string;
  email: string;
  password?: string;
  name: string;
  dob: string;
  profileImg?: string;
  joined?: string;
  count?: ICount;
}

export interface IJwtPayload {
  _id: string,
  userhandle: string,
  name: string,
}