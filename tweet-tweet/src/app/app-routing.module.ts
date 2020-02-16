import { WelcomePageComponent } from './welcome-page/welcome-page.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginPageComponent } from './login-page/login-page.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { HomeComponent } from './home/containers/home.component';

const routes: Routes = [
  {path: "", component: WelcomePageComponent, pathMatch: 'full'},
  { path: 'login', component: LoginPageComponent },
  { path: 'signup', component: SignUpComponent },
  { path: 'home', component: HomeComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
