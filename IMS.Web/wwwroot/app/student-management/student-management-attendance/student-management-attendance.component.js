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
const student_management_attendance_service_1 = require("./student-management-attendance.service");
const loader_service_1 = require("../../../shared/loader-service");
const router_1 = require("@angular/router");
const snackbar_service_1 = require("../../../shared/snackbar-service");
const student_management_attendance_model_1 = require("./student-management-attendance.model");
let StudentAttendanceManagementComponent = class StudentAttendanceManagementComponent {
    constructor(studentManagementService, loaderService, router, snackBar) {
        this.studentManagementService = studentManagementService;
        this.loaderService = loaderService;
        this.router = router;
        this.snackBar = snackBar;
        this.initialData = {};
        this.students = [];
        this.attendanceTypes = ['Daily', 'Monthly'];
        this.selectedDate = new Date();
        this.monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
        this.periods = ['All', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10'];
        this.selectedPeriod = 'All';
        this.getStudentQuery = new student_management_attendance_model_1.GetStudentAttendanceManagementAc();
        this.addStudent = new student_management_attendance_model_1.AddStudentAttendanceManagementWrapperAc();
        this.attendanceColumns = [];
        this.allSelected = false;
        this.indeterminate = false;
    }
    ngOnInit() {
        this.currentSelectedClass = {};
        this.currentSelectedSection = {};
        this.selectedAttendance = 'Daily';
        this.attendanceColumns = [];
        this.students = [];
        this.getIntialDataForPromotion();
        this.selectedMonth = this.monthNames[(new Date()).getMonth()];
        this.selectedDate = new Date();
        this.allSelected = false;
        this.indeterminate = false;
    }
    getIntialDataForPromotion() {
        this.loaderService.toggleLoader(true);
        this.studentManagementService.getIntialDataForPromotion().then(res => {
            this.initialData = res.json();
            this.loaderService.toggleLoader(false);
        });
    }
    getStudentByClassId() {
        this.loaderService.toggleLoader(true);
        this.studentManagementService.getStudentByClassId(this.currentSelectedClass.id, this.currentSelectedSection.id).then(res => {
            this.students = res.json();
            for (var i = 0; i < this.students.length; i++) {
                this.students[i].isSelectedForAttendance = false;
            }
            this.generateTableForAttendance();
            this.getWeekOffsByCurrentAcademicYearId();
            this.getStudentAttendance();
            this.loaderService.toggleLoader(false);
        });
    }
    generateTableForAttendance() {
        for (var i = 0; i < this.students.length; i++) {
            if (this.selectedAttendance === 'Daily') {
                this.attendanceColumns = [this.selectedDate.getDate()];
                this.students[i].attendance = [{ id: this.selectedDate.getDate(), value: student_management_attendance_model_1.AttendanceType.None }];
            }
            else {
                var lastDay = new Date(this.selectedDate.getFullYear(), this.monthNames.findIndex(x => x === this.selectedMonth) + 1, 0);
                this.attendanceColumns = [];
                this.students[i].attendance = [];
                for (var j = 1; j <= lastDay.getDate(); j++) {
                    this.attendanceColumns.push(j);
                    this.students[i].attendance.push({ id: j, value: student_management_attendance_model_1.AttendanceType.None });
                }
            }
        }
    }
    getStudentAttendance() {
        this.loaderService.toggleLoader(true);
        this.getStudentQuery.ClassId = this.currentSelectedClass.id;
        this.getStudentQuery.SectionId = this.currentSelectedSection.id;
        this.getStudentQuery.PeriodOrderId = this.periods.findIndex(x => x === this.selectedPeriod);
        if (this.selectedAttendance === 'Daily') {
            this.getStudentQuery.StartDate = new Date(Date.UTC(this.selectedDate.getFullYear(), this.selectedDate.getMonth(), this.selectedDate.getDate()));
            this.getStudentQuery.EndDate = this.getStudentQuery.StartDate;
        }
        else {
            this.getStudentQuery.StartDate = new Date(Date.UTC(this.selectedDate.getFullYear(), this.monthNames.findIndex(x => x === this.selectedMonth), 1));
            this.getStudentQuery.EndDate = new Date(Date.UTC(this.selectedDate.getFullYear(), this.monthNames.findIndex(x => x === this.selectedMonth) + 1, 0));
        }
        this.studentManagementService.getStudentAttendance(this.getStudentQuery).then(res => {
            var response = res.json();
            for (var i = 0; i < response.length; i++) {
                var attendance = response[i];
                var date = (new Date(attendance.attendanceDate)).getDate();
                var student = this.students.find(x => x.id === attendance.studentId);
                var studentAttendance = student.attendance.find(x => x.id === date);
                studentAttendance.value = attendance.attendanceTypeDescription;
            }
            this.loaderService.toggleLoader(false);
        });
    }
    convertDateToUtc(dateString) {
        var date = new Date(dateString);
        return new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()));
    }
    addStudentAttendance() {
        this.loaderService.toggleLoader(true);
        var studentToSave = this.students.filter(x => x.isSelectedForAttendance === true);
        for (var i = 0; i < studentToSave.length; i++) {
            var student = new student_management_attendance_model_1.AddStudentAttendanceManagementAc();
            student.StudentId = studentToSave[i].id;
            for (var j = 0; j < this.attendanceColumns.length; j++) {
                var date;
                if (this.selectedAttendance === 'Monthly') {
                    date = new Date(Date.UTC(new Date().getFullYear(), this.monthNames.findIndex(x => x === this.selectedMonth), this.attendanceColumns[j]));
                }
                else {
                    date = this.convertDateToUtc(this.selectedDate);
                }
                student.AttendanceDates.push(date);
                student.AttendanceType.push((studentToSave[i].attendance.find(x => x.id === this.attendanceColumns[j])).value);
            }
            this.addStudent.Students.push(student);
        }
        this.addStudent.ClassId = this.currentSelectedClass.id;
        this.addStudent.SectionId = this.currentSelectedSection.id;
        this.addStudent.PeriodOrderId = this.periods.findIndex(x => x === this.selectedPeriod);
        this.studentManagementService.addStudentAttendance(this.addStudent).then(res => {
            this.snackBar.showSnackbar('Student attendance updated successfully');
            this.ngOnInit();
            this.loaderService.toggleLoader(false);
        });
    }
    changeNextIcon(studentId, id) {
        var studentIndex = this.students.findIndex(x => x.id === studentId);
        var attendanceIndex = this.students[studentIndex].attendance.findIndex(x => x.id === id);
        if (this.students[studentIndex].attendance[attendanceIndex].value === student_management_attendance_model_1.AttendanceType.None) {
            this.students[studentIndex].attendance[attendanceIndex].value = student_management_attendance_model_1.AttendanceType.Present;
        }
        else if (this.students[studentIndex].attendance[attendanceIndex].value === student_management_attendance_model_1.AttendanceType.Present) {
            this.students[studentIndex].attendance[attendanceIndex].value = student_management_attendance_model_1.AttendanceType.Absent;
        }
        else if (this.students[studentIndex].attendance[attendanceIndex].value === student_management_attendance_model_1.AttendanceType.Absent) {
            this.students[studentIndex].attendance[attendanceIndex].value = student_management_attendance_model_1.AttendanceType.Leave;
        }
        else if (this.students[studentIndex].attendance[attendanceIndex].value === student_management_attendance_model_1.AttendanceType.Leave) {
            this.students[studentIndex].attendance[attendanceIndex].value = student_management_attendance_model_1.AttendanceType.HalfLeave;
        }
        else if (this.students[studentIndex].attendance[attendanceIndex].value === student_management_attendance_model_1.AttendanceType.HalfLeave) {
            this.students[studentIndex].attendance[attendanceIndex].value = student_management_attendance_model_1.AttendanceType.None;
        }
    }
    resetStudent() {
        this.students = [];
    }
    checkboxChange() {
        var selected = this.students.filter(x => x.isSelectedForAttendance === true);
        if (selected.length) {
            this.indeterminate = (selected.length !== this.students.length);
            this.allSelected = !this.indeterminate;
        }
        else {
            this.indeterminate = false;
            this.allSelected = false;
        }
    }
    selectAll() {
        this.indeterminate = false;
        for (var i = 0; i < this.students.length; i++) {
            this.students[i].isSelectedForAttendance = this.allSelected;
        }
    }
    getWeekOffsByCurrentAcademicYearId() {
        this.loaderService.toggleLoader(true);
        this.studentManagementService.getWeekOffsByCurrentAcademicYearId().then(res => {
            var response = res.json();
            var weekOff = response.filter(x => x.isWeekOff === true);
            for (var k = 0; k < weekOff.length; k++) {
                for (var i = 0; i < this.students.length; i++) {
                    for (var j = 0; j < this.attendanceColumns.length; j++) {
                        var date;
                        if (this.selectedAttendance === 'Monthly') {
                            date = new Date(Date.UTC(new Date().getFullYear(), this.monthNames.findIndex(x => x === this.selectedMonth), this.attendanceColumns[j]));
                        }
                        else {
                            date = this.convertDateToUtc(this.selectedDate);
                        }
                        if (weekOff[k].weekDayString === this.getDayName(date)) {
                            var dateIndex = this.students[i].attendance.findIndex(x => x.id === this.attendanceColumns[j]);
                            this.students[i].attendance[dateIndex].isDisabled = true;
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
    isAllowedToSave() {
        var count = this.students.filter(x => x.isSelectedForAttendance === true);
        return (count.length !== 0);
    }
};
StudentAttendanceManagementComponent = __decorate([
    core_1.Component({
        moduleId: module.id,
        templateUrl: 'student-management-attendance.html'
    }),
    __metadata("design:paramtypes", [student_management_attendance_service_1.StudentAttendanceManagementService, loader_service_1.LoaderService,
        router_1.Router, snackbar_service_1.SnackbarService])
], StudentAttendanceManagementComponent);
exports.StudentAttendanceManagementComponent = StudentAttendanceManagementComponent;
//# sourceMappingURL=student-management-attendance.component.js.map