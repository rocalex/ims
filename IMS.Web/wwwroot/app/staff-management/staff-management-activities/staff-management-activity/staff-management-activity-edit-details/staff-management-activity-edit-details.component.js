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
const keycodes_1 = require("@angular/cdk/keycodes");
const router_1 = require("@angular/router");
const loader_service_1 = require("../../../../../shared/loader-service");
const snackbar_service_1 = require("../../../../../shared/snackbar-service");
const staff_management_activity_service_1 = require("../staff-management-activity.service");
const staff_management_activity_model_1 = require("../staff-management-activity.model");
let EditDetailsStaffActivityManagementComponent = class EditDetailsStaffActivityManagementComponent {
    constructor(router, activatedRoute, staffActivityManagementService, loaderService, snackBar) {
        this.router = router;
        this.activatedRoute = activatedRoute;
        this.staffActivityManagementService = staffActivityManagementService;
        this.loaderService = loaderService;
        this.snackBar = snackBar;
        this.activity = new staff_management_activity_model_1.StaffActivity();
        this.meetingAgendaList = [];
        this.activityStatusList = [];
        this.errorMessage = '';
        this.currentDate = new Date();
        this.staffsList = [];
        this.studentsList = [];
        this.systemUsersList = [];
        this.activityAttendeeList = [];
        this.selectedUserType = null;
        this.separatorKeysCodes = [keycodes_1.ENTER, keycodes_1.COMMA];
        this.filteredUsers = [];
        this.attendeeTypeEnumDetails = [
            { key: staff_management_activity_model_1.ActivityAttendeeTypeEnum.Staff, value: 'Staff', class: 'staff' },
            { key: staff_management_activity_model_1.ActivityAttendeeTypeEnum.Student, value: 'Student', class: 'student' },
            { key: staff_management_activity_model_1.ActivityAttendeeTypeEnum.SystemUser, value: 'System User', class: 'systemuser' }
        ];
        this.isActivityAttendeeEmptyError = false;
        this.isInvalidDateError = false;
        this.activatedRoute.params.subscribe(param => this.activityId = param.id);
    }
    ngOnInit() {
        this.isActivityAttendeeEmptyError = false;
        this.isInvalidDateError = false;
        this.activity.activityAttendeeList = [];
        this.activityAttendeeList = [];
        this.getStaffActivityInitialData();
    }
    getStaffActivityInitialData() {
        this.loaderService.toggleLoader(true);
        this.staffActivityManagementService.getStaffActivityInitialData()
            .then(res => {
            let response = res.json();
            this.meetingAgendaList = response.meetingAgendaList;
            this.activityStatusList = response.activityStatusList;
            this.staffsList = response.staffsList;
            this.studentsList = response.studentsList;
            this.systemUsersList = response.systemUsersList;
            this.loaderService.toggleLoader(false);
            this.getActivityDetails();
        })
            .catch(err => {
            console.log(err.json());
            this.loaderService.toggleLoader(false);
        });
    }
    getActivityDetails() {
        this.loaderService.toggleLoader(true);
        this.staffActivityManagementService.getActivityDetailById(this.activityId)
            .then(res => {
            this.activity = res.json();
            this.activityAttendeeList = this.activity.activityAttendeeList;
            this.loaderService.toggleLoader(false);
            this.setInitialData();
        })
            .catch(err => {
            this.loaderService.toggleLoader(false);
        });
    }
    updateActivity() {
        if (this.activityAttendeeList.length === 0) {
            this.isActivityAttendeeEmptyError = true;
        }
        else if (new Date(this.activity.startDate) > new Date(this.activity.endDate)) {
            this.isInvalidDateError = true;
        }
        else {
            this.loaderService.toggleLoader(true);
            this.activity.startDate = this.convertDateToUtc(this.activity.startDate);
            this.activity.endDate = this.convertDateToUtc(this.activity.endDate);
            this.staffActivityManagementService.updateActivity(this.activity)
                .then(res => {
                let response = res.json();
                if (response.hasError === null || response.hasError === undefined || !response.hasError) {
                    this.snackBar.showSnackbar(response.message);
                    this.router.navigate(['staff', 'activities', 'activity', 'list']);
                }
                else {
                    this.errorMessage = response.message;
                }
                this.loaderService.toggleLoader(false);
            })
                .catch(err => {
                console.log(err.json());
                this.loaderService.toggleLoader(false);
            });
        }
    }
    checkWhiteSpace(model) {
        model.whiteSpaceError = '';
        if (this.activity.name.trim() === '') {
            model.whiteSpaceError = 'Activity Name can\'t be null or empty';
        }
    }
    resetError(model) {
        model.whiteSpaceError = '';
        this.errorMessage = '';
    }
    setInitialData() {
        // Staffs list
        this.staffsList.forEach(staff => {
            if (this.activity.activityAttendeeList.some(x => x.attendeeId === staff.userId && x.activityAttendeeType === staff_management_activity_model_1.ActivityAttendeeTypeEnum.Staff)) {
                staff.isSelected = true;
            }
        });
        // Students list
        this.studentsList.forEach(student => {
            if (this.activity.activityAttendeeList.some(x => x.attendeeId === student.userId && x.activityAttendeeType === staff_management_activity_model_1.ActivityAttendeeTypeEnum.Student)) {
                student.isSelected = true;
            }
        });
        // Students list
        this.systemUsersList.forEach(systemUser => {
            if (this.activity.activityAttendeeList.some(x => x.attendeeId === systemUser.id && x.activityAttendeeType === staff_management_activity_model_1.ActivityAttendeeTypeEnum.SystemUser)) {
                systemUser.isSelected = true;
            }
        });
    }
    convertDateToUtc(dateString) {
        var date = new Date(dateString);
        return new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()));
    }
    setFilterList() {
        if (this.selectedUserType === staff_management_activity_model_1.ActivityAttendeeTypeEnum.Staff) {
            this.filteredUsers = JSON.parse(JSON.stringify(this.staffsList));
        }
        else if (this.selectedUserType === staff_management_activity_model_1.ActivityAttendeeTypeEnum.Student) {
            this.filteredUsers = JSON.parse(JSON.stringify(this.studentsList));
        }
        else {
            this.filteredUsers = JSON.parse(JSON.stringify(this.systemUsersList));
        }
    }
    filterAttendees(attendeeName) {
        if (this.selectedUserType === staff_management_activity_model_1.ActivityAttendeeTypeEnum.Staff) {
            this.filteredUsers = JSON.parse(JSON.stringify(this.staffsList.filter(x => x.firstName.toLowerCase().includes(attendeeName.toLowerCase()))));
        }
        else if (this.selectedUserType === staff_management_activity_model_1.ActivityAttendeeTypeEnum.Student) {
            this.filteredUsers = JSON.parse(JSON.stringify(this.studentsList.filter(x => x.firstName.toLowerCase().includes(attendeeName.toLowerCase()))));
        }
        else {
            this.filteredUsers = JSON.parse(JSON.stringify(this.systemUsersList.filter(x => x.name.toLowerCase().includes(attendeeName.toLowerCase()))));
        }
    }
    selectAttendee(isSelected, attendeeName, attendeeType) {
        if (isSelected) {
            let selectedAttendee = {};
            if (this.selectedUserType === staff_management_activity_model_1.ActivityAttendeeTypeEnum.Staff) {
                selectedAttendee = this.staffsList.filter(x => x.firstName === attendeeName)[0];
            }
            else if (this.selectedUserType === staff_management_activity_model_1.ActivityAttendeeTypeEnum.Student) {
                selectedAttendee = this.studentsList.filter(x => x.firstName === attendeeName)[0];
            }
            else {
                selectedAttendee = this.systemUsersList.filter(x => x.name === attendeeName)[0];
            }
            let existingAttendee = this.activityAttendeeList.filter(x => x.attendeeId === selectedAttendee.id && x.activityAttendeeType === this.selectedUserType)[0];
            if (existingAttendee === null || existingAttendee === undefined) {
                let attendee = new staff_management_activity_model_1.ActivityAttendee();
                attendee.attendeeId = (this.selectedUserType === staff_management_activity_model_1.ActivityAttendeeTypeEnum.SystemUser) ? selectedAttendee.id : selectedAttendee.user.id;
                attendee.attendeeName = attendeeName;
                attendee.activityAttendeeType = this.selectedUserType;
                this.activityAttendeeList.push(attendee);
            }
        }
        else {
            let selectedAttendee = {};
            if (attendeeType === staff_management_activity_model_1.ActivityAttendeeTypeEnum.Staff) {
                selectedAttendee = this.staffsList.filter(x => x.firstName === attendeeName)[0];
            }
            else if (attendeeType === staff_management_activity_model_1.ActivityAttendeeTypeEnum.Student) {
                selectedAttendee = this.studentsList.filter(x => x.firstName === attendeeName)[0];
            }
            else {
                selectedAttendee = this.systemUsersList.filter(x => x.name === attendeeName)[0];
            }
            let existingAttendee = (attendeeType === staff_management_activity_model_1.ActivityAttendeeTypeEnum.SystemUser)
                ? this.activityAttendeeList.filter(x => x.attendeeId === selectedAttendee.id && x.activityAttendeeType === attendeeType)[0]
                : this.activityAttendeeList.filter(x => x.attendeeId === selectedAttendee.user.id && x.activityAttendeeType === attendeeType)[0];
            let index = this.activityAttendeeList.indexOf(existingAttendee);
            this.activityAttendeeList.splice(index, 1);
        }
    }
};
EditDetailsStaffActivityManagementComponent = __decorate([
    core_1.Component({
        moduleId: module.id,
        templateUrl: 'staff-management-activity-edit-details.html'
    }),
    __metadata("design:paramtypes", [router_1.Router,
        router_1.ActivatedRoute,
        staff_management_activity_service_1.StaffActivityManagementService,
        loader_service_1.LoaderService,
        snackbar_service_1.SnackbarService])
], EditDetailsStaffActivityManagementComponent);
exports.EditDetailsStaffActivityManagementComponent = EditDetailsStaffActivityManagementComponent;
//# sourceMappingURL=staff-management-activity-edit-details.component.js.map