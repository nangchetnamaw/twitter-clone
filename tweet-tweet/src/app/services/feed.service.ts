import { HttpClient, HttpHeaders, HttpResponse, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { ITweet } from '../models/tweet.interface';

const FEED_API = 'http://localhost:3000/api/tweet';

@Injectable({
    providedIn: 'root'
})
export class FeedService{
    headers: HttpHeaders = new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: localStorage.getItem("Authorization")
    });
    httpOptions = {
        headers: this.headers
    };
    constructor(private http: HttpClient){}

    showTweets(userhandle: string): Observable<HttpResponse<any>>{
        const params = new HttpParams()
        .set('userhandle', userhandle);

        return this.http.get<any>(FEED_API, { ...this.httpOptions, observe: 'response', params });
    }

    showFeed(): Observable<HttpResponse<any>>{
        return this.http.get<any>(FEED_API + '/feed', this.httpOptions);
    }
}