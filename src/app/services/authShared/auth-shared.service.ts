import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthSharedService {

  constructor() { }

  isUserLoggedIn() {
    let user = sessionStorage.getItem('userName');
    console.log("logged user: ", user)
    return !(user === null)
  }
  
}
