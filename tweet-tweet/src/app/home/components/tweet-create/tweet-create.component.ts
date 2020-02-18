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

  createTweetHandler(tweet: ITweet){
    const payload = this.parseJwt(localStorage.getItem('Authorization'));
    tweet = {
      user: {
        userhandle: payload.userhandle,
        email: payload.email,
        name: payload.name
      },
      date: Date.now().toString()
    }
    this.tweetService.createTweet(tweet).subscribe((response: HttpResponse<ITweet>) => {
      console.log(response);
    });
  }

  parseJwt = function(token) {
    var base64Url = token.split('.')[1];
    var base64 = base64Url.replace('-', '+').replace('_', '/');
    return JSON.parse(window.atob(base64));
  }
}
