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
const angular_calendar_1 = require("angular-calendar");
const date_fns_1 = require("date-fns");
const loader_service_1 = require("../../shared/loader-service");
const dashboard_service_1 = require("./dashboard.service");
const print_service_1 = require("../../shared/print.service");
const dashboard_model_1 = require("./dashboard.model");
const shared_service_1 = require("../../shared/shared.service");
const institute_management_time_table_model_1 = require("../../app/institute-management/institute-management-time-table/institute-management-time-table.model");
let AppUserDashboardComponent = class AppUserDashboardComponent {
    constructor(loaderService, dashboardService, sharedService, printService) {
        this.loaderService = loaderService;
        this.dashboardService = dashboardService;
        this.sharedService = sharedService;
        this.printService = printService;
        this.activitiesList = [];
        this.globallySelectedAcademicYear = {};
        this.userDashboardDetails = new dashboard_model_1.UserDashboardModel();
        this.userDashboardTypeEnumList = [dashboard_model_1.UserDashboardTypeEnum.Student, dashboard_model_1.UserDashboardTypeEnum.Staff];
        this.classList = [];
        this.sectionsList = [];
        this.timeTable = new institute_management_time_table_model_1.TimeTable();
        this.timeTableDetailsList = [];
        this.timeTableBreakDetailsList = [];
        this.rowHeaders = [];
        this.attendance = new dashboard_model_1.Attendance();
        this.attendances = [];
        this.attendanceTypes = ['Daily', 'Monthly'];
        this.selectedDate = new Date();
        this.monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
        this.attendanceColumns = [];
        this.timeTableDesignClassList = ["badge-primary", "badge-secondary", "badge-info", "badge-success", "badge-danger"];
        // Calendar View
        this.view = angular_calendar_1.CalendarView.Month;
        this.viewDate = new Date();
        this.activeDayIsOpen = true;
        this.CalendarView = angular_calendar_1.CalendarView;
        this.calendarEvents = [];
        this.calendarEventColors = {
            red: {
                primary: '#ad2121',
                secondary: '#FAE3E3'
            },
            blue: {
                primary: '#1e90ff',
                secondary: '#D1E8FF'
            },
            yellow: {
                primary: '#e3bc08',
                secondary: '#FDF1BA'
            }
        };
    }
    ngOnInit() {
        this.selectedMonth = this.monthNames[(new Date()).getMonth()];
        this.sharedService.currentAcademicYear.subscribe(res => {
            this.globallySelectedAcademicYear = res;
            if (this.globallySelectedAcademicYear !== null && this.globallySelectedAcademicYear !== undefined) {
                this.getUserDashboardDetails();
            }
        });
    }
    getUserDashboardDetails() {
        this.loaderService.toggleLoader(true);
        this.dashboardService.getUserDashboardDetails(this.globallySelectedAcademicYear.id)
            .then(res => {
            let response = res.json();
            this.userDashboardDetails = response;
            this.classList = response.classList;
            this.sectionsList = response.sectionsList;
            this.activitiesList = response.activityList;
            this.activitiesList.forEach(activity => {
                let event = {
                    id: activity.id,
                    type: 'activity',
                    start: new Date(activity.startDate),
                    end: new Date(activity.endDate),
                    title: activity.name,
                    color: this.calendarEventColors.red
                };
                this.calendarEvents.push(event);
            });
            if (response.timeTableDetails.timeTable !== null && response.timeTableDetails.timeTable !== undefined) {
                this.timeTable = response.timeTableDetails.timeTable;
            }
            if (response.timeTableDetails.timeTableSubjectDetailsList !== null && response.timeTableDetails.timeTableSubjectDetailsList !== undefined && response.timeTableDetails.timeTableSubjectDetailsList.length > 0) {
                this.timeTableDetailsList = response.timeTableDetails.timeTableSubjectDetailsList;
                this.timeTableBreakDetailsList = response.timeTableDetails.timeTableBreakDetailsList;
                this.generateTimeTableRowHeaders();
            }
            this.loaderService.toggleLoader(false);
        })
            .catch(err => {
            this.loaderService.toggleLoader(false);
        });
    }
    generateTimeTableRowHeaders() {
        // Generate time table column headers
        this.rowHeaders = [];
        let periodStartTime = this.timeTable.periodStartTime;
        let periodNumber = 0;
        for (let i = 0; i < (this.timeTable.periodCount + this.timeTable.breaksCount); i++) {
            let breakPeriod = this.isBreakPeriod(i);
            if (breakPeriod.isBreak) {
                let periodEndTime = this.addTimeDuration(periodStartTime, breakPeriod.breakDuration);
                this.rowHeaders.push({ headerName: 'Br', isBreak: true, periodNumber: 0 });
                periodStartTime = periodEndTime;
            }
            else {
                let periodEndTime = this.addTimeDuration(periodStartTime, this.timeTable.periodDuration);
                this.rowHeaders.push({ headerName: periodStartTime + ' - ' + periodEndTime, isBreak: false, periodNumber: ++periodNumber });
                periodStartTime = periodEndTime;
            }
        }
    }
    isBreakPeriod(index) {
        let isBreak = false;
        let breakDuration = -1;
        for (let i = 0; i < this.timeTableBreakDetailsList.length; i++) {
            if (this.timeTableBreakDetailsList[i].breakAfterPeriod + i === index) {
                isBreak = true;
                breakDuration = this.timeTableBreakDetailsList[i].breakDuration;
                break;
            }
        }
        return { isBreak: isBreak, breakDuration: breakDuration };
    }
    addTimeDuration(time, timeDuration) {
        let hourValue = parseInt(time.split(':')[0]);
        let minuteValue = parseInt(time.split(':')[1]);
        minuteValue = minuteValue + timeDuration;
        if (minuteValue >= 60) {
            minuteValue = 0;
            hourValue += 1;
            if (hourValue >= 24) {
                hourValue = 0;
            }
        }
        let minuteValueString = (minuteValue < 10) ? '0' + minuteValue.toString() : minuteValue.toString();
        let hourValueString = (hourValue < 10) ? '0' + hourValue.toString() : hourValue.toString();
        return hourValueString + ':' + minuteValueString;
    }
    getCssClass(timeTableDetail) {
        if (timeTableDetail.timeTableCssClass === null || timeTableDetail.timeTableCssClass === undefined || timeTableDetail.timeTableCssClass.trim() === '') {
            let index = Math.floor(Math.random() * this.timeTableDesignClassList.length);
            timeTableDetail.timeTableCssClass = 'badge d-block text-center ' + this.timeTableDesignClassList[index];
        }
        return timeTableDetail.timeTableCssClass;
    }
    print(elementId) {
        this.printService.print(elementId);
    }
    getStaffTimeTable() {
        this.timeTable = new institute_management_time_table_model_1.TimeTable();
        this.timeTableDetailsList = [];
        this.timeTableBreakDetailsList = [];
        this.rowHeaders = [];
        this.loaderService.toggleLoader(true);
        this.dashboardService.getStaffTimeTable(this.selectedClassId, this.selectedSectionId, this.globallySelectedAcademicYear.id)
            .then(res => {
            let response = res.json();
            if (response.timeTable !== null && response.timeTable !== undefined) {
                this.timeTable = response.timeTable;
            }
            if (response.timeTableSubjectDetailsList !== null && response.timeTableSubjectDetailsList !== undefined && response.timeTableSubjectDetailsList.length > 0) {
                this.timeTableDetailsList = response.timeTableSubjectDetailsList;
                this.timeTableBreakDetailsList = response.timeTableBreakDetailsList;
                this.generateTimeTableRowHeaders();
            }
            this.loaderService.toggleLoader(false);
        })
            .catch(err => {
            this.loaderService.toggleLoader(false);
        });
    }
    closeOpenMonthViewDay() {
        this.activeDayIsOpen = false;
    }
    setView(view) {
        this.view = view;
    }
    handleEvent(action, event) {
        let modalData = { event, action };
    }
    dayClicked({ date, events }) {
        if (date_fns_1.isSameMonth(date, this.viewDate)) {
            this.viewDate = date;
            if ((date_fns_1.isSameDay(this.viewDate, date) && this.activeDayIsOpen === true) || events.length === 0) {
                this.activeDayIsOpen = false;
            }
            else {
                this.activeDayIsOpen = true;
            }
        }
    }
    getStudentAttendance() {
        this.loaderService.toggleLoader(true);
        this.generateTableForAttendance();
        if (this.selectedAttendance === 'Daily') {
            this.attendance.FromDate = new Date(Date.UTC(this.selectedDate.getFullYear(), this.selectedDate.getMonth(), this.selectedDate.getDate()));
            this.attendance.EndDate = this.attendance.FromDate;
        }
        else {
            this.attendance.FromDate = new Date(Date.UTC(this.selectedDate.getFullYear(), this.monthNames.findIndex(x => x === this.selectedMonth), 1));
            this.attendance.EndDate = new Date(Date.UTC(this.selectedDate.getFullYear(), this.monthNames.findIndex(x => x === this.selectedMonth) + 1, 0));
        }
        this.dashboardService.getStudentAttendanceForStudentDashboard(this.attendance).then(res => {
            var response = res.json();
            for (var i = 0; i < response.length; i++) {
                var attendance = response[i];
                var date = (new Date(attendance.attendanceDate)).getDate();
                var studentAttendance = this.attendances.find(x => x.id === date);
                studentAttendance.value = attendance.attendanceTypeDescription;
            }
            console.log(this.attendances);
            this.loaderService.toggleLoader(false);
        });
    }
    resetAttendance() {
        this.attendances = [];
    }
    generateTableForAttendance() {
        if (this.selectedAttendance === 'Daily') {
            this.attendanceColumns = [this.selectedDate.getDate()];
            this.attendances = [{ id: this.selectedDate.getDate(), value: dashboard_model_1.AttendanceType.None }];
        }
        else {
            var lastDay = new Date(this.selectedDate.getFullYear(), this.monthNames.findIndex(x => x === this.selectedMonth) + 1, 0);
            this.attendanceColumns = [];
            this.attendances = [];
            for (var j = 1; j <= lastDay.getDate(); j++) {
                this.attendanceColumns.push(j);
                this.attendances.push({ id: j, value: dashboard_model_1.AttendanceType.None });
            }
        }
    }
};
AppUserDashboardComponent = __decorate([
    core_1.Component({
        moduleId: module.id,
        templateUrl: 'dashboard.html'
    }),
    __metadata("design:paramtypes", [loader_service_1.LoaderService,
        dashboard_service_1.DashboardService,
        shared_service_1.SharedService,
        print_service_1.PrintService])
], AppUserDashboardComponent);
exports.AppUserDashboardComponent = AppUserDashboardComponent;
//# sourceMappingURL=dashboard.component.js.map