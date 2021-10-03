import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { RemoteDataService } from '../remoteDataService/remote-data.service';

@Injectable({
  providedIn: 'root'
})
export class LoadUrlService {

  constructor(
    private http: HttpClient,
    private remoteDataService: RemoteDataService
  ) { }

  getActualUrl(shortenUrl) {
    const href = `${environment.apiUrl}`+'/url/' + shortenUrl;
    return this.remoteDataService.getData(href);
    // return this.http.get("http://localhost:8080/url/"+shortenUrl, {responseType: 'text'});

  }

}
