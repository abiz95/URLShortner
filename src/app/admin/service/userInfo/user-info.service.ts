import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { apiPath } from 'src/app/app.enums';
import { RemoteDataService } from 'src/app/services/remoteDataService/remote-data.service';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserInfoService {

  constructor(private http: HttpClient, private remoteDataService: RemoteDataService) { }

  getUserInfo(UserId:any) {
    console.log("user: "+UserId)
    return this.http.get('http://localhost:8080/profile/'+UserId);
  }

  getProfilePictureInfo(UserId:any) {
    console.log("user: "+UserId)
    return this.http.get('http://localhost:8080/user/profile/'+UserId);
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

  getProfilePicture(UserId:any): Observable<Blob> {
    console.log("user: "+UserId)
    // const href = `${environment.apiUrl}${apiPath.user}`+'/profile/image/' + UserId;
    // return this.remoteDataService.getData(href);
    return this.http.get('http://localhost:8080/user/profile/image/' + UserId, { responseType: 'blob' });
  }

  getAllProfilePicture(UserId:any) {
    console.log("user: "+UserId)
    // const href = `${environment.apiUrl}${apiPath.user}`+'/profile/image/' + UserId;
    // return this.remoteDataService.getData(href);
    return this.http.get('http://localhost:8080/user/profile/all/image/' + UserId);
  }

}
