import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders, HttpResponse, HttpParams } from '@angular/common/http';
import { ITweet } from '../models/tweet.interface';

const TWEET_API: string = 'http://localhost:3000/api/tweet';

@Injectable({
    providedIn: 'root'
})
export class TweetService{
    headers: HttpHeaders = new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': localStorage.getItem('Authorization')
    });
    httpOptions = {
        headers: this.headers
    };

    constructor(private http: HttpClient){};

    createTweet(tweet: ITweet): Observable<HttpResponse<ITweet>>{
        console.log(tweet);
        // tweet = {
        //     user: {

        //     },
        //     data: Date.now().toString()
        // }
        return this.http.post<ITweet>(`${TWEET_API}`, tweet, { ...this.httpOptions, observe: "response" });
    }

    getTweet(id: string): Observable<HttpResponse<ITweet[]>>{
        const params = new HttpParams()
        .set('id', id);

        return this.http.get<ITweet[]>('http://localhost:3000/api/feed', { ...this.httpOptions, observe: 'response', params });
    }
}