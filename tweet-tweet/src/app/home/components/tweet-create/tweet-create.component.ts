import { Component } from "@angular/core";

@Component({
  selector: "tweet-create",
  template: `
    <div class="tweet-create">
      <div class="tweet-create__primary">
        <div class="tweet-create__primary--user_img"></div>
        <textarea class="tweet-create__primary--tweet_area" placeholder="What's happening?"></textarea>
      </div>
      <div class="tweet-create__secondary">
        <button class="tweet-create--btn_tweet">Tweet</button>
      </div>
    </div>
  `,
  styleUrls: ['./tweet-create.component.scss']
})
export class TweetCreateComponent {}
