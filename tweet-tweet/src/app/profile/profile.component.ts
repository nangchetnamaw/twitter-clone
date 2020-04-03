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
import { ITweet } from "../models/tweet.interface";
import ParseJwt from "../utils/parsejwt";

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
          <h4>{{ user.name }}</h4>
          <p>{{ tweetCount }} Tweets</p>
        </div>
      </div>
      <div class="row">
        <div class="row profile-block col-sm-12 col-lg-12 col-md-12">
          <div class="row profile-block-thumb cover-container">
            <a href="#">
              <img
                src="https://pbs.twimg.com/profile_banners/738006188239921152/1581790348/1500x500"
                alt=""
                title=""
              />
            </a>
          </div>
          <div class="profile-img">
            <a href="#">
              <img
                src="https://pbs.twimg.com/profile_images/738007813398532097/oX5g8no8_400x400.jpg"
                alt=""
                title=""
              />
            </a>
          </div>

          <div class="profile-block-menu">
            <div class="block-menu">
              <button
                class="tweet-main-btn"
                *ngIf="user?.userhandle === currentUser?.userhandle"
              >
                Edit Profile
              </button>
              <div *ngIf="user?.userhandle !== currentUser?.userhandle">
                <div *ngIf="!follow">
                  <button class="tweet-main-btn" (click)="handleFollow()">
                    Follow
                  </button>
                </div>
                <div *ngIf="follow">
                  <button class="tweet-main-btn" (click)="handleUnfollow()">
                    Unfollow
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="col-sm-12 profile-description-menu">
        <h4>{{ user.name }}</h4>
        <p>{{ user.userhandle }}</p>
        <p>Comedy and Humour Entertainment Music Sports</p>
        <p>
          Born {{ user.dob | date }}
          <span
            ><i class="fa fa-calendar" aria-hidden="true"></i> Joined
            {{ user.joined | date }}</span
          >
        </p>
        <span
          ><a href="#"
            ><span id="following-number">{{ user.count.followingCount }} </span
            ><span> Following</span></a
          >
          <a href="#"
            ><span id="followers-number">{{ user.count.followerCount }} </span
            ><span> Followers</span></a
          ></span
        >
      </div>
      <div class="block-menu col-sm-12">
        <ul>
          <li><a href="#">Tweets</a></li>
          <li><a href="#">Tweets & Replies</a></li>
          <li><a href="#">Media</a></li>
          <li><a href="#">Likes</a></li>
        </ul>
      </div>
      <div class="container col-lg-4 right-side-nav">
        <app-search></app-search>
        <div *ngFor="let tweet of tweets">
        <app-post [user]="tweet.user" [text]="tweet.content.text" [likeCount]="tweet.count.likeCount" [commentCount]="tweet.count.replyCount"></app-post>
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
    dob: "",
    count: {
      followerCount: 0,
      followingCount: 0,
      tweetCount:0
    }
  };
  tweets: ITweet[] = [];
  tweetCount: number = 0;
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
            this.router.navigate(["/profile/" + this.currentUser.userhandle]);
          }
          this.redirectedUser = params.userhandle;
          return this.searchService.searchUser(params.userhandle);
        })
      )
      .subscribe(
        (response: any) =>{
            console.log(response);
            return (this.user = response.body.payload.user)
        }
      );

    this.followService
      .getRelation({
        userhandle: this.currentUser.userhandle,
        followerhandle: this.redirectedUser
      })
      .subscribe((response: HttpResponse<any>) => {
        console.log(response.body, response.body.payload.isRelation);
        this.follow = response.body.payload.isRelation;
      });

    this.feedService
      .showTweets(this.redirectedUser)
      .subscribe((res: HttpResponse<any>) => {
        console.log(res.body);
        this.tweets = res.body.payload.tweets;
        this.tweetCount = res.body.payload.tweetCount;
      });
  }

  handleFollow(): void {
    console.log("Inside handleFollow");
    this.followService
      .follow({
        followerhandle: this.currentUser.userhandle,
        userhandle: this.redirectedUser
      }, true)
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
      .follow({
        userhandle: this.redirectedUser,
        followerhandle: this.currentUser.userhandle
      }, false)
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
