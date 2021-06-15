import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserInfoService {

  constructor(private http: HttpClient) { }

  getUserInfo(UserId:any) {
    console.log("user: "+UserId)
    return this.http.get('http://localhost:8080/profile/'+UserId);
  }

  updateUserInfo(obj:any) {
    console.log("saveUserInfo: "+JSON.stringify(obj));
    return this.http.put('http://localhost:8080/user/info', obj, {responseType: 'text'});
  }

  updateUserCredential(obj:any) {
    console.log("saveUserInfo: "+JSON.stringify(obj));
    return this.http.put('http://localhost:8080/user/credential', obj, {responseType: 'text'});
  }

  updateUserSubscription(obj:any) {
    console.log("saveUserInfo: "+JSON.stringify(obj));
    return this.http.put('http://localhost:8080/user/plan', obj, {responseType: 'text'});
  }

}
