import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { apiPath } from 'src/app/app.enums';
import { RemoteDataService } from 'src/app/services/remoteDataService/remote-data.service';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PremiumUrlService {

  constructor(private remoteDataService: RemoteDataService) { }

  savePremiumUrlDetails(obj:any) {
    const href = `${environment.apiUrl}${apiPath.premium}`+'/saveUrl';
    return this.remoteDataService.postData(obj, href);
  }

  saveCustomPremiumUrlDetails(obj:any) {
    console.log("saveCustomPremiumUrlDetails: "+obj);
    const href = `${environment.apiUrl}${apiPath.premium}`+'/custom/saveUrl';
    return this.remoteDataService.postData(obj, href);
  }

  findCustomPremiumUrl(shortenUrl:any) {
    console.log("shortenUrl: "+shortenUrl);
    const href = `${environment.apiUrl}${apiPath.premium}` + '/custom/find/' + shortenUrl;
    return this.remoteDataService.getData(href);
  }

  getPremiumUrlList(UserId:any) {
    console.log("shortenUrl: "+UserId);
    const href = `${environment.apiUrl}${apiPath.premium}` + '/list/' + UserId;
    return this.remoteDataService.getData(href);
  }

  updateCustomPremiumUrlDetails(obj:any) {
    console.log("updateCustomPremiumUrlDetails: "+obj);
    const href = `${environment.apiUrl}${apiPath.premium}`+'/update';
    return this.remoteDataService.putData(obj, href);
  }

  deletePremiumUrlDetails(UserId:any, shortenUrl:any) {
    console.log("deletePremiumUrlDetails: UserId:"+UserId+" shortenUrl: "+shortenUrl);
    const href = `${environment.apiUrl}${apiPath.premium}` + '/deleteUrl/' + shortenUrl;
    return this.remoteDataService.deleteData(UserId, href);
  }

  updateCustomPremiumUrlStatus(obj:any) {
    console.log("updateCustomPremiumUrlStatus: "+obj);
    const href = `${environment.apiUrl}${apiPath.premium}`+'/status';
    return this.remoteDataService.putData(obj, href);
  }

}
