"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@angular/core");
const router_1 = require("@angular/router");
const student_management_report_service_1 = require("../student-management-report.service");
const loader_service_1 = require("../../../../shared/loader-service");
const snackbar_service_1 = require("../../../../shared/snackbar-service");
let StudentManagementReportChartComponent = class StudentManagementReportChartComponent {
    constructor(studentManagementReportService, loaderService, router, activeRoute, snackBar) {
        this.studentManagementReportService = studentManagementReportService;
        this.loaderService = loaderService;
        this.router = router;
        this.activeRoute = activeRoute;
        this.snackBar = snackBar;
        this.donutChartOptions = {
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
        this.barChartType = 'bar';
        this.barChartLegend = false;
        this.barChartOptions = {
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
        this.barChartLabels = [];
        this.barChartColor = [{
                backgroundColor: []
            }];
        this.barChartData = [{
                data: [], label: ''
            }];
        this.initialData = {};
        this.students = [];
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
    getRandomColor() {
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
            case 1:
                {
                    var activeStudent = this.students.filter(x => x.isActive === true);
                    var inActiveStudent = this.students.filter(x => x.isActive === false);
                    this.barChartLabels.push('Active Student');
                    this.barChartLabels.push('In Active Student');
                    this.barChartData[0].data.push(activeStudent.length);
                    this.barChartData[0].data.push(inActiveStudent.length);
                }
                break;
            case 2:
                {
                    var classes = JSON.parse(JSON.stringify(this.initialData.classes));
                    for (var i = 0; i < classes.length; i++) {
                        var classData = classes[i];
                        var studentData = this.students.filter(x => x.currentClassId === classData.id);
                        this.barChartLabels.push(classData.name);
                        this.barChartData[0].data.push(studentData.length);
                    }
                }
                break;
            case 3:
                {
                    var religions = JSON.parse(JSON.stringify(this.initialData.religions));
                    for (var i = 0; i < religions.length; i++) {
                        var religion = religions[i];
                        var studentData = this.students.filter(x => x.religionId === religion.id);
                        this.barChartLabels.push(religion.name);
                        this.barChartData[0].data.push(studentData.length);
                    }
                }
                break;
            default:
                {
                    this.snackBar.showSnackbar('Chart is under construction');
                    this.router.navigate(['student', 'report', 'list']);
                }
                break;
        }
        for (var i = 0; i < this.barChartLabels.length; i++) {
            this.barChartColor[0].backgroundColor.push(this.getRandomColor());
        }
    }
    distinct(arr) {
        var unique = arr.filter(function (elem, index, self) {
            return index === self.indexOf(elem);
        });
        return unique;
    }
    getChartOption() {
        return ((this.barChartType === 'bar') ? this.barChartOptions : this.donutChartOptions);
        ;
    }
};
StudentManagementReportChartComponent = __decorate([
    core_1.Component({
        moduleId: module.id,
        templateUrl: 'student-management-report-chart.html'
    }),
    __metadata("design:paramtypes", [student_management_report_service_1.StudentManagementReportService, loader_service_1.LoaderService,
        router_1.Router, router_1.ActivatedRoute, snackbar_service_1.SnackbarService])
], StudentManagementReportChartComponent);
exports.StudentManagementReportChartComponent = StudentManagementReportChartComponent;
//# sourceMappingURL=student-management-report-chart.component.js.map