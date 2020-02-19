import { User } from "./user.interface";

export interface ITweet {
  user: string;
  content: any;
  recentLikes?: User[];
  tags?: String[];
  date: String;
  comments?: any;
  commentCount?: Number;
  likes?: any;
  likeCount?: Number;
}
