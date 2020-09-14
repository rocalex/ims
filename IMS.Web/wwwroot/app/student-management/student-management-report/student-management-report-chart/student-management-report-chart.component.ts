import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { StudentManagementReportService } from '../student-management-report.service';
import { LoaderService } from '../../../../shared/loader-service';
import { SnackbarService } from '../../../../shared/snackbar-service';

@Component({
  moduleId: module.id,
  templateUrl: 'student-management-report-chart.html'
})
export class StudentManagementReportChartComponent implements OnInit {
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
  barChartLabels: string[] = [];
  barChartColor: any = [{
    backgroundColor: []
  }];
  barChartData: any[] = [{
    data: [], label: ''
  }];
  selectedOrder: number;
  initialData: any = {};
  students: any[] = [];
  constructor(private studentManagementReportService: StudentManagementReportService, private loaderService: LoaderService,
    private router: Router, private activeRoute: ActivatedRoute, private snackBar: SnackbarService) {
  }

  ngOnInit() {
    this.activeRoute.params.subscribe(res => this.selectedOrder = +res.id);
    this.getInitialDataForReports();
  }

  getInitialDataForReports() {
    this.loaderService.toggleLoader(true);
    this.studentManagementReportService.getInitialDataForReports().then(res => {
      this.initialData = res.json();
      this.students = this.initialData.students;
      this.filterData();
      this.loaderService.toggleLoader(false);
    });
  }

  getRandomColor(): string {
    let letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }

  filterData() {
    this.barChartLabels = [];
    this.barChartColor[0].backgroundColor = [];
    this.barChartData[0].data = [];
    switch (this.selectedOrder) {
      case 1: {
        var activeStudent = this.students.filter(x => x.isActive === true);
        var inActiveStudent = this.students.filter(x => x.isActive === false);
        this.barChartLabels.push('Active Student');
        this.barChartLabels.push('In Active Student');
        this.barChartData[0].data.push(activeStudent.length);
        this.barChartData[0].data.push(inActiveStudent.length);
      } break;
      case 2: {
        var classes = JSON.parse(JSON.stringify(this.initialData.classes));
        for (var i = 0; i < classes.length; i++) {
          var classData = classes[i];
          var studentData = this.students.filter(x => x.currentClassId === classData.id);
          this.barChartLabels.push(classData.name);
          this.barChartData[0].data.push(studentData.length);
        }
      } break;
      case 3: {
        var religions = JSON.parse(JSON.stringify(this.initialData.religions));
        for (var i = 0; i < religions.length; i++) {
          var religion = religions[i];
          var studentData = this.students.filter(x => x.religionId === religion.id);
          this.barChartLabels.push(religion.name);
          this.barChartData[0].data.push(studentData.length);
        }
      } break;
      default: {
        this.snackBar.showSnackbar('Chart is under construction');
        this.router.navigate(['student', 'report', 'list']);
      } break;
    }
    for (var i = 0; i < this.barChartLabels.length; i++) {
      this.barChartColor[0].backgroundColor.push(this.getRandomColor());
    }
  }

  distinct(arr: any[]) {
    var unique = arr.filter(function (elem, index, self) {
      return index === self.indexOf(elem);
    })
    return unique;
  }
  
  getChartOption() {
    return ((this.barChartType === 'bar') ? this.barChartOptions : this.donutChartOptions);;
  }
}
