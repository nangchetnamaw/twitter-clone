import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { IUser } from '../models/user.interface';
import { Login } from '../models/login.interface';
import { tap, catchError } from 'rxjs/operators';

const USER_DOMAIN: string = 'http://localhost:3000';


@Injectable({
    providedIn: 'root'
})
export class UserService {
    headers: HttpHeaders = new HttpHeaders({
        'Content-Type': 'application/json'
    });

    header_token: HttpHeaders = new HttpHeaders().set("Authentication", localStorage.getItem("Authentication"));
    
    httpOptions = {
        headers: this.headers
    };

    constructor(private http: HttpClient){}

    private log(message: string) {
        console.log(message);
    }

    createUser(user: IUser): Observable<HttpResponse<any>>{
        console.log(user);
        return this.http.post<any>(`${USER_DOMAIN}/signup`, user, { ...this.httpOptions, observe: 'response' });
    }   

    loginUser(user: Login): Observable<HttpResponse<any>>{
        console.log(user);
        return this.http.post<any>(`${USER_DOMAIN}/login`, user, { ...this.httpOptions, observe: 'response' });
    }

    searchUser(name:string): Observable<any>{
        return this.http.get("http://localhost:3000/user/"+name, {headers: this.header_token, observe: "response"}).pipe(
            tap(_ => this.log("showing details")),
            catchError(this.handleError<any>('error in details')
        ));
    }

    private handleError<T> (operation = 'operation', result?: T) {
        return (error: any): Observable<T> => {
      
            // TODO: send the error to remote logging infrastructure
            console.error(error.status); // log to console instead
      
            // TODO: better job of transforming error for user consumption
            // this.log(`${operation} failed: ${error.message}`);
      
            // Let the app keep running by returning an empty result.
            return of(error as T);
        };
    }
    
    userDetails(_id:string): Observable<HttpResponse<any>>{
        console.log(_id);
        return this.http.get<any>(`${USER_DOMAIN}/profile/${_id}`, {...this.httpOptions, observe:'response'});
    }

}