import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { User } from '../models/user.interface';
import { Router } from '@angular/router';
import { HttpResponse } from '@angular/common/http';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {
  isDisabled: Boolean = false;
  user: User;
  constructor(private userService: UserService, private router: Router) { }

  ngOnInit() {}

  toggleDisabled(eventName, eventPhone, eventDOB, eventUsername, eventEmail, eventPassword):void{
    // if(eventName.value.trim().length !== 0 && eventDOB.value.trim().length !== 0 && eventPhone.value.trim().length !== 0 && eventUsername.value.trim().length !== 0 && eventEmail.value.trim().length !== 0 && eventPassword.value.trim().length !== 0 ){
    //   this.isDisabled = false;
    // }
    this.user.name = eventName;
  }

  submitHandler(inputObj: User): void{
    this.userService.createUser(inputObj).subscribe((response: HttpResponse<User>) => {
      const token = response.headers.get('x-auth-token');
      this.userService.headers.set('Authorization', `Bearer ${token}`);
      this.router.navigate(['/home']);
    });
  }

}
