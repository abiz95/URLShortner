import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { apiPath } from 'src/app/app.enums';
import { environment } from 'src/environments/environment';
import { RemoteDataService } from '../remoteDataService/remote-data.service';

@Injectable({
  providedIn: 'root'
})
export class SharedService {

  constructor(
    private http: HttpClient,
    private remoteDataService: RemoteDataService
  ) { }

  updateUserPlan(obj:any) {
    console.log("update plan obj: "+obj);
    const href = `${environment.apiUrl}${apiPath.user}`+'/plan';
    return this.remoteDataService.putData(obj, href);
    // return this.http.put('http://localhost:8080/user/plan', obj, {responseType: 'text' as 'json'})
  }

}
