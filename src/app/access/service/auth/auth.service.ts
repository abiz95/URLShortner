import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { RemoteDataService } from 'src/app/services/remoteDataService/remote-data.service';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient, private remoteDataService: RemoteDataService) { }

  saveUserData(obj:any) {
    return this.http.post('http://localhost:8080/register', obj, {responseType: 'text' as 'json'})
  }

  userEmailVerification(obj:any) {
    const href = `${environment.apiUrl}` + '/verifyEmail';
    return this.remoteDataService.postData(obj, href);
    // return this.http.get('http://localhost:8080/login', obj, {responseType: 'text'})
  }

  userValidation(obj:any) {
    return this.http.post('http://localhost:8080/authenticate', obj, {responseType: 'text'})
  }

  generateToken(obj:any) {
    return this.http.post('http://localhost:8080/register', obj, {responseType: 'text'})
  }

  uploadUserImg(obj:any, userId: any) {
    // var formData: any = new FormData();
    // formData.append("imageFile", obj);

    // const HttpUploadOptions = {
    //   headers: new HttpHeaders({ "Content-Type": "multipart/form-data"})
    // }
    // const formData = new FormData();
    // formData.append('imageFile', obj);
    // formData.append('Content-Type', 'multipart/form-data');  
   
    // let HttpUploadOptions = { headers : new HttpHeaders({ 'Content-Type': 'multipart/form-data'})};
    return this.http.post('http://localhost:8080/user/image/upload/'+userId, obj, { observe: 'response' })
  }

}
