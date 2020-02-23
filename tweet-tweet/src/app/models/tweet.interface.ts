import { IUser } from "./user.interface";

interface IContent{
  text: string;
  imageURL?: string;
  mentions: String[];
  tags: String[];
}

interface ICount{
  likeCount: number;
  replyCount: number;
  retweetCount: number;
}

export interface ITweet {
  user: string;
  content: IContent;
  recentLikes?: IUser[];
  date: String;
  replies?: any;
  likes?: any;
  retweets?: any;
  count?: ICount;
}
