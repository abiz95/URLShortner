import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PremiumUrlService {

  constructor(private http: HttpClient) { }

  savePremiumUrlDetails(obj:any) {
    return this.http.post('http://localhost:8080/premium/saveUrl', obj, {responseType: 'text'});
  }

  saveCustomPremiumUrlDetails(obj:any) {
    console.log("saveCustomPremiumUrlDetails: "+obj)
    return this.http.post('http://localhost:8080/premium/custom/saveUrl', obj, {responseType: 'text'});
  }

  findCustomPremiumUrl(shortenUrl:any) {
    console.log("shortenUrl: "+shortenUrl)
    return this.http.get('http://localhost:8080/premium/custom/find/'+shortenUrl, {responseType: 'text'});
  }

  getPremiumUrlList(UserId:any) {
    console.log("shortenUrl: "+UserId)
    return this.http.get('http://localhost:8080/premium/list/'+UserId);
  }

  updateCustomPremiumUrlDetails(obj:any) {
    console.log("updateCustomPremiumUrlDetails: "+obj)
    return this.http.put('http://localhost:8080/premium/update', obj, {responseType: 'text'});
  }

  deletePremiumUrlDetails(UserId:any, shortenUrl:any) {
    console.log("deletePremiumUrlDetails: UserId:"+UserId+" shortenUrl: "+shortenUrl)
    return this.http.delete('http://localhost:8080/premium/deleteUrl/'+UserId+"/"+shortenUrl, {responseType: 'text'});
  }

  updateCustomPremiumUrlStatus(obj:any) {
    console.log("updateCustomPremiumUrlStatus: "+obj)
    return this.http.put('http://localhost:8080/premium/status', obj, {responseType: 'text'});
  }

  getHitAnalytics(UserId:any) {
    console.log("getHitAnalytics shortenUrl: "+UserId)
    return this.http.get('http://localhost:8080/analytics/monthly/'+UserId);
    // return this.http.get('http://localhost:8080/test');
  }

}
