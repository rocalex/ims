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
const loader_service_1 = require("../../../shared/loader-service");
const permission_service_1 = require("../../../shared/permission.service");
const snackbar_service_1 = require("../../../shared/snackbar-service");
const timesheets_model_1 = require("./timesheets.model");
const timesheets_service_1 = require("./timesheets.service");
let TimesheetsComponent = class TimesheetsComponent {
    constructor(loaderService, permissionService, apiService, snackService) {
        this.loaderService = loaderService;
        this.permissionService = permissionService;
        this.apiService = apiService;
        this.snackService = snackService;
        this.payrollTypeList = [
            { id: 1, name: "Daily" },
            { id: 2, name: "Monthly" }
        ];
        this.academicYearList = [];
        this.teacherList = [];
        this.searchTimesheet = new timesheets_model_1.TimesheetsSearchModel();
        this.isMonthType = false;
        this.isDailyType = false;
        this.isSearched = false;
        this.presentList = [];
        this.monthList = [
            { id: 1, name: "January" },
            { id: 2, name: "Febrary" },
            { id: 3, name: "March" },
            { id: 4, name: "April" },
            { id: 5, name: "May" },
            { id: 6, name: "June" },
            { id: 7, name: "July" },
            { id: 8, name: "August" },
            { id: 9, name: "September" },
            { id: 10, name: "October" },
            { id: 11, name: "November" },
            { id: 12, name: "December" },
        ];
        this.presentTypeList = [
            { id: 0, name: "Absent" },
            { id: 1, name: "Full Day" },
            { id: 2, name: "Half Day" },
            { id: 3, name: "Leave" }
        ];
    }
    ngOnInit() {
        this.getStaffList();
    }
    getStaffList() {
        this.loaderService.toggleLoader(true);
        this.apiService.getStaffList().then(res => {
            let response = res.json();
            if (response.hasError !== null && response.hasError !== undefined && response.hasError) {
                this.snackService.showSnackbar(response.message);
                return;
            }
            this.teacherList = response;
            this.getAcademicList();
        }).catch(err => {
            this.loaderService.toggleLoader(false);
        });
    }
    changePayrollType(value) {
        if (value == 1) {
            this.isDailyType = true;
            this.isMonthType = false;
        }
        else {
            this.isDailyType = false;
            this.isMonthType = true;
        }
    }
    changeTeacher(teacher) {
        this.searchTimesheet.teacher = teacher.id;
    }
    getAcademicList() {
        this.apiService.getAcademicList().then(res => {
            let response = res.json();
            if (response.hasError !== null && response.hasError !== undefined && response.hasError) {
                this.snackService.showSnackbar(response.message);
                return;
            }
            this.academicYearList = response;
            this.loaderService.toggleLoader(false);
        }).catch(err => {
            this.loaderService.toggleLoader(false);
        });
    }
    fullName(staff) {
        return staff.firstName + ' ' + (staff.middleName ? staff.middleName : '') + ' ' + staff.lastName;
    }
    changePresentType(presentType) {
        for (var i = 0; i < this.presentList.length; i++) {
            this.presentList[i].presenceType = presentType;
        }
    }
    save() {
        if (this.isDailyType) {
            this.loaderService.toggleLoader(true);
            this.apiService.saveTimesheetsByDate(this.presentList[0]).then(res => {
                let response = res.json();
                if (response.hasError !== null && response.hasError !== undefined && response.hasError) {
                    this.snackService.showSnackbar(response.message);
                    return;
                }
                this.presentList = [];
                this.isSearched = false;
                this.loaderService.toggleLoader(false);
            }).catch(err => {
                this.loaderService.toggleLoader(false);
            });
        }
        if (this.isMonthType) {
            this.loaderService.toggleLoader(true);
            this.apiService.saveTimesheetByMonth(this.presentList).then(res => {
                let response = res.json();
                if (response.hasError !== null && response.hasError !== undefined && response.hasError) {
                    this.snackService.showSnackbar(response.message);
                    return;
                }
                this.presentList = [];
                this.isSearched = false;
                this.loaderService.toggleLoader(false);
            }).catch(err => {
                this.loaderService.toggleLoader(false);
            });
        }
    }
    search() {
        this.isSearched = true;
        if (this.isDailyType) {
            this.loaderService.toggleLoader(true);
            this.apiService.getTimesheetsForStaffByDate(this.searchTimesheet.teacher, this.searchTimesheet.fromDate).then(res => {
                let response = res.json();
                if (response.hasError !== null && response.hasError !== undefined && response.hasError) {
                    this.snackService.showSnackbar(response.message);
                    return;
                }
                this.presentList = [];
                this.presentList.push(response);
                this.loaderService.toggleLoader(false);
            }).catch(err => {
                this.loaderService.toggleLoader(false);
            });
        }
        if (this.isMonthType) {
            this.loaderService.toggleLoader(true);
            this.apiService.getTimesheetsForStaffByMonth(this.searchTimesheet.teacher, this.searchTimesheet.month).then(res => {
                let response = res.json();
                if (response.hasError !== null && response.hasError !== undefined && response.hasError) {
                    this.snackService.showSnackbar(response.message);
                    return;
                }
                this.presentList = response;
                this.loaderService.toggleLoader(false);
            }).catch(err => {
                this.loaderService.toggleLoader(false);
            });
        }
    }
};
TimesheetsComponent = __decorate([
    core_1.Component({
        selector: 'app-timesheets',
        templateUrl: './timesheets.component.html',
        styleUrls: ['./timesheets.component.css']
    }),
    __metadata("design:paramtypes", [loader_service_1.LoaderService,
        permission_service_1.PermissionService,
        timesheets_service_1.TimeSheetService,
        snackbar_service_1.SnackbarService])
], TimesheetsComponent);
exports.TimesheetsComponent = TimesheetsComponent;
//# sourceMappingURL=timesheets.component.js.map