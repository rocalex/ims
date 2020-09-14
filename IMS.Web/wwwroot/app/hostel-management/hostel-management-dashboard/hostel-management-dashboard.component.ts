import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { CalendarView, CalendarEvent } from 'angular-calendar';
import { isSameDay, isSameMonth } from 'date-fns';

import { LoaderService } from '../../../shared/loader-service';
import { StaffNoticeManagementService } from '../../staff-management/staff-management-activities/staff-management-notice/staff-management-notice.service';
import { PermissionService } from '../../../shared/permission.service';
import { StaffManagementHomeworkService } from '../../staff-management/staff-management-activities/staff-management-homework/staff-management-homework.service';
import { NoticeTypeEnum } from '../../staff-management/staff-management-activities/staff-management-notice/staff-management-notice.model';
import { UserGroupFeatureParentEnum, UserGroupFeatureChildEnum } from '../../../shared/sidenav/sidenav.model';


@Component({
  selector: 'app-hostel-management-dashboard',
  templateUrl: './hostel-management-dashboard.component.html',
  styleUrls: ['./hostel-management-dashboard.component.css']
})
export class HostelManagementDashboardComponent implements OnInit {

  totalHostelCount: number = 0;
  assignStudentCount: number = 0;
  inactiveHostelCount: number = 0;

  listUrl: string = 'list';
  
  // Donut chart
  donutChartLabels: string[] = [];
  donutChartData: number[] = [];
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

  // Hostel wise
  hostelWiseBarChartLabels: string[] = [];
  hostelWiseBarChartColor: any = [{
      backgroundColor: []
  }];
  hostelWiseBarChartData: any[] = [{
      data: [], label: ''
  }];

  constructor(
    private loaderService: LoaderService,
    private router: Router,
  ) { }

  ngOnInit() {
  }

  getHostelDashboardData() {
    this.loaderService.toggleLoader(true);
  }

  getRandomColor(): string {
    let letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }

  handleEvent(action: string, event: any): void {
      if (event.type === 'activity') {
          this.router.navigate(['staff', 'activities', event.type, event.id]);
      }
      else if (event.type === 'planner') {
          this.router.navigate(['staff', event.type, event.id]);
      }
  }
}
