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
  isVisible: Boolean = true;
  isVisible2:Boolean =true;
  isStep1: Boolean = true;
  isStep3: Boolean= false;
  isFilled: Boolean =false;
  user: IUser;
  message: String;
  constructor(private userService: UserService, private router: Router) { }

  ngOnInit() {}
  next(inputObj: IUser){
    if(inputObj.name!='' || inputObj.userhandle!=''|| inputObj.email!='' || inputObj.password!=''){
      this.isStep1=false;
      this.isStep3=true;
    }
  } 
  back(){
    this.isStep1=true;
    this.isStep3=false;
  }
  submitHandler(inputObj: IUser){
    this.isStep1=true;
    this.isStep3=false;
    if(inputObj.name=='' || inputObj.userhandle==''|| inputObj.email=='' || inputObj.password==''){
      this.isFilled = false;
      console.log(this.isFilled)
    }
    else {
      this.isFilled=true;
   }
  }
  submitHandler2(inputObj: IUser): void{
    if(inputObj.name!=''&& inputObj.userhandle!=''&& inputObj.email!='' && inputObj.password!=''){
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
        }, 8000); 
        this.message = error.error.error 
      });
   }
  }
}
