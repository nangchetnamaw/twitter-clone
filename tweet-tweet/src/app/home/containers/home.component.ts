import { Component, OnInit } from '@angular/core';
import { ITweet } from 'src/app/models/tweet.interface';
import { FeedService } from 'src/app/services/feed.service';
import { HttpResponse } from '@angular/common/http';

@Component({
    selector: 'app-home',
    styleUrls: ['./home.component.scss'],
    template: `
      <app-create-post></app-create-post>
      <app-feed></app-feed>
    `
})
export class HomeComponent implements OnInit{
    tweets: ITweet[];
    
    constructor(){}

    ngOnInit(){
    }
    
}