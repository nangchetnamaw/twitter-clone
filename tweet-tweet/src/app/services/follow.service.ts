import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IFollower, IFollowing, IUnfollow } from '../models/follow.interface';

const FOLLOW_API = 'http://localhost:3000';

@Injectable({
    providedIn: 'root'
})
export class FollowService{
    headers: HttpHeaders = new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': localStorage.getItem('Authorization')
    });
    httpOptions = {
        headers: this.headers
    };

    constructor(private http: HttpClient){}

    follow(followObj: any, isFollow: boolean): Observable<HttpResponse<any>>{
        console.log(followObj);
        const params: HttpParams = new HttpParams().set('userhandle', followObj.userhandle).set('followerhandle', followObj.followerhandle);

        return isFollow ? ( this.http.post<any>(`${FOLLOW_API}`, followObj, {...this.httpOptions, observe: 'response'})): ( this.http.delete<any>(`${FOLLOW_API}`, {...this.httpOptions, observe: 'response', params}));
    }

    // following(followObj: IFollowing): Observable<HttpResponse<IFollowing>>{
    //     return this.http.post<IFollowing>(`${FOLLOW_API}follow`, followObj, {...this.httpOptions, observe: 'response'});
    // }

    // unfollow(followObj: IUnfollow): Observable<HttpResponse<IUnfollow>>{
    //     return this.http.put<IUnfollow>(`${FOLLOW_API}unfollow`, followObj, {...this.httpOptions, observe: 'response'});
    // }

    getRelation(followObj: IFollower): Observable<HttpResponse<any>>{
        console.log(followObj);
        const params = new HttpParams()
            .set('userhandle', followObj.userhandle)
            .set('followerhandle', followObj.followerhandle);

        return this.http.post<any>(`${FOLLOW_API}/relation`, followObj, { ...this.httpOptions, observe: 'response', params });
    }
}