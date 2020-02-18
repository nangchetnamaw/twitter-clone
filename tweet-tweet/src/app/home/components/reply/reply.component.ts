import { Component } from '@angular/core';

@Component({
    selector: 'app-reply',
    styleUrls: ['./reply.component.scss'],
    template: `
        <div class="reply">
      <div class="reply__primary">
        <div class="reply__primary--user_img"></div>
        <textarea class="reply__primary--tweet_area" placeholder="What's happening?" #tweetarea></textarea>
      </div>
      <div class="reply__secondary">
        <button class="reply--btn_tweet">Reply</button>
      </div>
    </div> 
    `
})
export class ReplyComponent{

}