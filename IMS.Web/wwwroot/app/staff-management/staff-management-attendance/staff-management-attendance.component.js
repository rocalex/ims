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
const staff_management_attendance_service_1 = require("./staff-management-attendance.service");
const loader_service_1 = require("../../../shared/loader-service");
const snackbar_service_1 = require("../../../shared/snackbar-service");
const staff_management_attendance_model_1 = require("./staff-management-attendance.model");
let StaffAttendanceManagementComponent = class StaffAttendanceManagementComponent {
    constructor(StaffManagementService, loaderService, snackBar) {
        this.StaffManagementService = StaffManagementService;
        this.loaderService = loaderService;
        this.snackBar = snackBar;
        this.initialData = {};
        this.staffs = [];
        this.attendanceTypes = ['Daily', 'Monthly'];
        this.selectedDate = new Date();
        this.monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
        this.getStaffQuery = new staff_management_attendance_model_1.GetStaffAttendanceManagementAc();
        this.addStaff = [];
        this.attendanceColumns = [];
        this.allSelected = false;
        this.indeterminate = false;
    }
    ngOnInit() {
        this.selectedAttendance = 'Daily';
        this.attendanceColumns = [];
        this.staffs = [];
        this.getIntialData();
        this.selectedMonth = this.monthNames[(new Date()).getMonth()];
        this.selectedDate = new Date();
        this.allSelected = false;
        this.indeterminate = false;
    }
    getIntialData() {
        this.loaderService.toggleLoader(true);
        this.StaffManagementService.getIntialData().then(res => {
            this.initialData = res.json();
            this.loaderService.toggleLoader(false);
        });
    }
    getStaffByClassId() {
        this.loaderService.toggleLoader(true);
        this.staffs = this.initialData.staffs;
        for (var i = 0; i < this.staffs.length; i++) {
            this.staffs[i].isSelectedForAttendance = false;
        }
        this.generateTableForAttendance();
        this.getWeekOffsByCurrentAcademicYearId();
        this.getStaffAttendance();
        this.loaderService.toggleLoader(false);
    }
    generateTableForAttendance() {
        for (var i = 0; i < this.staffs.length; i++) {
            if (this.selectedAttendance === 'Daily') {
                this.attendanceColumns = [this.selectedDate.getDate()];
                this.staffs[i].attendance = [{ id: this.selectedDate.getDate(), value: staff_management_attendance_model_1.AttendanceType.None }];
            }
            else {
                var lastDay = new Date(this.selectedDate.getFullYear(), this.monthNames.findIndex(x => x === this.selectedMonth) + 1, 0);
                this.attendanceColumns = [];
                this.staffs[i].attendance = [];
                for (var j = 1; j <= lastDay.getDate(); j++) {
                    this.attendanceColumns.push(j);
                    this.staffs[i].attendance.push({ id: j, value: staff_management_attendance_model_1.AttendanceType.None });
                }
            }
        }
    }
    getStaffAttendance() {
        this.loaderService.toggleLoader(true);
        if (this.selectedAttendance === 'Daily') {
            this.getStaffQuery.StartDate = new Date(Date.UTC(this.selectedDate.getFullYear(), this.selectedDate.getMonth(), this.selectedDate.getDate()));
            this.getStaffQuery.EndDate = this.getStaffQuery.StartDate;
        }
        else {
            this.getStaffQuery.StartDate = new Date(Date.UTC(this.selectedDate.getFullYear(), this.monthNames.findIndex(x => x === this.selectedMonth), 1));
            this.getStaffQuery.EndDate = new Date(Date.UTC(this.selectedDate.getFullYear(), this.monthNames.findIndex(x => x === this.selectedMonth) + 1, 0));
        }
        this.StaffManagementService.getStaffAttendance(this.getStaffQuery).then(res => {
            var response = res.json();
            for (var i = 0; i < response.length; i++) {
                var attendance = response[i];
                var date = (new Date(attendance.attendanceDate)).getDate();
                var staff = this.staffs.find(x => x.id === attendance.staffId);
                var StaffAttendance = staff.attendance.find(x => x.id === date);
                StaffAttendance.value = attendance.attendanceTypeDescription;
            }
            this.loaderService.toggleLoader(false);
        });
    }
    convertDateToUtc(dateString) {
        var date = new Date(dateString);
        return new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()));
    }
    addStaffAttendance() {
        this.loaderService.toggleLoader(true);
        var StaffToSave = this.staffs.filter(x => x.isSelectedForAttendance === true);
        for (var i = 0; i < StaffToSave.length; i++) {
            var Staff = new staff_management_attendance_model_1.AddStaffAttendanceManagementAc();
            Staff.StaffId = StaffToSave[i].id;
            for (var j = 0; j < this.attendanceColumns.length; j++) {
                var date;
                if (this.selectedAttendance === 'Monthly') {
                    date = new Date(Date.UTC(new Date().getFullYear(), this.monthNames.findIndex(x => x === this.selectedMonth), this.attendanceColumns[j]));
                }
                else {
                    date = this.convertDateToUtc(this.selectedDate);
                }
                Staff.AttendanceDates.push(date);
                Staff.AttendanceType.push((StaffToSave[i].attendance.find(x => x.id === this.attendanceColumns[j])).value);
            }
            this.addStaff.push(Staff);
        }
        this.StaffManagementService.addStaffAttendance(this.addStaff).then(res => {
            this.snackBar.showSnackbar('Staff attendance updated successfully');
            this.ngOnInit();
            this.loaderService.toggleLoader(false);
        });
    }
    changeNextIcon(StaffId, id) {
        var StaffIndex = this.staffs.findIndex(x => x.id === StaffId);
        var attendanceIndex = this.staffs[StaffIndex].attendance.findIndex(x => x.id === id);
        if (this.staffs[StaffIndex].attendance[attendanceIndex].value === staff_management_attendance_model_1.AttendanceType.None) {
            this.staffs[StaffIndex].attendance[attendanceIndex].value = staff_management_attendance_model_1.AttendanceType.Present;
        }
        else if (this.staffs[StaffIndex].attendance[attendanceIndex].value === staff_management_attendance_model_1.AttendanceType.Present) {
            this.staffs[StaffIndex].attendance[attendanceIndex].value = staff_management_attendance_model_1.AttendanceType.Absent;
        }
        else if (this.staffs[StaffIndex].attendance[attendanceIndex].value === staff_management_attendance_model_1.AttendanceType.Absent) {
            this.staffs[StaffIndex].attendance[attendanceIndex].value = staff_management_attendance_model_1.AttendanceType.Leave;
        }
        else if (this.staffs[StaffIndex].attendance[attendanceIndex].value === staff_management_attendance_model_1.AttendanceType.Leave) {
            this.staffs[StaffIndex].attendance[attendanceIndex].value = staff_management_attendance_model_1.AttendanceType.HalfLeave;
        }
        else if (this.staffs[StaffIndex].attendance[attendanceIndex].value === staff_management_attendance_model_1.AttendanceType.HalfLeave) {
            this.staffs[StaffIndex].attendance[attendanceIndex].value = staff_management_attendance_model_1.AttendanceType.None;
        }
    }
    resetStaff() {
        this.staffs = [];
    }
    checkboxChange() {
        var selected = this.staffs.filter(x => x.isSelectedForAttendance === true);
        if (selected.length) {
            this.indeterminate = (selected.length !== this.staffs.length);
            this.allSelected = !this.indeterminate;
        }
        else {
            this.indeterminate = false;
            this.allSelected = false;
        }
    }
    selectAll() {
        this.indeterminate = false;
        for (var i = 0; i < this.staffs.length; i++) {
            this.staffs[i].isSelectedForAttendance = this.allSelected;
        }
    }
    getWeekOffsByCurrentAcademicYearId() {
        this.loaderService.toggleLoader(true);
        this.StaffManagementService.getWeekOffsByCurrentAcademicYearId().then(res => {
            var response = res.json();
            var weekOff = response.filter(x => x.isWeekOff === true);
            for (var k = 0; k < weekOff.length; k++) {
                for (var i = 0; i < this.staffs.length; i++) {
                    for (var j = 0; j < this.attendanceColumns.length; j++) {
                        var date;
                        if (this.selectedAttendance === 'Monthly') {
                            date = new Date(Date.UTC(new Date().getFullYear(), this.monthNames.findIndex(x => x === this.selectedMonth), this.attendanceColumns[j]));
                        }
                        else {
                            date = this.convertDateToUtc(this.selectedDate);
                        }
                        if (weekOff[k].weekDayString === this.getDayName(date)) {
                            var dateIndex = this.staffs[i].attendance.findIndex(x => x.id === this.attendanceColumns[j]);
                            this.staffs[i].attendance[dateIndex].isDisabled = true;
                        }
                    }
                }
            }
            this.loaderService.toggleLoader(false);
        });
    }
    getDayName(date) {
        var days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
        var dayName = days[date.getDay()];
        return dayName;
    }
};
StaffAttendanceManagementComponent = __decorate([
    core_1.Component({
        moduleId: module.id,
        templateUrl: 'staff-management-attendance.html'
    }),
    __metadata("design:paramtypes", [staff_management_attendance_service_1.StaffAttendanceManagementService, loader_service_1.LoaderService,
        snackbar_service_1.SnackbarService])
], StaffAttendanceManagementComponent);
exports.StaffAttendanceManagementComponent = StaffAttendanceManagementComponent;
//# sourceMappingURL=staff-management-attendance.component.js.map