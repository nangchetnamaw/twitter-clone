import { Component, OnInit } from '@angular/core';
import { ITweet } from 'src/app/models/tweet.interface';
import { FeedService } from 'src/app/services/feed.service';
import { HttpResponse } from '@angular/common/http';

@Component({
    selector: 'app-home',
    styleUrls: ['./home.component.scss'],
    template: `
   
    <div class="container-fluid">
       <div class="row">
         <div class="col-md-3">
           <side-nav></side-nav>
          </div> 
          <div class="col-md-6">
            <app-create-post></app-create-post>
            </div>
         <div class="col-md-3">  
           <app-trends></app-trends>
         </div>
       </div>
     </div>
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