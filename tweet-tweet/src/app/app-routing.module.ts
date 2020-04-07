import { FollowersFollowingComponent } from './followers-following/followers-following.component';
import { EditProfileComponent } from './myprofile/edit-profile/edit-profile.component';
import { ComingSoonComponent } from './coming-soon/coming-soon.component';
import { MyprofileComponent } from './myprofile/myprofile.component';
import { FeedComponent } from './feed/feed.component';
import { CreatePostComponent } from './create-post/create-post.component';
import { TrendsComponent } from './trends/trends.component';
import { WelcomePageComponent } from './welcome-page/welcome-page.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginPageComponent } from './login-page/login-page.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { HomeComponent } from './home/containers/home.component';
import{ExploreComponent} from './explore/explore.component'
const routes: Routes = [
  { path: "", component: WelcomePageComponent},
  { path: 'comingsoon', component: ComingSoonComponent },
  { path: 'login', component: LoginPageComponent },
  { path: 'signup', component: SignUpComponent },
  { path: 'home', component: HomeComponent },
  { path: 'create', component: CreatePostComponent},
  { path: 'modal', component :EditProfileComponent},
  //{ path: 'profile', component: MyprofileComponent},
  // { path: 'editprofile', component :EditProfileComponent},
  { path: 'profile',
    children: [
      {
        path: ':userhandle', component: MyprofileComponent, 
      },
      {
        path: ':userhandle',
        children: [
          {
            path: ':followers', component: FollowersFollowingComponent
          }
        ]
      }
    ]
  },
  {path: "trends", component: TrendsComponent},
  {path:"feed", component:FeedComponent},
   {path:"explore",component:ExploreComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
