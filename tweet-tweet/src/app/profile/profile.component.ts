import { Router, ActivatedRoute, Params } from "@angular/router";
import {
  Component,
  OnInit,
  Input,
  OnChanges,
  SimpleChanges
} from "@angular/core";
import { SearchService } from "src/app/services/search.service";
import { switchMap } from "rxjs/operators";
import { IUser, IJwtPayload } from "../models/user.interface";
import { HttpResponse } from "@angular/common/http";
import { FollowService } from "../services/follow.service";
import { FeedService } from "../services/feed.service";
import { IFollower, IUnfollow } from "../models/follow.interface";
import { ITweet } from '../models/tweet.interface';
import ParseJwt from '../utils/parsejwt';

@Component({
  selector: "app-profile",
  styleUrls: ["./profile.component.scss"],
  template: `
    <div class="container profile-container col-sm-6 col-sm-offset-2">
        <div class="row profile-container-top-nav">
            <div class="col-sm-1 col-lg-1 col-md-1">
                <i class="fa fa-arrow-left"></i>
            </div>
            <div class="col-sm-11 col-lg-11 col-md-11">
                <h4>Himanshu Kumar</h4>
                <p>0 Tweets</p>
            </div>
        </div>
        <div class="row">
            <div class="row profile-block col-sm-12 col-lg-12 col-md-12">
                <div class="row profile-block-thumb cover-container">
                    <a href="#">
                        <img src="https://pbs.twimg.com/profile_banners/738006188239921152/1581790348/1500x500" alt="" title="">        
                    </a>
                </div>
                <div class="profile-img">
                    <a href="#">
                        <img src="https://pbs.twimg.com/profile_images/738007813398532097/oX5g8no8_400x400.jpg" alt="" title="">        
                    </a>
                </div>
                
                <div class="row profile-block-menu">
                    <div class="block-menu col-lg-3 col-lg-offset-9">
                        <button class="edit-profile-btn">Edit Profile</button>
                    </div>
                </div>
            </div>
        </div> 
        <div class="col-sm-12 profile-description-menu">
            <h4>Himanshu Kumar</h4>
            <p>@imh0kumar</p>
            <p>Comedy and Humour Entertainment Music Sports</p>
            <p>Born July 15, 1997
                <span><i class="fa fa-calendar" aria-hidden="true"></i> Joined June 2016</span>
            </p>
            <span><a href="#"><span id="following-number">5 </span><span> Following</span></a>
            <a href="#"><span id="followers-number">0 </span><span> Followers</span></a></span>
        </div>  
        <div class="block-menu col-sm-12">
            <ul>
                <li><a href="#">Tweets</a></li>
                <li><a href="#">Tweets & Replies</a></li>
                <li><a href="#">Media</a></li>
                <li><a href="#">Likes</a></li>
            </ul>
        </div>
        <div class="who-to-follow-div tweet-feed col-sm-12">
            <div class="card-body">
                <div class="row who-to-follow-div-content tweet-feed-content">
                    <div class="col-lg-1 col-md-1 col-sm-1 who-to-follow-div-content-img tweet-feed-content-img">
                        <a href="#">
                            <img src="https://pbs.twimg.com/profile_images/738007813398532097/oX5g8no8_400x400.jpg" alt="" title="">        
                        </a>
                    </div>
                    <div class="col-lg-11 col-md-11 col-sm-11 who-to-follow-div-middle tweet-feed-content-right">
                        <a href="#">H Fisk Johnson, Ph.</a>
                        <span>@H Johnson</span>
                        <p>It did take time. But finally we were able to overcome all obstacles.</p>
                    </div>
                </div>
                <div class="row">
                    <div class="col-lg-11 col-lg-offset-1">
                        <img class="tweet-image" src="https://4.img-dpreview.com/files/p/E~TS590x0~articles/3925134721/0266554465.jpeg">
                    </div>
                </div>
                <div class="row">
                    <div class="col-lg-3 col-lg-offset-1">
                        
                    </div>
                    <div class="col-lg-3">
                        
                    </div>
                    <div class="col-lg-3">
                        
                    </div>
                </div>    
            </div>
        </div>
        <div class="who-to-follow-div col-sm-12">
            <div class="card-body">
                <h5 class="card-title">Who To Follow</h5>
                <div class="row who-to-follow-div-content">
                    <div class="col-lg-2 who-to-follow-div-content-img">
                        <a href="#">
                            <img src="https://pbs.twimg.com/profile_images/738007813398532097/oX5g8no8_400x400.jpg" alt="" title="">        
                        </a>
                    </div>
                    <div class="col-lg-7 col-md-7 col-sm-7 who-to-follow-div-middle">
                        <a href="#">H Fisk Johnson, Ph.</a>
                        <p>@H Johnson</p>
                    </div>
                    <div class="col-lg-2 col-md-2 col-sm-2">
                        <button class="who-to-follow-btn">Follow</button>
                    </div>
                </div>
                <div class="row who-to-follow-div-content">
                    <div class="col-lg-2 who-to-follow-div-content-img">
                        <a href="#">
                            <img src="https://pbs.twimg.com/profile_images/738007813398532097/oX5g8no8_400x400.jpg" alt="" title="">        
                        </a>
                    </div>
                    <div class="col-lg-7 col-md-7 col-sm-7 who-to-follow-div-middle">
                        <a href="#">H Fisk Johnson, Ph.</a>
                        <p>@H Johnson</p>
                    </div>
                    <div class="col-lg-2 col-md-2 col-sm-2">
                        <button class="who-to-follow-btn">Follow</button>
                    </div>
                </div>    
            </div>
        </div>
    </div>

    <div class="container col-lg-4 right-side-nav">
        <div class="row">
            <div class="input-group col-sm-10 col-sm-offset-1">
                <form class="search-form" action="#" method="#" role="search">
                    <input class="form-control" placeholder="Search Twitter" name="srch-term" id="ed-srch-term" type="text">
                    <button type="submit"><i class="fa fa-search"></i></button>   
                </form>
            </div>
        </div>
        <!-- <div class="row">
            <form method = "#" action="#" class = "pull-down  navbar-search">
                <div class="input-append">
                    <input class="search-query input-medium"  name="search_query" type="text" placeholder="Arama Yap" >
                    <button type = "submit "class="btn btn-large" type="button"><i class="icon-search"></i></button>
                </div>
            </form>
        </div> -->
        <div class="card right-side-nav-2">
            <div class="card-body">
                <h5 class="card-title">You might like</h5>
                <div class="row right-side-nav-2-content">
                    <div class="col-lg-2 right-nav-content-img">
                        <a href="#">
                            <img src="https://pbs.twimg.com/profile_images/738007813398532097/oX5g8no8_400x400.jpg" alt="" title="">        
                        </a>
                    </div>
                    <div class="col-lg-7 col-md-7 col-sm-7 right-side-nav-middle">
                        <a href="#">H Fisk Johnson, Ph.</a>
                        <p>@H Johnson</p>
                    </div>
                    <div class="col-lg-2 col-md-2 col-sm-2">
                        <button class="right-nav-content-follow-btn">Follow</button>
                    </div>
                </div>
                <div class="row right-side-nav-2-content">
                    <div class="col-lg-2 right-nav-content-img">
                        <a href="#">
                            <img src="https://pbs.twimg.com/profile_images/738007813398532097/oX5g8no8_400x400.jpg" alt="" title="">        
                        </a>
                    </div>
                    <div class="col-lg-7 col-md-7 col-sm-7 right-side-nav-middle">
                        <a href="#">H Fisk Johnson, Ph.</a>
                        <p>@H Johnson</p>
    
                    </div>
                    <div class="col-lg-2 col-md-2 col-sm-2">
                        <button class="right-nav-content-follow-btn">Follow</button>
                    </div>
                </div>
                
            </div>
        </div>
    </div>
  `
})
export class ProfileComponent implements OnInit {
  user: IUser = {
    userhandle: "",
    email: "",
    password: "",
    name: "",
    dob: ""
  };
  tweets: ITweet[] = [];
  follow: boolean;
  currentUser: IJwtPayload = ParseJwt.parseJwt();
  redirectedUser: string;

