import { Component, OnInit } from '@angular/core';
import { ChartOptions, ChartType } from 'chart.js';
import { MultiDataSet, Label } from 'ng2-charts';
import { AnalyticsService } from 'src/app/admin/service/analyticsService/analytics.service';
import { AuthSharedService } from 'src/app/services/authShared/auth-shared.service';

@Component({
  selector: 'app-daily-pie-chart',
  templateUrl: './daily-pie-chart.component.html',
  styleUrls: ['./daily-pie-chart.component.scss']
})
export class DailyPieChartComponent implements OnInit {
  topDailyHitData: any;
  topDailyHits: any;
  noDataMsg: boolean = false;
  // doughnutChartLabels: Label[] = ['BMW', 'Ford', 'Tesla'];
  // doughnutChartData: MultiDataSet = [
  //   [55, 25, 20]
  // ];
  doughnutChartLabels: Label[] = ['No Data'];
  doughnutChartData: MultiDataSet = [[0]];

  doughnutChartType: ChartType = 'doughnut';

  public doughnutChartOptions: ChartOptions = {
    responsive: true,
    maintainAspectRatio: false,

  }; 

  constructor(private analyticsService: AnalyticsService, private adminAuthService: AuthSharedService) { }

  ngOnInit(): void {
    this.topDailyHitData = this.analyticsService.getTopDailyAnalytics(this.adminAuthService.getSessionUserId()).subscribe(
        (res)=>{
          console.log("topDailyHitData: ",res);
          this.topDailyHits = res;
          if (res !== null) {
            let hitsValue = Object.keys(res).map(function(dataNamedIndex){
              let resp = res[dataNamedIndex];
              // do something with person
              return resp.hits;
            });
            console.log("top hits data", hitsValue);
            this.doughnutChartData = hitsValue;

            let shortenUrlValue = Object.keys(res).map(function(dataNamedIndex){
              let resp = res[dataNamedIndex];
              // do something with person
              return resp.shortenUrl;
            });
            console.log("top hits URL data", shortenUrlValue);
            this.doughnutChartLabels = shortenUrlValue;
          }
          else {
            this.noDataMsg = true;
          }
        }
      );
  }

}
