import { Component } from '@angular/core';
import { Login } from '../models/login.interface';
import { UserService } from '../services/user.service';
import { Router } from '@angular/router';
import { HttpResponse } from '@angular/common/http';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent{
  isDisabled: Boolean = true;

  constructor(private userService: UserService, private router: Router) { }

  // toggleDisabled(eventEmail, eventPassword):void{
  //   if(eventEmail.value.trim().length !== 0 && eventPassword.value.trim().length !== 0){
  //     this.isDisabled = false;
  //   }
  // }

  loginHandler(loginObj: Login): void{
    this.userService.loginUser(loginObj).subscribe((response: HttpResponse<Login>) => {
      console.log(response.headers.get('x-auth-token'), response.body);
      // const keys = response.headers.keys();
      // const token = keys.map((cur) => { console.log(response.headers.get(cur)) });
      // console.log(token);
      this.userService.headers.set('Authorization', `Bearer ${response.body['x-auth-token']}`);
      window.localStorage.setItem('Authorization', `Bearer ${response.body['x-auth-token']}`);
      console.log(response.body['x-auth-token'], this.userService.headers.get('Authorization'));
      this.router.navigate(['/home']);
    });
  }
}
