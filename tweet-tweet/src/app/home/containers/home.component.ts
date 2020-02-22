import { Component, OnInit } from '@angular/core';
import { ITweet } from 'src/app/models/tweet.interface';
import { FeedService } from 'src/app/services/feed.service';
import { HttpResponse } from '@angular/common/http';

@Component({
    selector: 'app-home',
    styleUrls: ['./home.component.scss'],
    template: `
        <div class="app-home">
            <!-- <side-nav></side-nav>
            <div class="middle">
                <h2 class="header">Home</h2>
                <app-tweet-create></app-tweet-create>
                <div class="post-container" *ngFor="let tweet of tweets">
                    <app-post [text]="tweet.content.text" [likeCount]="tweet.likeCount" [commentCount]="tweet.commentCount"></app-post>
                </div>
            </div>
            <app-search></app-search> -->
        </div>
    `
})
export class HomeComponent implements OnInit{
    tweets: ITweet[];

    private parseJwt(token) {
        var base64Url = token.split(".")[1];
        var base64 = base64Url.replace("-", "+").replace("_", "/");
        return JSON.parse(window.atob(base64));
      }
    
    //   payload = this.parseJwt(localStorage.getItem('Authorization'));

    constructor(private feedService: FeedService){}
    // *ngFor="let tweet of tweets"
    ngOnInit(){
        this.feedService.showTweets('senseihimanshu').subscribe((res: HttpResponse<ITweet[]>) => {
            // console.log(res.body);
            // console.log(res.body['tweetsOfFollowings']);
            // this.tweets = res.body['tweetsOfFollowings'];
            console.log(res.body);
        });
    }
    
}