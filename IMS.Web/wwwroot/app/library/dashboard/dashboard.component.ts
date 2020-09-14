import { Component, OnInit } from '@angular/core';

@Component({
  moduleId: module.id,
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  totalBooks: number = 0;
  issuedBooks: number = 0;
  latefee: number = 0;
  examPaper: number = 0;

  listUrl: string = 'list';

  // Bar chart
  // Common settings
  barChartType: string = 'bar';
  barChartLegend = false;
  barChartOptions: any = {
      responsive: true,
      scales: {
          xAxes: [{}], yAxes: [{
              ticks: {
                  beginAtZero: true
              }
          }]
      },
      plugins: {
          datalabels: {
              anchor: 'end',
              align: 'end',
          }
      }
  };

  InstituteWiseChartData: any[] = [{
    data: [], label: ''
  }];
  InstituteWiseChartLabels: string[] = [];
  InstituteWiseChartColor: any = [{
    backgroundColor: []
  }];

  ActiveChartData: any[] = [{
    data: [], label: ''
  }];
  ActiveChartLabels: string[] = [];
  ActiveChartColor: any = [{
    backgroundColor: []
  }];

  // Donut chart
  donutChartType: string = 'doughnut';
  donutChartColor: any = [{
      backgroundColor: []
  }];
  donutChartOptions: any = {
      responsive: true,
      legend: {
          position: 'top',
      },
      plugins: {
          datalabels: {
              formatter: (value, ctx) => {
                  const label = ctx.chart.data.labels[ctx.dataIndex];
                  return label;
              },
          },
      }
  };
  StudentWiseChartLabels: string[] = [];
  StudentWiseChartData: number[] = [];

  GenderWiseChartLabels: string[] = [];
  GenderWiseChartData: number[] = [];

  constructor() { }

  ngOnInit() {
  }

}
