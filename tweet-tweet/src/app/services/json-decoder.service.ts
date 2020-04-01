import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class JsonDecoderService {

  constructor(private http: HttpClient) { }
 
  private log(message: string) {
    console.log(message);
  }

  header_token: HttpHeaders = new HttpHeaders().set("token", localStorage.getItem("JwtHrms"));

  jsonDecoder = (token) => {
    var base64Url = token.split('.')[1];
    var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    var jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
      return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));
    return JSON.parse(jsonPayload);
  };
}