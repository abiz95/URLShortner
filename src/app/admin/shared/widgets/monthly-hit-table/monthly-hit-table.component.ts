import { Component, OnInit } from '@angular/core';
import { AnalyticsService } from 'src/app/admin/service/analyticsService/analytics.service';
import { AuthSharedService } from 'src/app/services/authShared/auth-shared.service';

@Component({
  selector: 'app-monthly-hit-table',
  templateUrl: './monthly-hit-table.component.html',
  styleUrls: ['./monthly-hit-table.component.scss']
})
export class MonthlyHitTableComponent implements OnInit {
  topMonthlyHitData: any;
  noDataMsg: boolean = false
  displayedColumns: string[] = ['shortenUrl', 'hitDate', 'hits'];
  dataSource: any;

  constructor(private analyticsService: AnalyticsService, private adminAuthService: AuthSharedService) { }

  ngOnInit(): void {
    this.topMonthlyHitData = this.analyticsService.getTopMonthlyAnalytics(this.adminAuthService.getSessionUserId()).subscribe(
      (res)=>{
        console.log("topMonthlyHitData: ", res);
        this.dataSource = res;
        if (this.dataSource === null) {
          console.log("No data found: ", res);
          this.noDataMsg = true
        }
      }
    );
  }

}

