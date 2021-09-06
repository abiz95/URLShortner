import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SharedService {

  constructor(
    private http: HttpClient,
  ) { }

  updateUserPlan(obj:any) {
    console.log("update plan obj: "+obj);
    return this.http.put('http://localhost:8080/user/plan', obj, {responseType: 'text' as 'json'})
  }

}
