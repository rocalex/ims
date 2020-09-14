import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { StaffManagementReportService } from '../staff-management-report.service';
import { LoaderService } from '../../../../shared/loader-service';
import { SnackbarService } from '../../../../shared/snackbar-service';

@Component({
  moduleId: module.id,
  templateUrl: 'staff-management-report-chart.html'
})
export class StaffManagementReportChartComponent implements OnInit {
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
  staffs: any[] = [];
  constructor(private staffManagementReportService: StaffManagementReportService, private loaderService: LoaderService,
    private router: Router, private activeRoute: ActivatedRoute, private snackBar: SnackbarService) {
  }

  ngOnInit() {
    this.activeRoute.params.subscribe(res => this.selectedOrder = +res.id);
    this.getInitialDataForReports();
  }

  getInitialDataForReports() {
    this.loaderService.toggleLoader(true);
    this.staffManagementReportService.getInitialDataForReports().then(res => {
      this.initialData = res.json();
      this.getAllStaffByInsituteId();
      this.loaderService.toggleLoader(false);
    });
  }

  getAllStaffByInsituteId() {
    this.loaderService.toggleLoader(true);
    this.staffManagementReportService.getAllStaffByInsituteId().then(res => {
      this.staffs = res.json();
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
        this.barChartLabels = ['Active', 'In Active'];
        var active = this.staffs.filter(x => x.isArchived === false);
        var inActive = this.staffs.filter(x => x.isArchived === true);
        this.barChartData[0].data.push(active.length);
        this.barChartData[0].data.push(inActive.length);
      } break;
      case 2: {
        var classes = JSON.parse(JSON.stringify(this.initialData.classes));
        for (var i = 0; i < classes.length; i++) {
          var classData = classes[i];
          var classSubjectMapping = (this.initialData.classSubjectMapping.filter(x => x.classId === classData.id)).map(a => a.facultyId);
          var staffs = this.distinct(classSubjectMapping);
          var tempStaffs = [];
          for (var j = 0; j < staffs.length; j++) {
            tempStaffs.push(this.staffs.find(x => x.id === staffs[j]));
          }
          this.barChartLabels.push(classData.name);
          this.barChartData[0].data.push(tempStaffs.length);
        }
      } break;
      case 3: {
        for (var i = 0; i < this.initialData.religions.length; i++) {
          var religionData = this.initialData.religions[i];
          this.barChartLabels.push(religionData.name);
          var staffs = this.staffs.filter(x => x.religionId === religionData.id);
          this.barChartData[0].data.push(staffs.length);
        }
      } break;
      case 4: {
        var subjects = JSON.parse(JSON.stringify(this.initialData.subjects));
        for (var i = 0; i < subjects.length; i++) {
          var subjectData = subjects[i];
          var classSubjectMapping = (this.initialData.classSubjectMapping.filter(x => x.subjectId === subjectData.id)).map(a => a.facultyId);
          var staffs = this.distinct(classSubjectMapping);
          var tempStaffs = [];
          for (var j = 0; j < staffs.length; j++) {
            tempStaffs.push(this.staffs.find(x => x.id === staffs[j]));
          }
          this.barChartLabels.push(subjectData.name);
          this.barChartData[0].data.push(tempStaffs.length);
        }
      } break;
      case 6: {
        for (var i = 0; i < this.initialData.teachingStaffs.length; i++) {
          var teachingStaff = this.initialData.teachingStaffs[i];
          this.barChartLabels.push(teachingStaff.name);
          var staffs = this.staffs.filter(x => x.teachingStaffId === teachingStaff.id);
          this.barChartData[0].data.push(staffs.length);
        }
      } break;
      default: {
        this.snackBar.showSnackbar('Chart is under construction');
        this.router.navigate(['staff', 'report', 'list']);
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
