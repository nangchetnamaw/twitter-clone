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
import { User } from "../models/user.interface";
import { HttpResponse } from "@angular/common/http";
import { FollowService } from "../services/follow.service";
import { IFollower, IUnfollow } from "../models/follow.interface";

@Component({
  selector: "app-profile",
  styleUrls: ["./profile.component.scss"],
  template: `
    <div
      class="container col-sm-6 col-sm-offset-2"
      style="border: 1px solid #d3d6db;"
    >
      <div class="row" style="border: 1px solid gray; height: 53px; ">
        <div class="col-sm-1">
          <i class="fas fa-arrow-left" style="align-items: center;"></i>
        </div>
        <div class="col-sm-11">
          <h4 style="line-height: 1.3125; font-weight: 800;margin-top: 3px; ">
            {{ user?.name }}
          </h4>
          <p
            style="font-size: 13px;line-height: 1;font-weight: 400;margin-top: -6px; "
          >
            {{ user?.tweetCount }} Tweets
          </p>
        </div>
      </div>
      <div>
        <div class="profile-block col-sm-12">
          <div class="profile-block-thumb cover-container">
            <a href="#">
              <img src="#" alt="" title="" />
            </a>
          </div>
          <div class="profile-img">
            <a href="#">
              <img src="#" alt="" title="" />
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
        <h4 style="line-height: 1.3125; font-weight: 800;margin-top: 3px; ">
          {{ user?.name }}
        </h4>
        <p
          style="font-size: 13px;line-height: 1;font-weight: 400;margin-top: -6px; "
        >
          @{{ user?.userhandle }}
        </p>
        <p
          style="font-size: 15px;line-height: 1.3125;font-weight: 400;margin-top: -6px; "
        >
          Comedy and Humour Entertainment Music Sports
        </p>
        <p
          style="font-size: 15px;line-height: 1.3125;font-weight: 400;margin-top: -6px; "
        >
          Born {{ user?.dob | date: "shortDate"
          }}<span
            ><i class="fas fa-calendar-alt"></i>Joined
            {{ user?.joined | date: "shortDate" }}</span
          >
        </p>
        <span
          ><a href="#">{{ user?.followerCount }} followers</a
          ><a href="#">{{ user?.followingCount }} following</a></span
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
    </div>
    <div class="container col-lg-4 right-side-nav">
      <!-- <div class="row">
            <div class="col-sm-8 col-sm-offset-2">
                <form action="#" method="#" role="search">
                    <div class="input-group">
                        <input class="form-control" placeholder="Search Twitter" name="srch-term" id="ed-srch-term" type="text">
                    </div>
                </form>
            </div>
        </div> -->
      <app-search></app-search>
      <!-- <div class="card right-side-nav-2">
            <div class="card-body right-side-nav-2-title">
                <h5 class="card-title">You might like</h5>
                <div>
                    <div class="col-lg-2 profile-img-2">
                        <a href="#">
                            <img src="https://pbs.twimg.com/profile_images/738007813398532097/oX5g8no8_400x400.jpg" alt="" title="">        
                        </a>
                    </div>
                    <div class="col-lg-8" style="padding-left: 40px;">
                        <a href="#">H Fisk Johnson, Ph.</a>
                        <p>@H Johnson</p>
    
                    </div>
                    <div class="col-lg-2">
                        <div *ngIf="follow">
                            <button class="tweet-main-btn" (click)="handleFollow()">Follow</button>
                        </div>
                        <div *ngIf="!follow">
                            <button class="tweet-main-btn">Unfollow</button>
                        </div>
                    </div>
                </div>
            </div>
        </div> -->
    </div>
  `
})
export class ProfileComponent implements OnInit {
  user: User = null;

  @Input()
  follow: boolean = false;

  currentUser: User = this.parseJwt(
    window.localStorage.getItem("Authorization")
  );
  redirectedUser: string;

  private parseJwt(token) {
    var base64Url = token.split(".")[1];
    var base64 = base64Url.replace("-", "+").replace("_", "/");
    return JSON.parse(window.atob(base64));
  }

  constructor(
    private searchService: SearchService,
    private followService: FollowService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    console.log("Inside ngOnInit");
    this.route.params
      .pipe(
        switchMap(params => {
          if (!params.id) {
              this.router.navigate(['/profile/'+this.currentUser.userhandle]);
          }
          this.redirectedUser = params.id;
          return this.searchService.searchUser(params.id);
        })
      )
      .subscribe((response: HttpResponse<User>) => (this.user = response.body));

    this.route.params
      .pipe(
        switchMap(params =>
          this.followService.getRelation({
            userId: this.currentUser.userhandle,
            followerId: params.id
          })
        )
      )
      .subscribe((response: HttpResponse<IFollower>) => {
        console.log(response.body);
        this.follow = response.body ? true : false;
      });
  }

  handleFollow(): void {
    console.log("Inside handleFollow");
    this.followService
      .follower({
        followerId: this.currentUser.userhandle,
        userId: this.redirectedUser
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
