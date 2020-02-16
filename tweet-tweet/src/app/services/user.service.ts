import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse, HttpHeaders, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';

import { User } from '../models/user.interface';

const USER_DOMAIN: string = 'http://localhost:3000/api/';

const httpOptions = {
    headers: new HttpHeaders({
        'Content-Type': 'application/json'
    })    
};

@Injectable({
    providedIn: 'root'
})
export class UserService{
    constructor(private http: HttpClient){}

    createUser(user: User): Observable<HttpResponse<User>>{
        console.log(user);
        return this.http.post<User>(`${USER_DOMAIN}signup`, user, { ...httpOptions, observe: "response" });
    }   
}