export interface User {
  userhandle: string;
  email: string;
  password?: string;
  name: string;
  phone?: string;
  dob?: string;
  tweetCount?: Number;
  joined?: string;
  followerCount?: Number;
  followingCount?: number;
}
