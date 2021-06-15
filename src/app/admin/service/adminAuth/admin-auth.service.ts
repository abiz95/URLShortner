import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AdminAuthService {

  constructor(private router: Router) { }

  getSessionUserId() {
    let user = sessionStorage.getItem('userName');
    console.log("logged user: ", user)
    return user;
  }

  logout() {
    sessionStorage.removeItem('userName');
    this.router.navigate(['access/signout'])
  }
}
