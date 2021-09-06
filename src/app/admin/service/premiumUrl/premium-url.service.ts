import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { apiPath } from 'src/app/app.enums';
import { RemoteDataService } from 'src/app/services/remoteDataService/remote-data.service';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PremiumUrlService {

  constructor(private http: HttpClient,
    private remoteDataService: RemoteDataService
    ) { }

  savePremiumUrlDetails(obj:any) {
    const href = `${environment.apiUrl}${apiPath.premium}`+'/saveUrl';
    return this.remoteDataService.postData(obj, href);
    // return this.http.post('http://localhost:8080/premium/saveUrl', obj, {responseType: 'text'});
  }

  saveCustomPremiumUrlDetails(obj:any) {
    console.log("saveCustomPremiumUrlDetails: "+obj);
    const href = `${environment.apiUrl}${apiPath.premium}`+'/custom/saveUrl';
    return this.remoteDataService.postData(obj, href);
    // return this.http.post('http://localhost:8080/premium/custom/saveUrl', obj, {responseType: 'text'});
  }

  findCustomPremiumUrl(shortenUrl:any) {
    console.log("shortenUrl: "+shortenUrl);
    const href = `${environment.apiUrl}${apiPath.premium}` + '/custom/find/' + shortenUrl;
    return this.remoteDataService.getData(href);
    // return this.http.get('http://localhost:8080/premium/custom/find/'+shortenUrl, {responseType: 'text'});
  }

  getPremiumUrlList(UserId:any) {
    console.log("shortenUrl: "+UserId);
    const href = `${environment.apiUrl}${apiPath.premium}` + '/list/' + UserId;
    return this.remoteDataService.getData(href);
    // return this.http.get('http://localhost:8080/premium/list/'+UserId);
  }

  updateCustomPremiumUrlDetails(obj:any) {
    console.log("updateCustomPremiumUrlDetails: "+obj);
    const href = `${environment.apiUrl}${apiPath.premium}`+'/update';
    return this.remoteDataService.putData(obj, href);
    // return this.http.put('http://localhost:8080/premium/update', obj, {responseType: 'text'});
  }

  deletePremiumUrlDetails(UserId:any, shortenUrl:any) {
    console.log("deletePremiumUrlDetails: UserId:"+UserId+" shortenUrl: "+shortenUrl);
    const href = `${environment.apiUrl}${apiPath.premium}` + '/deleteUrl/' + shortenUrl;
    return this.remoteDataService.deleteData(UserId, href);
    // return this.http.delete('http://localhost:8080/premium/deleteUrl/'+UserId+"/"+shortenUrl, {responseType: 'text'});
  }

  updateCustomPremiumUrlStatus(obj:any) {
    console.log("updateCustomPremiumUrlStatus: "+obj);
    const href = `${environment.apiUrl}${apiPath.premium}`+'/status';
    return this.remoteDataService.putData(obj, href);
    // return this.http.put('http://localhost:8080/premium/status', obj, {responseType: 'text'});
  }

  // getHitAnalytics(UserId:any) {
  //   console.log("getHitAnalytics shortenUrl: "+UserId)
  //   return this.http.get('http://localhost:8080/analytics/monthly/'+UserId);
  //   // return this.http.get('http://localhost:8080/test');
  // }

}
