import { UserService } from './../services/user.service';
import { FollowService } from "../services/follow.service";
import { Component, OnInit, Injectable } from '@angular/core';
import ParseJwt from "../utils/parsejwt";
import { Profile } from './../models/profile.interface';
import { HttpResponse } from "@angular/common/http";
import { IFollower, IUnfollow } from "../models/follow.interface";
import { IUser, IJwtPayload } from "../models/user.interface";
import { Router, ActivatedRoute, Params } from "@angular/router";

@Component({
  selector: 'app-myprofile',
  templateUrl: './myprofile.component.html',
  styleUrls: ['./myprofile.component.css']
})

@Injectable({
  providedIn: 'root'
})

export class MyprofileComponent implements OnInit {
  user: IUser = {
    userhandle: "",
    email: "",
    password: "",
    bio:"",
    dob:"",
    name: "",
    count: {
      followerCount: 0,
      followingCount: 0,
      tweetCount: 0
    }
  };
  follow: boolean;
  currentUser: IJwtPayload = ParseJwt.parseJwt();
  searchedUser: string;

  
  constructor(
    private userService: UserService,
    private router: Router,
    private followService : FollowService,
    private route: ActivatedRoute
    ) {}
  

  ngOnInit() {
    let currentUserhandle = this.currentUser.userhandle;
    let currentUserId = this.currentUser._id;
    this.loadUserDetails(currentUserId);
    let current_route = this.router.url.split("/");
    let user = current_route[2];
    if(user!=currentUserhandle){
      this.router.navigate(["/profile/" + user]);
      this.searchedUser = user;
      this.loadSearchedUserDetails(this.searchedUser);
      let checkObj={
        userhandle : this.searchedUser,
        followerhandle: this.currentUser.userhandle
      }
      this.checkRelation(checkObj);
    }
   
  }

   checkRelation(checkObj){
     this.followService.getRelation(checkObj).subscribe(res => {
      this.follow = res.body.payload.isRelation;
     })
   }
  

   loadUserDetails(currentUserId){
    this.userService.userDetails(currentUserId).subscribe(res => {
      if(res.status == 200){
        this.user = res.body;
      }
      else if(res.status == 401){
        localStorage.removeItem("token");
        this.router.navigate(['/login']);
      }
    });
   }  

   Profile: Profile[]=[
    {image: '../../assets/Images/my.jpg',images: '../../assets/Images/my.jpg'}
   ];
   }
   
   editProfileModal(){
     this.router.navigate(['/editprofile']);
   }

   loadSearchedUserDetails(searchedUser){
    this.userService.searchedUserDetails(searchedUser).subscribe(res => {
      if(res.status == 200){
        this.user = res.body;
      }
      else if(res.status == 401){
        localStorage.removeItem("token");
        this.router.navigate(['/login']);
      }
    });
   }
   
   handleFollow(): void {
    this.followService.follow({
        followerhandle: this.currentUser.userhandle,
        userhandle: this.searchedUser
      }, true)
      .subscribe((res: HttpResponse<IFollower>) => {
        console.log(res);
      });

    this.toggleFollow();
  }

  handleUnfollow(): void {
    debugger
    this.followService.unfollow({
        userhandle: this.searchedUser,
        followerhandle: this.currentUser.userhandle
      })
      .subscribe((res: HttpResponse<IUnfollow>) => {
        console.log(res);
      });

    this.toggleFollow();
  }

  toggleFollow() {
    this.follow = !this.follow;
  }

}
