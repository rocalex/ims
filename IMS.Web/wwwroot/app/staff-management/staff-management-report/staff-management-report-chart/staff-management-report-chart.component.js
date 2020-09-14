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
const staff_management_report_service_1 = require("../staff-management-report.service");
const loader_service_1 = require("../../../../shared/loader-service");
const snackbar_service_1 = require("../../../../shared/snackbar-service");
let StaffManagementReportChartComponent = class StaffManagementReportChartComponent {
    constructor(staffManagementReportService, loaderService, router, activeRoute, snackBar) {
        this.staffManagementReportService = staffManagementReportService;
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
        this.staffs = [];
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
                    this.barChartLabels = ['Active', 'In Active'];
                    var active = this.staffs.filter(x => x.isArchived === false);
                    var inActive = this.staffs.filter(x => x.isArchived === true);
                    this.barChartData[0].data.push(active.length);
                    this.barChartData[0].data.push(inActive.length);
                }
                break;
            case 2:
                {
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
                }
                break;
            case 3:
                {
                    for (var i = 0; i < this.initialData.religions.length; i++) {
                        var religionData = this.initialData.religions[i];
                        this.barChartLabels.push(religionData.name);
                        var staffs = this.staffs.filter(x => x.religionId === religionData.id);
                        this.barChartData[0].data.push(staffs.length);
                    }
                }
                break;
            case 4:
                {
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
                }
                break;
            case 6:
                {
                    for (var i = 0; i < this.initialData.teachingStaffs.length; i++) {
                        var teachingStaff = this.initialData.teachingStaffs[i];
                        this.barChartLabels.push(teachingStaff.name);
                        var staffs = this.staffs.filter(x => x.teachingStaffId === teachingStaff.id);
                        this.barChartData[0].data.push(staffs.length);
                    }
                }
                break;
            default:
                {
                    this.snackBar.showSnackbar('Chart is under construction');
                    this.router.navigate(['staff', 'report', 'list']);
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
StaffManagementReportChartComponent = __decorate([
    core_1.Component({
        moduleId: module.id,
        templateUrl: 'staff-management-report-chart.html'
    }),
    __metadata("design:paramtypes", [staff_management_report_service_1.StaffManagementReportService, loader_service_1.LoaderService,
        router_1.Router, router_1.ActivatedRoute, snackbar_service_1.SnackbarService])
], StaffManagementReportChartComponent);
exports.StaffManagementReportChartComponent = StaffManagementReportChartComponent;
//# sourceMappingURL=staff-management-report-chart.component.js.map