import { ProfileComponent } from './profile/profile.component';
import { SideNavComponent } from './side-nav/side-nav.component';
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
import { EditProfileComponent } from './edit-profile/edit-profile.component';

const routes: Routes = [
  { path: "welcome", component: WelcomePageComponent},
  { path: "login", component: LoginPageComponent },
  { path: "signup", component: SignUpComponent },
  { path: "", component: SideNavComponent, children: [
    {
      path: "", redirectTo: "home", pathMatch: "full"
    },
    {
      path: "home", component: HomeComponent
    },
    {
      path: "profile", component: ProfileComponent
    }
  ]},
  { path: 'create', component: CreatePostComponent},
  { path: 'modal', component: EditProfileComponent}
  // { path: 'profile',
  //   children: [
  //     {
  //       path: '', component: MyprofileComponent, pathMatch: 'full'
  //     },
  //     {
  //       path: ':userhandle', component: MyprofileComponent
  //     }
  //   ]
  // } 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
