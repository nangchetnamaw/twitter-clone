import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

import { IUser } from '../models/user.interface';
import { Login } from '../models/login.interface';

const USER_DOMAIN: string = 'http://localhost:3000/api/user';


@Injectable({
    providedIn: 'root'
})
export class UserService {
    headers: HttpHeaders = new HttpHeaders({
        'Content-Type': 'application/json'
    });
    httpOptions = {
        headers: this.headers
    };
    
    constructor(private http: HttpClient){}

    createUser(user: IUser): Observable<HttpResponse<any>>{
        console.log(user);
        return this.http.post<any>(`${USER_DOMAIN}/signup`, user, { ...this.httpOptions, observe: 'response' });
    }   

    loginUser(user: Login): Observable<HttpResponse<any>>{
        console.log(user);
        return this.http.post<any>(`${USER_DOMAIN}/login`, user, { ...this.httpOptions, observe: 'response' });
    }
}