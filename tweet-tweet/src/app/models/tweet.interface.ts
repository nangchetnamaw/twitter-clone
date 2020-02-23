import { IUser } from "./user.interface";

export interface ITweet {
  user: string;
  content: any;
  recentLikes?: IUser[];
  tags?: String[];
  date: String;
  comments?: any;
  commentCount?: Number;
  likes?: any;
  likeCount?: Number;
}
