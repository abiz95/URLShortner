import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GeneralUrlService {

  constructor(
    private http: HttpClient,
  ) { }

  saveGeneralUrl(obj:any) {
    console.log("save obj: "+obj);
    return this.http.post('http://localhost:8080/general/saveUrl', obj, {responseType: 'text'})
  }
}
