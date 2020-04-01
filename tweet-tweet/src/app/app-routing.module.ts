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
import { ProfileComponent } from './profile/profile.component';

const routes: Routes = [
  { path: "", component: WelcomePageComponent},
  { path: 'login', component: LoginPageComponent },
  { path: 'signup', component: SignUpComponent },
  { path: 'home', component: HomeComponent },
  { path: 'create', component: CreatePostComponent},
  { path: 'profile', component: MyprofileComponent},
  { path: 'profile',
    children: [
      {
        path: '', component: ProfileComponent, pathMatch: 'full'
      },
      {
        path: ':userhandle', component: ProfileComponent
      }
    ]
  },
  {path: "trends", component: TrendsComponent},
  {path:"feed", component:FeedComponent},
 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
