import { Component, OnInit } from '@angular/core';
import { ChartOptions, ChartType } from 'chart.js';
import { MultiDataSet, Label } from 'ng2-charts';

@Component({
  selector: 'app-daily-pie-chart',
  templateUrl: './daily-pie-chart.component.html',
  styleUrls: ['./daily-pie-chart.component.scss']
})
export class DailyPieChartComponent implements OnInit {

  doughnutChartLabels: Label[] = ['BMW', 'Ford', 'Tesla'];
  doughnutChartData: MultiDataSet = [
    [55, 25, 20]
  ];
  doughnutChartType: ChartType = 'doughnut';

  public doughnutChartOptions: ChartOptions = {
    responsive: true,
    maintainAspectRatio: false,

  }; 

  constructor() { }

  ngOnInit(): void {
  }

}
