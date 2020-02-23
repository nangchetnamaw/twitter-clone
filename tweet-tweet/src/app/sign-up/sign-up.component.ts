import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { IUser } from '../models/user.interface';
import { Router } from '@angular/router';
import { HttpResponse } from '@angular/common/http';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {
  isDisabled: Boolean = false;
  user: IUser;
  message: String;
  constructor(private userService: UserService, private router: Router) { }

  ngOnInit() {}
  submitHandler(inputObj: IUser): void{
    this.userService.createUser(inputObj).subscribe((response: HttpResponse<any>) => {
      // const token = response.headers.get('x-auth-token');
      this.message = response.body['message'];
      console.log(this.message);

      window.localStorage.setItem('Authorization', `Bearer ${response.body.payload['x-auth-token']}`);
      // this.userService.headers.set('Authorization', `Bearer ${token}`);
      this.router.navigate(['/home']);
    }, (error) => {
      setTimeout(() => {
        this.message = null;
      }, 3000); 
      this.message = error.error.error 
    });
  }

}
