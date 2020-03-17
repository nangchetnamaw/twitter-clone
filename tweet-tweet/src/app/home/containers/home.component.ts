import { Component, OnInit } from '@angular/core';
import { ITweet } from 'src/app/models/tweet.interface';
import { FeedService } from 'src/app/services/feed.service';
import { HttpResponse } from '@angular/common/http';

@Component({
    selector: 'app-home',
    styleUrls: ['./home.component.scss'],
    template: `
        <side-nav></side-nav>
    `
})
export class HomeComponent implements OnInit{
    tweets: ITweet[];
    
    constructor(private feedService: FeedService){}

    ngOnInit(){
        this.feedService.showFeed().subscribe((res: any) => {
            console.log(res);
            
            console.log(res.payload.tweets);
            this.tweets = res.payload.tweets;
        }), (err) => { console.log(err) };
    }
    
}