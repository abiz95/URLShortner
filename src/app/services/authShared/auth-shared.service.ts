import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { RemoteDataService } from '../remoteDataService/remote-data.service';

@Injectable({
  providedIn: 'root'
})
export class AuthSharedService {

  constructor(private router: Router, private remoteDataService: RemoteDataService) { }

  getSessionUserId() {
    // let user = sessionStorage.getItem('userId');
    // console.log("logged user: ", user)
    // return user;
    let token = localStorage.getItem('token');
    let decodedJwtData = JSON.parse(window.atob(token.split('.')[1]));
    console.log('decodedJwtJsonData: ' + decodedJwtData)
    console.log("user Id: ", decodedJwtData.userId);
    return decodedJwtData.userId;
  }

  getLoggedInToken() {
    let token = localStorage.getItem('token');
    console.log("logged user: ", token)
    return token
  }

  error() {
    this.router.navigate(['**'])
  }

  logout() {
    localStorage.removeItem('token');
    // sessionStorage.removeItem('userId');
    this.router.navigate(['access/signout'])
  }

  isUserLoggedIn() {
    let user = localStorage.getItem('token');
    console.log("logged user: ", user)
    return !(user === null)
  }

  userLoginStatus() : boolean {
    if (this.isUserLoggedIn()) {
      return true;
    } else {
      return false;
    }
  }

  tokenSetup(res: any) {

    localStorage.removeItem('token');
    // sessionStorage.removeItem('userId');
    console.log("token value: ", res);
    localStorage.setItem('token', res);
    let jwtData = res.split('.')[1];
    let decodedJwtJsonData = window.atob(jwtData);
    let decodedJwtData = JSON.parse(decodedJwtJsonData);
    console.log('decodedJwtJsonData: ' + decodedJwtJsonData)
    console.log("user Id: ", decodedJwtData.userId);
    // sessionStorage.setItem('userId', decodedJwtData.userId);
  }

  generateRefreshToken(token:any) {
    console.log("old token: "+token);
    const href = `${environment.apiUrl}`+'/refreshtoken/'+token;
    const refreshToken = this.remoteDataService.getData(href);
    this.tokenSetup(refreshToken);
    // return this.http.post(`${apiPath.general}`+'/saveUrl', obj, {responseType: 'text'})
  }


  // getUserId() {
  //   let token = sessionStorage.getItem('token');
  //   let decodedJwtData = JSON.parse(window.atob(token.split('.')[1]));
  //   console.log('decodedJwtJsonData: ' + decodedJwtData)
  //   console.log("user Id: ", decodedJwtData.userId);
  //   return decodedJwtData.userId;
  // }
  
}
