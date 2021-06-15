import { OnInit } from '@angular/core';
import { Component, ViewChild } from '@angular/core';
import { PremiumUrlService } from 'src/app/admin/service/premiumUrl/premium-url.service';
import { AdminAuthService } from 'src/app/admin/service/adminAuth/admin-auth.service';
import { ChartOptions, ChartType, ChartDataSets } from 'chart.js';
import { Label } from 'ng2-charts';

// import {
//   ChartComponent,
//   ApexAxisChartSeries,
//   ApexChart,
//   ApexXAxis,
//   ApexDataLabels,
//   ApexTitleSubtitle,
//   ApexStroke,
//   ApexGrid
// } from "ng-apexcharts";
// import { tick } from '@angular/core/testing';
// import * as ApexCharts from 'apexcharts';

// export type ChartOptions = {
//   series: ApexAxisChartSeries;
//   chart: ApexChart;
//   xaxis: ApexXAxis;
//   dataLabels: ApexDataLabels;
//   grid: ApexGrid;
//   stroke: ApexStroke;
//   title: ApexTitleSubtitle;
// };

@Component({
  selector: 'app-overall-hits-line-chart',
  templateUrl: './overall-hits-line-chart.component.html',
  styleUrls: ['./overall-hits-line-chart.component.scss']
})

export class OverallHitsLineChartComponent {

  // numbers = [];
  stringArr: string[];

  // @ViewChild("chart") chart: ChartComponent;
  // public chartOptions: Partial<ChartOptions>;
  hitAnalyticsData: any;
  // analyticsData: any;
  // xdata;
  ydata: number[];

  public barChartOptions = {
    scaleShowVerticalLines: false,
    responsive: true
  };
  public barChartLabels; //month series
  public barChartType = 'bar';
  public barChartLegend = true;
  public chartReady = true;
  // public barChartData = [
  //   {data: this.ydata, label: 'Series A'}
  // ];
  public barChartData;

  constructor(
    private premiumUrlService: PremiumUrlService,
    private adminAuthService: AdminAuthService,
  ) {
    
  //   this.chartOptions = {
  //     series: [
  //       {
  //         name: "Hits",
  //         data: [],
  //         // data: [0, 0, 0, 20, 0, 20, 20, 20, 0, 20, 20, 10]
  //         // data: this.ydata
  //       }
  //     ],
  //     chart: {
  //       height: 350,
  //       type: "line",
  //       zoom: {
  //         enabled: false
  //       },
  //       toolbar: {
  //         show: false
  //       },
  //     },
  //     dataLabels: {
  //       enabled: false
  //     },
  //     stroke: {
  //       curve: "straight"
  //     },
  //     title: {
  //       text: "Number of hits by Month",
  //       align: "center"
  //     },
  //     grid: {
  //       row: {
  //         colors: ["#f3f3f3", "transparent"], // takes an array which will be repeated on columns
  //         opacity: 0.5
  //       }
  //     },
  //     xaxis: {
  //       type: 'category',
  //       // categories: [
  //       //   "Jan",
  //       //   "Feb",
  //       //   "Mar",
  //       //   "Apr",
  //       //   "May",
  //       //   "Jun",
  //       //   "Jul",
  //       //   "Aug",
  //       //   "Sep"
  //       // ]
  //       // categories: this.stringArr,
  //       categories: [],
  //       // categories: ["Jul 2020", "Aug 2020", "Sep 2020", "Oct 2020", "Nov 2020", "Dec 2020", "Jan 2021", "Feb 2021", "Mar 2021", "Apr 2021", "May 2021", "Jun 2021"],
  //       labels: {
  //         show: true
  //       },
  //       title: {
  //         text: undefined
  //       }
  //     }
  //   };
  }

  ngOnInit(): void {

    this.hitAnalyticsData = this.premiumUrlService.getHitAnalytics(this.adminAuthService.getSessionUserId()).subscribe(
    //   (res)=>{
    //     this.analyticsData = res;

    //     console.log("hit analytics data: "+JSON.stringify(res))
    //     let fieldValues = JSON.parse(JSON.stringify(res));
    //     let keys = Object.values(fieldValues);
    //     console.log("Data: ",keys)
    //     console.log("Date values: ",keys.filter(dateList=>{
    //       let jval = Object.values(dateList);
    //       let jjval = Object.values(jval);
    //       console.log(jval[0])
    //       this.xdata.push(jjval[0])
    //       this.ydata.push(jjval[1])
    //     }))

    //   },
    //   (err)=>{
    //     console.log("error!!!", err)
    //   }
    // );
      (res)=>{
        console.log("data", res)
        let testArr = ["Jul 2020", "Aug 2020", "Sep 2020", "Oct 2020", "Nov 2020", "Dec 2020", "Jan 2021", "Feb 2021", "Mar 2021", "Apr 2021", "May 2021", "Jun 2021"]
        this.stringArr = Object.keys(res).map(function(personNamedIndex){
          let person = res[personNamedIndex];
          // do something with person
          return person.date;
        });

        this.ydata = Object.keys(res).map(function(personNamedIndex){
          let person = res[personNamedIndex];
          // do something with person
          return person.hits;
        });
        this.ydata = this.ydata.reverse()
        console.log("stringArr", this.stringArr.reverse())
        this.barChartLabels=this.stringArr;
        // this.xdata=testArr;
        console.log("testArr: ", testArr)
        console.log("ydata", this.ydata)

        this.barChartData= [
            {data: this.ydata, label: 'Monthly Hits'}
          ];
        // var chart = new ApexCharts('chart',{
        //   type: 'line',
        //   data: {
        //     label: this.stringArr,
        //     datasets:[
        //       {
        //       data: this.ydata,
        //       }
        //     ]
        //   }
        // })
        // chart.render();
      }
      
    );
    console.log("xdata: ",this.ydata);
    // console.log("ydata: ",this.ydata);
  }

}
