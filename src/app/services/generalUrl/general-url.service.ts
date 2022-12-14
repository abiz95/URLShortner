import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { apiPath } from 'src/app/app.enums';
import { RemoteDataService } from 'src/app/services/remoteDataService/remote-data.service';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class GeneralUrlService {

  constructor(
    private http: HttpClient,
    private remoteDataService: RemoteDataService
  ) { }

  saveGeneralUrl(obj:any) {
    console.log("save obj: "+obj);
    const href = `${environment.apiUrl}${apiPath.general}`+'/saveUrl';
    return this.remoteDataService.postData(obj, href);
    // return this.http.post(`${apiPath.general}`+'/saveUrl', obj, {responseType: 'text'})
  }
}
