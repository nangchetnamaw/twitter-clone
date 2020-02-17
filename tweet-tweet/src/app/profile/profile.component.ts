import { Component } from '@angular/core';

@Component({
    selector: 'app-profile',
    styleUrls: ['./profile.component.scss'],
    template: `
        <div class="container col-sm-6 col-sm-offset-2" style="border: 1px solid #d3d6db;">
        <div class="row" style="border: 1px solid gray; height: 53px; ">
            <div class="col-sm-1">
                <i class="fas fa-arrow-left" style="align-items: center;"></i>
            </div>
            <div class="col-sm-11">
                <h4 style="line-height: 1.3125; font-weight: 800;margin-top: 3px; ">Himanshu Kumar</h4>
                <p style="font-size: 13px;line-height: 1;font-weight: 400;margin-top: -6px; ">0 Tweets</p>
            </div>
        </div>
        <div>
            <div class="profile-block col-sm-12">
                <div class="profile-block-thumb cover-container">
                    <a href="#">
                        <img src="https://pbs.twimg.com/profile_banners/738006188239921152/1581790348/1500x500" alt="" title="">        
                    </a>
                </div>
                <div class="profile-img">
                    <a href="#">
                        <img src="https://pbs.twimg.com/profile_images/738007813398532097/oX5g8no8_400x400.jpg" alt="" title="">        
                    </a>
                </div>
                
                <div class="profile-block-menu">
                    <div class="block-menu">
                        <button class="tweet-main-btn">Edit Profile</button>
                    </div>
                </div>
            </div>
        </div> 
        <div class="col-sm-12 profile-description-menu">
                <h4 style="line-height: 1.3125; font-weight: 800;margin-top: 3px; ">Himanshu Kumar</h4>
                <p style="font-size: 13px;line-height: 1;font-weight: 400;margin-top: -6px; ">@imh0kumar</p>
                <p style="font-size: 15px;line-height: 1.3125;font-weight: 400;margin-top: -6px; ">Comedy and Humour Entertainment Music Sports</p>
                <p style="font-size: 15px;line-height: 1.3125;font-weight: 400;margin-top: -6px; ">Born July 15, 1997<span><i class="fas fa-calendar-alt"></i>Joined June 2016</span></p>
                <span><a href="#">0 followers</a><a href="#">0 following</a></span>
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
        <div class="row">
            <div class="col-sm-8 col-sm-offset-2">
                <form action="#" method="#" role="search">
                    <div class="input-group">
                        <input class="form-control" placeholder="Search Twitter" name="srch-term" id="ed-srch-term" type="text">
                    </div>
                </form>
            </div>
        </div>
        <div class="card right-side-nav-2">
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
                        <button class="tweet-main-btn">Follow</button>
                    </div>
                </div>
                
                
            </div>
        </div>
    </div>
    `
})
export class ProfileComponent{
    
}