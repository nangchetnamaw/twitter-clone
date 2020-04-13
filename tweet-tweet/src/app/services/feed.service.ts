import { tap, catchError } from 'rxjs/operators';
import { HttpClient, HttpHeaders, HttpResponse, HttpParams } from '@angular/common/http';
import { Observable, of } from 'rxjs';
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

    header_token: HttpHeaders = new HttpHeaders().set("Authentication", localStorage.getItem("Authentication"));

    httpOptions = {
        headers: this.headers
    };

    private log(message: string) {
        console.log(message);
    }

    constructor(private http: HttpClient){}

    showTweets(): Observable<any> {
        return this.http.get("http://localhost:3000/tweet", {headers: this.header_token, observe: "response"}).pipe(
            tap(_ => this.log("Showing Details")),
            catchError(this.handleError<any>('Error Occured'))
        );
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
}