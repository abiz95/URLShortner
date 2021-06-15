import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoadUrlService {

  constructor(
    private http: HttpClient,
  ) { }

  getActualUrl(shortenUrl) {
    return this.http.get("http://localhost:8080/url/"+shortenUrl, {responseType: 'text'});

  }

}
