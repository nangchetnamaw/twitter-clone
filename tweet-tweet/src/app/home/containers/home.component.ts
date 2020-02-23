import { Component, OnInit } from '@angular/core';
import { ITweet } from 'src/app/models/tweet.interface';
import { FeedService } from 'src/app/services/feed.service';
import { HttpResponse } from '@angular/common/http';

@Component({
    selector: 'app-home',
    styleUrls: ['./home.component.scss'],
    template: `
        <div class="app-home">
            <side-nav></side-nav>
            <div class="middle">
                <h2 class="header">Home</h2>
                <app-tweet-create></app-tweet-create>
                <div class="post-container" *ngFor="let tweet of tweets">
                    <app-post [text]="tweet.content.text" [likeCount]="tweet.count.likeCount" [commentCount]="tweet.count.replyCount"></app-post>
                </div>
            </div>
            <app-search></app-search>
        </div>
    `
})
export class HomeComponent implements OnInit{
    tweets: ITweet[];
    
    constructor(private feedService: FeedService){}

    ngOnInit(){
        this.feedService.showFeed().subscribe((res: any) => {
            console.log(res.payload.tweets);
            this.tweets = res.payload.tweets;
        }), (err) => { console.log(err) };
    }
    
}