import { Component} from '@angular/core';
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
  isFilled: Boolean =false;

  constructor(private userService: UserService, private feedService: FeedService, private router: Router) { }
  
  loginHandler(loginObj: Login): void{
    if(loginObj.email=='' || loginObj.password==''){
      this.isFilled = false;
    }
    else {
      this.isFilled=true;
   }
 }
 loginHandler2(loginObj: Login){
   if(loginObj.email!='' && loginObj.password!=''){
    this.userService.loginUser(loginObj).subscribe((response: HttpResponse<any>) => {
      window.localStorage.setItem('Authorization', `Bearer ${response.body.payload['x-auth-token']}`);
      this.message = response.body['message'];
      this.router.navigate(['/home']);
    }, (error) => {
      setTimeout(() => {
        this.message = null;
      }, 8000); 
      this.message = "The username and password you entered did not match our records. Please double-check and try again." 
    });
  }
 }
}