  constructor(
    private searchService: SearchService,
    private followService: FollowService,
    private feedService: FeedService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    console.log("Inside ngOnInit");
    this.route.params
      .pipe(
        switchMap(params => {
          if (!params.userhandle) {
              this.router.navigate(['/profile/'+this.currentUser.userhandle]);
          }
          this.redirectedUser = params.userhandle;
          return this.searchService.searchUser(params.userhandle);
        })
      )
      .subscribe((response: HttpResponse<IUser>) => (this.user = response.body["payload.user"]));

      this.followService.getRelation({
        userhandle: this.currentUser.userhandle,
        followerhandle: this.redirectedUser
      })
      .subscribe((response: HttpResponse<IFollower>) => {
        console.log(response.body, response.body["payload.isRelation"]);
        this.follow = response.body["payload.isRelation"];
      });

      this.feedService.showTweets(this.redirectedUser).subscribe((res: HttpResponse<ITweet[]>) => {
        console.log(res.body);
        this.tweets = res.body['payload.tweets'];
    });

  }

  handleFollow(): void {
    console.log("Inside handleFollow");
    this.followService
      .follower({
        followerhandle: this.currentUser.userhandle,
        userhandle: this.redirectedUser
      })
      .subscribe((res: HttpResponse<IFollower>) => {
        console.log(res);
      });

    console.log(this.follow);
    this.toggleFollow();
    // if(this.follow){
    // this.follow = !this.follow;
  }

  handleUnfollow(): void {
    this.followService
      .unfollow({
        userId: this.redirectedUser,
        followerId: this.currentUser.userhandle
      })
      .subscribe((res: HttpResponse<IUnfollow>) => {
        console.log(res);
      });

    this.toggleFollow();
    // this.follow = !this.follow;
  }

  // ngOnChanges(changes: SimpleChanges){
  //     console.log('Inside ngOnChanges');
  //     this.route.params.pipe(switchMap((params) => this.followService.getRelation({'userId': this.currentUser.userhandle, 'followerId': params.id}))).subscribe((response: HttpResponse<IFollower>) => {console.log(response.body); this.follow = response.body? true: false;});

  //     if(changes.follow){
  //         this.follow = !changes.follow.currentValue;
  //     }
  // }

  toggleFollow() {
    this.follow = !this.follow;
  }

  // ngOnInit(): void{
  //     // this.route.data.subscribe((data: User) => {
  //     //     this.user = data;
  //     //     console.log(data, 'data', this.user, 'user');
  //     // });

  // }
}
