import { Component } from '@angular/core';
import { Login } from '../models/login.interface';
import { UserService } from '../services/user.service';
import { FeedService } from '../services/feed.service';
import { Router } from '@angular/router';
import { HttpResponse } from '@angular/common/http';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent{
  isDisabled: Boolean = true;
  message: String;

  constructor(private userService: UserService, private feedService: FeedService, private router: Router) { }

  // toggleDisabled(eventEmail, eventPassword):void{
  //   if(eventEmail.value.trim().length !== 0 && eventPassword.value.trim().length !== 0){
  //     this.isDisabled = false;
  //   }
  // }

  loginHandler(loginObj: Login): void{
    this.userService.loginUser(loginObj).subscribe((response: HttpResponse<any>) => {
      window.localStorage.setItem('Authorization', `Bearer ${response.body.payload['x-auth-token']}`);
      console.log(response.body);
      this.router.navigate(['/home']);
    }, (error) => {
      setTimeout(() => {
        this.message = null;
      }, 3000); 
      this.message = error.error.error 
    });
  }
}
