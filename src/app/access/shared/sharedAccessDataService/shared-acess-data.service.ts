import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SharedAcessDataService {

  private emailId;

  constructor() { }

  set userEmailId(email) {
    this.emailId = email;
  }

  get userEmailId() {
    return this.emailId;
  }
}
