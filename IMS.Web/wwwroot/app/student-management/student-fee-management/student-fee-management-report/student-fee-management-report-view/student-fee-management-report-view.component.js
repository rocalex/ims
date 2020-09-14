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
const StudentManagementReport = require("../student-fee-management-report.model");
const student_fee_management_report_service_1 = require("../student-fee-management-report.service");
const loader_service_1 = require("../../../../../shared/loader-service");
const router_1 = require("@angular/router");
const snackbar_service_1 = require("../../../../../shared/snackbar-service");
let StudentFeeManagementReportViewComponent = class StudentFeeManagementReportViewComponent {
    constructor(studentManagementReportService, loaderService, router, activeRoute, snackBar) {
        this.studentManagementReportService = studentManagementReportService;
        this.loaderService = loaderService;
        this.router = router;
        this.activeRoute = activeRoute;
        this.snackBar = snackBar;
        this.reports = StudentManagementReport.getStudentList();
        this.initialData = {};
        this.students = [];
        this.paymentsGrid = [];
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
            if (this.initialData.academicYears.length) {
                var data = this.initialData.academicYears.find(x => x.isActive === true);
                if (data) {
                    this.academicYearFilterId = data.id;
                }
            }
            this.filterData();
            this.loaderService.toggleLoader(false);
        });
    }
    filterData() {
        var list = JSON.parse(JSON.stringify(this.students));
        if (this.classFilterId) {
            list = list.filter(x => x.currentClassId === this.classFilterId);
        }
        if (this.sectionFilterId) {
            list = list.filter(x => x.sectionId === this.sectionFilterId);
        }
        this.paymentsGrid = [];
        switch (this.selectedOrder) {
            case 1:
                {
                    var students = JSON.parse(JSON.stringify(this.students));
                    if (this.studentFilterId) {
                        students = students.filter(x => x.id === this.studentFilterId);
                    }
                    for (var i = 0; i < students.length; i++) {
                        var studentData = students[i];
                        var payments = this.initialData.feeReciepts.filter(x => x.studentId === studentData.id);
                        this.paymentsGrid.push({ name: studentData.firstName + ' ' + studentData.lastName, payments: payments });
                    }
                }
                break;
            case 2:
                {
                    var classes = JSON.parse(JSON.stringify(this.initialData.classes));
                    if (this.classFilterId) {
                        classes = classes.filter(x => x.id === this.classFilterId);
                    }
                    for (var i = 0; i < classes.length; i++) {
                        var classData = classes[i];
                        var payments = this.initialData.feeReciepts.filter(x => x.classId === classData.id);
                        this.paymentsGrid.push({ name: classData.name, payments: payments });
                    }
                }
                break;
            case 4:
                {
                    var classes = JSON.parse(JSON.stringify(this.initialData.classes));
                    if (this.classFilterId) {
                        classes = classes.filter(x => x.id === this.classFilterId);
                    }
                    for (var i = 0; i < classes.length; i++) {
                        var classData = classes[i];
                        var studentsData = this.students.filter(x => x.currentClassId === classData.id);
                        var studentIds = studentsData.map(x => x.id);
                        studentIds = this.distinct(studentIds);
                        var paymentsData = [];
                        for (var j = 0; j < studentIds.length; j++) {
                            var studentPay = this.initialData.refunds.filter(x => x.studentId === studentIds[j]);
                            for (var k = 0; k < studentPay.length; k++) {
                                paymentsData.push(studentPay[k]);
                            }
                        }
                        this.paymentsGrid.push({ name: classData.name, payments: paymentsData });
                    }
                }
                break;
            case 6:
                {
                    var religions = JSON.parse(JSON.stringify(this.initialData.religions));
                    if (this.religionFilterId) {
                        religions = religions.filter(x => x.id === this.religionFilterId);
                    }
                    for (var i = 0; i < religions.length; i++) {
                        var religionData = religions[i];
                        var studentsData = this.students.filter(x => x.religionId === religionData.id);
                        var studentIds = studentsData.map(x => x.id);
                        studentIds = this.distinct(studentIds);
                        var paymentsData = [];
                        for (var j = 0; j < studentIds.length; j++) {
                            var studentPay = this.initialData.feeReciepts.filter(x => x.studentId === studentIds[j]);
                            for (var k = 0; k < studentPay.length; k++) {
                                paymentsData.push(studentPay[k]);
                            }
                        }
                        this.paymentsGrid.push({ name: religionData.name, payments: paymentsData });
                    }
                }
                break;
            default:
                {
                    this.snackBar.showSnackbar('Report is under construction');
                    this.router.navigate(['student', 'feemanagement', 'report', 'list']);
                }
                break;
        }
    }
    reset(filter) {
        if (filter === 'Class') {
            this.classFilterId = undefined;
        }
        else if (filter === 'Section') {
            this.sectionFilterId = undefined;
        }
        else if (filter === 'Religion') {
            this.religionFilterId = undefined;
        }
        else if (filter === 'Gender') {
            this.genderFilterId = undefined;
        }
        this.filterData();
    }
    distinct(arr) {
        var unique = arr.filter(function (elem, index, self) {
            return index === self.indexOf(elem);
        });
        return unique;
    }
};
StudentFeeManagementReportViewComponent = __decorate([
    core_1.Component({
        moduleId: module.id,
        templateUrl: 'student-fee-management-report-view.html'
    }),
    __metadata("design:paramtypes", [student_fee_management_report_service_1.StudentFeeManagementReportService, loader_service_1.LoaderService,
        router_1.Router, router_1.ActivatedRoute, snackbar_service_1.SnackbarService])
], StudentFeeManagementReportViewComponent);
exports.StudentFeeManagementReportViewComponent = StudentFeeManagementReportViewComponent;
//# sourceMappingURL=student-fee-management-report-view.component.js.map