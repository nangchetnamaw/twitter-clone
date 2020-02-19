import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IFollower, IFollowing, IUnfollow } from '../models/follow.interface';

const FOLLOW_API = 'http://localhost:3000/api/';

@Injectable({
    providedIn: 'root'
})
export class FollowService{
    headers: HttpHeaders = new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': localStorage.getItem('Authorization')
    });
    headerOptions = {
        header: this.headers
    }

    constructor(private http: HttpClient){}

    follower(followObj: IFollower): Observable<HttpResponse<IFollower>>{
        return this.http.post<IFollower>(`${FOLLOW_API}follow`, followObj, {...this.headerOptions, observe: 'response'});
    }

    following(followObj: IFollowing): Observable<HttpResponse<IFollowing>>{
        return this.http.post<IFollowing>(`${FOLLOW_API}follow`, followObj, {...this.headerOptions, observe: 'response'});
    }

    unfollow(followObj: IUnfollow): Observable<HttpResponse<IUnfollow>>{
        return this.http.put<IUnfollow>(`${FOLLOW_API}unfollow`, followObj, {...this.headerOptions, observe: 'response'});
    }

    getRelation(followObj: IFollower): Observable<HttpResponse<IFollower>>{
        const params = new HttpParams()
            .set('userId', followObj.userId)
            .set('followerId', followObj.followerId);

        return this.http.get<IFollower>(`${FOLLOW_API}follow`, { ...this.headerOptions, observe: 'response', params });
    }
}