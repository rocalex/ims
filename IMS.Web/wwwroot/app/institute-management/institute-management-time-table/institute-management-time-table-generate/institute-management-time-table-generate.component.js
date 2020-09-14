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
const loader_service_1 = require("../../../../shared/loader-service");
const snackbar_service_1 = require("../../../../shared/snackbar-service");
const institute_management_time_table_service_1 = require("../institute-management-time-table.service");
const institute_management_time_table_model_1 = require("../institute-management-time-table.model");
let GenerateTimeTableManagementComponent = class GenerateTimeTableManagementComponent {
    constructor(loaderService, snackbarService, timeTableManagementService, router, activatedRoute) {
        this.loaderService = loaderService;
        this.snackbarService = snackbarService;
        this.timeTableManagementService = timeTableManagementService;
        this.router = router;
        this.activatedRoute = activatedRoute;
        this.academicYears = [];
        this.subjects = [];
        this.daysOfWeek = [];
        this.numberOfPeriods = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
        this.class = {};
        this.section = {};
        this.timeTable = new institute_management_time_table_model_1.TimeTable();
        this.timeTableDetailsList = [];
        this.timeTableDetailsListCopy = [];
        this.timeTableBreakDetailsList = [];
        this.columnHeaders = [];
        this.addedTimeTableSubjectsList = [];
        this.isSubjectTableVisible = false;
        // Validations
        this.errorMessage = '';
        this.isBreakAfterPeriodError = false;
        this.isPeriodDurationError = false;
        this.isBreakDurationError = false;
        this.isBreakAfterPeriodNullError = false;
        this.isBreakDurationNullError = false;
        this.activatedRoute.params.subscribe(param => {
            this.classId = param.classId;
            this.sectionId = param.sectionId;
        });
    }
    ngOnInit() {
        this.getTimeTableInitialData();
    }
    // Method for fetching the initial data
    getTimeTableInitialData() {
        this.loaderService.toggleLoader(true);
        this.timeTableManagementService.getTimeTableInitialData(this.classId, this.sectionId)
            .then((res) => {
            let response = res.json();
            this.academicYears = response.academicYears;
            this.subjects = response.subjects;
            this.daysOfWeek = response.daysOfWeek;
            this.class = response.class;
            this.section = response.section;
            this.loaderService.toggleLoader(false);
            // Validate entries
            if (this.academicYears === null || this.academicYears === undefined || this.academicYears.length === 0) {
                this.snackbarService.showSnackbar('No academic year available');
                this.router.navigate(['institute', 'timetable']);
            }
            else if (this.class === null || this.class === undefined) {
                this.snackbarService.showSnackbar('No class available');
                this.router.navigate(['institute', 'timetable']);
            }
            else if (this.section === null || this.section === undefined) {
                this.snackbarService.showSnackbar('No section available');
                this.router.navigate(['institute', 'timetable']);
            }
            else {
                this.timeTable.breaksCount = 2;
                for (let i = 0; i < this.timeTable.breaksCount; i++) {
                    this.timeTableBreakDetailsList.push(new institute_management_time_table_model_1.TimeTableBreakDetails());
                }
            }
        })
            .catch((err) => {
            this.loaderService.toggleLoader(false);
        });
    }
    // Method for fetching the time table details by academic year id for particular class and section
    getTimeTableDetailsOnSelectionChange() {
        this.loaderService.toggleLoader(true);
        this.timeTableManagementService.getTimeTableDetailsByAcademicYearId(this.classId, this.sectionId, this.timeTable.academicYearId)
            .then(res => {
            let response = res.json();
            if (response.timeTable !== null && response.timeTable !== undefined) {
                this.timeTable = response.timeTable;
            }
            if (response.timeTableSubjectDetailsList !== null && response.timeTableSubjectDetailsList !== undefined && response.timeTableSubjectDetailsList.length > 0) {
                this.timeTableDetailsList = response.timeTableSubjectDetailsList;
                this.timeTableDetailsListCopy = this.timeTableDetailsList.map(x => x);
                this.timeTableBreakDetailsList = response.timeTableBreakDetailsList;
                this.generateTimeTableColumnHeaders();
            }
            this.loaderService.toggleLoader(false);
        })
            .catch(err => {
            this.loaderService.toggleLoader(false);
        });
    }
    // Method for generating time table
    generateTimeTable() {
        this.validateTimeTableData();
        if (this.isSubjectTableVisible) {
            this.generateTimeTableColumnHeaders();
            this.setTimeTableDetailsList();
        }
    }
    // Method for generating time table column headers
    generateTimeTableColumnHeaders() {
        this.isSubjectTableVisible = true;
        // Generate time table column headers
        this.columnHeaders = [];
        let periodStartTime = this.timeTable.periodStartTime;
        let periodNumber = 0;
        for (let i = 0; i < (this.timeTable.periodCount + this.timeTable.breaksCount); i++) {
            let breakPeriod = this.isBreakPeriod(i);
            if (breakPeriod.isBreak) {
                let periodEndTime = this.addTimeDuration(periodStartTime, breakPeriod.breakDuration);
                this.columnHeaders.push({ headerName: 'Br (' + periodStartTime + ' to ' + periodEndTime + ')', isBreak: true, periodNumber: 0 });
                periodStartTime = periodEndTime;
            }
            else {
                let periodEndTime = this.addTimeDuration(periodStartTime, this.timeTable.periodDuration);
                this.columnHeaders.push({ headerName: periodStartTime + ' to ' + periodEndTime, isBreak: false, periodNumber: ++periodNumber });
                periodStartTime = periodEndTime;
            }
        }
    }
    // Method for adding time duration
    addTimeDuration(time, timeDuration) {
        let hourValue = parseInt(time.split(':')[0]);
        let minuteValue = parseInt(time.split(':')[1]);
        minuteValue = minuteValue + timeDuration;
        if (minuteValue >= 60) {
            hourValue += Math.floor(minuteValue / 60);
            minuteValue = minuteValue % 60;
            if (hourValue >= 24) {
                hourValue = 0;
            }
        }
        let minuteValueString = (minuteValue < 10) ? '0' + minuteValue.toString() : minuteValue.toString();
        let hourValueString = (hourValue < 10) ? '0' + hourValue.toString() : hourValue.toString();
        return hourValueString + ':' + minuteValueString;
    }
    // Method for checking if a period is break period or not
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
    // Method for setting subject to a week day
    setSubjectToWeekDay(periodNumber, weekDayEnumValue, subjectId) {
        let existingTimeTableSubject = this.addedTimeTableSubjectsList.filter(x => x.weekDaysEnum == weekDayEnumValue && x.periodNumber == periodNumber)[0];
        if (existingTimeTableSubject === null || existingTimeTableSubject === undefined) {
            let timeTableSubjectDetail = new institute_management_time_table_model_1.TimeTableDetails();
            timeTableSubjectDetail.periodNumber = periodNumber;
            timeTableSubjectDetail.subjectId = subjectId;
            timeTableSubjectDetail.weekDaysEnum = weekDayEnumValue;
            this.addedTimeTableSubjectsList.push(timeTableSubjectDetail);
        }
        else {
            existingTimeTableSubject.subjectId = subjectId;
        }
    }
    // Method for setting time table details
    setTimeTableDetailsList() {
        this.timeTableDetailsList = [];
        for (let i = 0; i < this.daysOfWeek.length; i++) {
            let timeTableWeekDaySubjectList = [];
            for (let j = 0; j < this.columnHeaders.length; j++) {
                let existingSubjectDetail = (this.timeTableDetailsListCopy[i] !== null && this.timeTableDetailsListCopy[i] !== undefined
                    && this.timeTableDetailsListCopy[i].timeTableWeekDaySubjectList !== null
                    && this.timeTableDetailsListCopy[i].timeTableWeekDaySubjectList !== undefined)
                    ? this.timeTableDetailsListCopy[i].timeTableWeekDaySubjectList[j]
                    : null;
                let timeTableDetail = new institute_management_time_table_model_1.TimeTableDetails();
                timeTableDetail.subjectId = (existingSubjectDetail !== null && existingSubjectDetail !== undefined) ? existingSubjectDetail.subjectId : 0;
                timeTableDetail.weekDaysEnum = this.daysOfWeek[i].weekDaysEnum;
                timeTableDetail.weekDaysEnumString = this.daysOfWeek[i].weekDaysEnumString;
                timeTableDetail.periodNumber = this.columnHeaders[j].periodNumber;
                timeTableDetail.isBreakPeriod = this.columnHeaders[j].isBreakPeriod;
                timeTableWeekDaySubjectList.push(timeTableDetail);
            }
            let timeTableDetail = new institute_management_time_table_model_1.TimeTableDetails();
            timeTableDetail.weekDaysEnum = this.daysOfWeek[i].weekDaysEnum;
            timeTableDetail.weekDaysEnumString = this.daysOfWeek[i].weekDaysEnumString;
            timeTableDetail.timeTableWeekDaySubjectList = timeTableWeekDaySubjectList;
            this.timeTableDetailsList.push(timeTableDetail);
        }
    }
    // Method for bulk saving the time table details
    bulkSaveTimeTableDetails() {
        this.timeTable.classId = this.classId;
        this.timeTable.sectionId = this.sectionId;
        let addedTimeTable = new institute_management_time_table_model_1.AddTimeTableDetails();
        addedTimeTable.timeTable = this.timeTable;
        addedTimeTable.timeTableSubjectDetailsList = this.addedTimeTableSubjectsList;
        addedTimeTable.timeTableBreakDetailsList = this.timeTableBreakDetailsList;
        this.loaderService.toggleLoader(true);
        this.timeTableManagementService.bulkSaveTimeTableData(addedTimeTable)
            .then(res => {
            this.snackbarService.showSnackbar(res.json().message);
            this.loaderService.toggleLoader(false);
            this.router.navigate(['institute', 'timetable']);
        })
            .catch(err => {
            this.loaderService.toggleLoader(false);
        });
    }
    // Method for validating time table data
    validateTimeTableData() {
        this.resetErrors();
        if (this.timeTableBreakDetailsList.some(x => x.breakAfterPeriod >= this.timeTable.periodCount)) {
            this.isBreakAfterPeriodError = true;
            this.isSubjectTableVisible = false;
            this.errorMessage = 'Break after period should be less than the number of periods';
        }
        else if (this.timeTableBreakDetailsList.some(x => x.breakDuration > 60)) {
            this.isBreakDurationError = true;
            this.isSubjectTableVisible = false;
            this.errorMessage = 'Time duration should be less than or equal to  60';
        }
        else if (this.timeTable.periodDuration > 60) {
            this.isPeriodDurationError = true;
            this.isSubjectTableVisible = false;
            this.errorMessage = 'Period duration should be less than or equal to  60';
        }
        else if (this.timeTableBreakDetailsList.some(x => x.breakAfterPeriod === null || x.breakAfterPeriod === undefined || x.breakAfterPeriod === 0)) {
            this.isBreakAfterPeriodNullError = true;
            this.isSubjectTableVisible = false;
            this.errorMessage = 'Break after period can not be empty or 0';
        }
        else if (this.timeTableBreakDetailsList.some(x => x.breakDuration === null || x.breakDuration === undefined)) {
            this.isBreakDurationNullError = true;
            this.isSubjectTableVisible = false;
            this.errorMessage = 'Break duration can not be empty';
        }
        else {
            this.isSubjectTableVisible = true;
        }
    }
    // Method for resetting errors
    resetErrors() {
        this.errorMessage = '';
        this.isBreakAfterPeriodError = false;
        this.isPeriodDurationError = false;
        this.isBreakDurationError = false;
        this.isBreakAfterPeriodNullError = false;
        this.isBreakDurationNullError = false;
    }
    // Method for updating the number of breaks
    changeNumberOfBreaks() {
        this.isSubjectTableVisible = false;
        if (this.timeTable.breaksCount > this.timeTableBreakDetailsList.length) {
            let breaksToAdd = this.timeTable.breaksCount - this.timeTableBreakDetailsList.length;
            for (let i = 0; i < breaksToAdd; i++) {
                this.timeTableBreakDetailsList.push(new institute_management_time_table_model_1.TimeTableBreakDetails());
            }
        }
        else if (this.timeTable.breaksCount < this.timeTableBreakDetailsList.length) {
            let breaksToRemove = this.timeTableBreakDetailsList.length - this.timeTable.breaksCount;
            for (let i = 0; i < breaksToRemove; i++) {
                this.timeTableBreakDetailsList.splice(this.timeTableBreakDetailsList.length - 1, 1);
            }
        }
    }
};
GenerateTimeTableManagementComponent = __decorate([
    core_1.Component({
        moduleId: module.id,
        templateUrl: 'institute-management-time-table-generate.html'
    }),
    __metadata("design:paramtypes", [loader_service_1.LoaderService,
        snackbar_service_1.SnackbarService,
        institute_management_time_table_service_1.TimeTableManagementService,
        router_1.Router,
        router_1.ActivatedRoute])
], GenerateTimeTableManagementComponent);
exports.GenerateTimeTableManagementComponent = GenerateTimeTableManagementComponent;
//# sourceMappingURL=institute-management-time-table-generate.component.js.map