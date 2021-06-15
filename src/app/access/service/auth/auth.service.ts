import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient, private router: Router) { }

  saveUserData(obj:any) {
    return this.http.post('http://localhost:8080/register', obj)
  }

  userValidation(obj:any) {
    return this.http.put('http://localhost:8080/login', obj, {responseType: 'text'})
  }

  isUserLoggedIn() {
    let user = sessionStorage.getItem('userName');
    console.log("logged user: ", user)
    return !(user === null)
  }

  logout() {
    sessionStorage.removeItem('userName');
    this.router.navigate(['access/signout'])
  }

}
