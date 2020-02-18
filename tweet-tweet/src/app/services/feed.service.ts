import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { ITweet } from '../models/tweet.interface';

// const FEED_API = 'http://localhost:3000/api/feed';

@Injectable({
    providedIn: 'root'
})
export class FeedService{
    headers: HttpHeaders = new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': localStorage.getItem('Authorization')
    });
    httpOptions = {
        headers: this.headers
    };
    constructor(private http: HttpClient){}

    // showTweets(): Observable<HttpResponse<ITweet[]>>{
    //     return this.http.get<ITweet[]>(FEED_API, {...this.headers, observe: 'response'})
    // }
}