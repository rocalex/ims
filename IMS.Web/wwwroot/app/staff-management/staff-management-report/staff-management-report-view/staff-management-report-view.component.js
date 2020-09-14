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
const StaffManagementReport = require("../staff-management-report.model");
const staff_management_report_service_1 = require("../staff-management-report.service");
const loader_service_1 = require("../../../../shared/loader-service");
const router_1 = require("@angular/router");
const snackbar_service_1 = require("../../../../shared/snackbar-service");
const excel_service_1 = require("../../../../shared/excel.service");
let StaffManagementReportViewComponent = class StaffManagementReportViewComponent {
    constructor(staffManagementReportService, loaderService, router, activeRoute, snackBar, excelService) {
        this.staffManagementReportService = staffManagementReportService;
        this.loaderService = loaderService;
        this.router = router;
        this.activeRoute = activeRoute;
        this.snackBar = snackBar;
        this.excelService = excelService;
        this.reports = StaffManagementReport.getStaffList();
        this.staffs = [];
        this.activeList = [];
        this.inActiveList = [];
        this.initialData = {};
        this.classWiseStaff = [];
        this.attendanceTypes = ['None', 'Present', 'Absent', 'Leave', 'Half Leave'];
        this.attendanceTypeSelect = this.attendanceTypes[0];
        this.monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
        this.allowedMonths = [];
    }
    ngOnInit() {
        this.activeRoute.params.subscribe(res => this.selectedOrder = +res.id);
        this.getInitialDataForReports();
    }
    getAllStaffByInsituteId() {
        this.loaderService.toggleLoader(true);
        this.staffManagementReportService.getAllStaffByInsituteId().then(res => {
            this.staffs = res.json();
            this.filterData();
            this.loaderService.toggleLoader(false);
        });
    }
    filterData() {
        this.classWiseStaff = [];
        switch (this.selectedOrder) {
            case 1:
                {
                    this.activeList = JSON.parse(JSON.stringify(this.staffs));
                    this.inActiveList = JSON.parse(JSON.stringify(this.staffs));
                    if (this.teachingStaffFilterId) {
                        this.activeList = this.activeList.filter(x => x.teachingStaffId === this.teachingStaffFilterId);
                        this.inActiveList = this.inActiveList.filter(x => x.teachingStaffId === this.teachingStaffFilterId);
                    }
                    var activeStaff = this.activeList.filter(x => x.isArchived === false);
                    var inActiveStaff = this.inActiveList.filter(x => x.isArchived === true);
                    this.classWiseStaff.push({ name: 'Active Staff', staffs: activeStaff });
                    this.classWiseStaff.push({ name: 'In Active Staff', staffs: inActiveStaff });
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
                        var classSubjectMapping = (this.initialData.classSubjectMapping.filter(x => x.classId === classData.id)).map(a => a.facultyId);
                        var staffs = this.distinct(classSubjectMapping);
                        var tempStaffs = [];
                        for (var j = 0; j < staffs.length; j++) {
                            tempStaffs.push(this.staffs.find(x => x.id === staffs[j]));
                        }
                        this.classWiseStaff.push({ name: classData.name, staffs: tempStaffs });
                    }
                }
                break;
            case 3:
                {
                    var religions = JSON.parse(JSON.stringify(this.initialData.religions));
                    if (this.religionFilterId) {
                        religions = religions.filter(x => x.id === this.religionFilterId);
                    }
                    for (var i = 0; i < religions.length; i++) {
                        var religionData = religions[i];
                        var staffs = this.staffs.filter(x => x.religionId === religionData.id);
                        this.classWiseStaff.push({ name: religionData.name, staffs: staffs });
                    }
                }
                break;
            case 5:
                {
                    var attendances = this.initialData.attendances;
                    if (this.attendanceTypeSelect) {
                        attendances = attendances.filter(x => x.attendanceTypeDescription === this.attendanceTypeSelect);
                    }
                    for (var i = 0; i < attendances.length; i++) {
                        attendances[i].attendanceDate = new Date(attendances[i].attendanceDate);
                        attendances[i].month = attendances[i].attendanceDate.getMonth();
                    }
                    for (var monthIndex = 0; monthIndex < this.monthNames.length; monthIndex++) {
                        var month = this.monthNames[monthIndex];
                        var staffAttendanceDatas = [];
                        var attendancesForFilter = attendances.filter(x => x.month === monthIndex);
                        for (var j = 0; j < this.staffs.length; j++) {
                            var staffData = this.staffs[j];
                            var staffAttendance = attendancesForFilter.filter(x => x.staffId === staffData.id);
                            staffAttendanceDatas.push({
                                firstName: staffData.firstName, lastName: staffData.lastName, employeeId: staffData.employeeId,
                                personalImage: staffData.personalImage, attendances: staffAttendance,
                                gender: staffData.gender, admissionDate: staffData.admissionDate, dateOfBirth: staffData.dateOfBirth,
                                mobileNumber: staffData.mobileNumber, religion: staffData.religion, email: staffData.email
                            });
                        }
                        this.classWiseStaff.push({ name: month, staffs: staffAttendanceDatas });
                    }
                }
                break;
            case 6:
                {
                    this.monthsAllowed();
                    for (var i = 0; i < this.initialData.attendances.length; i++) {
                        this.initialData.attendances[i].attendanceDate = new Date(this.initialData.attendances[i].attendanceDate);
                    }
                    var months = this.monthNames;
                    if (this.selectedMonth) {
                        months = months.filter(x => x === this.selectedMonth);
                    }
                    var listToBind = [];
                    for (var staffIndex = 0; staffIndex < this.staffs.length; staffIndex++) {
                        var stud = this.staffs[staffIndex];
                        var staffAttendanceData = {
                            firstName: stud.firstName, lastName: stud.lastName, employeeId: stud.employeeId,
                            personalImage: stud.personalImage, attendances: []
                        };
                        for (var monthIndex = 0; monthIndex < months.length; monthIndex++) {
                            var monthCode = this.monthNames.findIndex(x => x === months[monthIndex]);
                            var attendance = this.initialData.attendances.filter(x => x.staffId === stud.id && x.attendanceDate.getMonth() === monthCode
                                && x.attendanceTypeDescription === 'Present');
                            var allowedDate = this.initialData.allowedDates.find(x => x.monthName === months[monthIndex]);
                            staffAttendanceData.attendances.push({
                                name: allowedDate.monthName, total: allowedDate.numberOfDays, present: attendance.length,
                                percentage: ((attendance.length / allowedDate.numberOfDays) * 100)
                            });
                        }
                        listToBind.push(staffAttendanceData);
                    }
                    this.classWiseStaff.push({ name: 'Staffs', staffs: listToBind });
                }
                break;
            case 7:
                {
                    var staffs = this.staffs;
                    if (this.staffIdFilter) {
                        staffs = this.staffs.filter(x => x.id === this.staffIdFilter);
                    }
                    for (var i = 0; i < staffs.length; i++) {
                        var staffData = staffs[i];
                        staffData.homework = [];
                        var homeworks = this.initialData.homeworks.filter(x => x.staffId === staffData.id);
                        for (var homeworkIndex = 0; homeworkIndex < homeworks.length; homeworkIndex++) {
                            var homework = homeworks[homeworkIndex];
                            var messages = [];
                            for (var messageIndex = 0; messageIndex < homework.homeworkMessageMappings.length; messageIndex++) {
                                var message = homework.homeworkMessageMappings[messageIndex];
                                messages.push(message.message);
                            }
                            staffData.homework.push({ date: homework.homeworkDate, messages: messages });
                        }
                    }
                    this.classWiseStaff.push({ name: 'Homework', staffs: staffs });
                    for (var i = 0; i < staffs.length; i++) {
                        var staffData = staffs[i];
                        staffData.notices = this.initialData.notices.filter(x => x.createdById === staffData.userId);
                    }
                    this.classWiseStaff.push({ name: 'Notice', staffs: staffs });
                }
                break;
            default:
                {
                    this.snackBar.showSnackbar('Report is under construction');
                    this.router.navigate(['staff', 'report', 'list']);
                }
                break;
        }
    }
    getInitialDataForReports() {
        this.loaderService.toggleLoader(true);
        this.staffManagementReportService.getInitialDataForReports().then(res => {
            this.initialData = res.json();
            if (this.initialData.academicYears.length) {
                var data = this.initialData.academicYears.find(x => x.isActive === true);
                if (data) {
                    this.academicYearFilterId = data.id;
                }
            }
            this.getAllStaffByInsituteId();
            this.loaderService.toggleLoader(false);
        });
    }
    distinct(arr) {
        var unique = arr.filter(function (elem, index, self) {
            return index === self.indexOf(elem);
        });
        return unique;
    }
    reset(filter) {
        if (filter === 'TeachingStaff') {
            this.teachingStaffFilterId = undefined;
        }
        else if (filter === 'Class') {
            this.classFilterId = undefined;
        }
        else if (filter === 'Religion') {
            this.religionFilterId = undefined;
        }
        else if (filter === 'AttendanceType') {
            this.attendanceTypeSelect = this.attendanceTypes[0];
        }
        else if (filter === 'Staff') {
            this.staffIdFilter = undefined;
        }
        else if (filter === 'Month') {
            this.selectedMonth = undefined;
        }
        this.filterData();
    }
    exportExcel() {
        var data = [];
        for (var i = 0; i < this.classWiseStaff.length; i++) {
            var json = [];
            var parent = this.classWiseStaff[i];
            for (var j = 0; j < parent.staffs.length; j++) {
                var staff = parent.staffs[j];
                json.push({
                    EmployeeId: staff.employeeId, Name: staff.firstName + ' ' + staff.lastName,
                    Religion: (staff.religion) ? staff.religion.name : '', Gender: staff.gender.name, Experience: 0,
                    DateOfBirth: staff.dateOfBirth, MobileNumber: staff.mobileNumber, Email: staff.email
                });
            }
            data.push({ SheetName: parent.name, Data: json });
        }
        this.excelService.exportAsExcelFile(data);
    }
    monthsAllowed() {
        this.allowedMonths = this.monthNames;
        if (this.selectedMonth) {
            this.allowedMonths = this.allowedMonths.filter(x => x === this.selectedMonth);
        }
    }
    getTotalClasses(attendances) {
        var total = 0;
        for (var i = 0; i < attendances.length; i++) {
            total += attendances[i].present;
        }
        return total;
    }
    getTotalClass() {
        var total = 0;
        for (var i = 0; i < this.initialData.allowedDates.length; i++) {
            var allowed = this.initialData.allowedDates[i];
            total += allowed.numberOfDays;
        }
        return total;
    }
};
StaffManagementReportViewComponent = __decorate([
    core_1.Component({
        moduleId: module.id,
        templateUrl: 'staff-management-report-view.html'
    }),
    __metadata("design:paramtypes", [staff_management_report_service_1.StaffManagementReportService, loader_service_1.LoaderService,
        router_1.Router, router_1.ActivatedRoute, snackbar_service_1.SnackbarService,
        excel_service_1.ExcelService])
], StaffManagementReportViewComponent);
exports.StaffManagementReportViewComponent = StaffManagementReportViewComponent;
//# sourceMappingURL=staff-management-report-view.component.js.map