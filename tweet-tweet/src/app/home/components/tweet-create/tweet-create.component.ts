import { Component } from "@angular/core";
import { TweetService } from 'src/app/services/tweet.service';
import { ITweet } from 'src/app/models/tweet.interface';
import { HttpResponse } from '@angular/common/http';

@Component({
  selector: "app-tweet-create",
  template: `
    <div class="tweet-create">
      <div class="tweet-create__primary">
        <div class="tweet-create__primary--user_img"></div>
        <textarea class="tweet-create__primary--tweet_area" placeholder="What's happening?" #tweetarea></textarea>
      </div>
      <div class="tweet-create__secondary">
        <button class="tweet-create--btn_tweet" (click)="createTweetHandler(tweetarea.value)">Tweet</button>
      </div>
    </div>  
  `,
  styleUrls: ['./tweet-create.component.scss']
})
export class TweetCreateComponent {
  constructor(private tweetService: TweetService){}

  private parseJwt(token) {
    var base64Url = token.split(".")[1];
    var base64 = base64Url.replace("-", "+").replace("_", "/");
    return JSON.parse(window.atob(base64));
  }

  payload = this.parseJwt(localStorage.getItem('Authorization'));

  createTweetHandler(text: string){
    const tweet = {
      user: this.payload.userhandle,
      content: {
        text: text
      },
      recentLikes: [],
      tags: text.match(/\B\#\w\w+\b/g) || [],
      date: Date.now().toString(),
      commentCount: 0,
      likeCount: 0
    }
    console.log(text.match(/\B\#\w\w+\b/g));
    this.tweetService.createTweet(tweet).subscribe((response: HttpResponse<ITweet>) => {
      console.log(response.body);
    });
  }
}
