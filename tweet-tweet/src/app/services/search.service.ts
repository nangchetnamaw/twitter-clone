import { HttpClient, HttpResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../models/user.interface';
import { Observable } from 'rxjs';

const SEARCH_API = 'http://localhost:3000/api/search';

@Injectable({
    providedIn: 'root'
})
export class SearchService{
    headers: HttpHeaders = new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': localStorage.getItem('Authorization')
    });
    headerOptions = {
        header: this.headers
    }
    constructor(private http: HttpClient){}

    searchUser(user: String): Observable<HttpResponse<User>>{
        return this.http.post<User>(SEARCH_API, { userhandle: user }, {...this.headerOptions, observe: 'response'});
    }
}
