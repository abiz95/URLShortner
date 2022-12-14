import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { apiPath } from 'src/app/app.enums';
import { RemoteDataService } from 'src/app/services/remoteDataService/remote-data.service';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AnalyticsService {

  constructor(private remoteDataService: RemoteDataService) { }

    getHitAnalytics(UserId:any) {
      console.log("getHitAnalytics: "+UserId);
      const href = `${environment.apiUrl}${apiPath.analytics}` + '/monthly/' + UserId;
      return this.remoteDataService.getData(href);
    }

    getTopMonthlyAnalytics(UserId:any) {
      console.log("getTopMonthlyAnalytics: "+UserId);
      const href = `${environment.apiUrl}${apiPath.analytics}` + '/top/monthly/' + UserId;
      return this.remoteDataService.getData(href);
    }

    getTopDailyAnalytics(UserId:any) {
      console.log("getTopDailyAnalytics: "+UserId);
      const href = `${environment.apiUrl}${apiPath.analytics}` + '/top/daily/' + UserId;
      console.log("getTopDailyAnalytics URL: "+href);
      return this.remoteDataService.getData(href);
    }
    
}
