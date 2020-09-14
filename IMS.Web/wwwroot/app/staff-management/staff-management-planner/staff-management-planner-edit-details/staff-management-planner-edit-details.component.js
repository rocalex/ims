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
const loader_service_1 = require("../../../../shared/loader-service");
const snackbar_service_1 = require("../../../../shared/snackbar-service");
const staff_management_planner_service_1 = require("../staff-management-planner.service");
const staff_management_planner_model_1 = require("../staff-management-planner.model");
let EditDetailsStaffPlannerManagementComponent = class EditDetailsStaffPlannerManagementComponent {
    constructor(router, activatedRoute, staffPlannerManagementService, loaderService, snackBar) {
        this.router = router;
        this.activatedRoute = activatedRoute;
        this.staffPlannerManagementService = staffPlannerManagementService;
        this.loaderService = loaderService;
        this.snackBar = snackBar;
        this.plan = new staff_management_planner_model_1.StaffPlanner();
        this.errorMessage = '';
        this.currentDate = new Date();
        this.staffsList = [];
        this.studentsList = [];
        this.systemUsersList = [];
        this.plannerAttendeeList = [];
        this.selectedUserType = null;
        this.separatorKeysCodes = [keycodes_1.ENTER, keycodes_1.COMMA];
        this.filteredUsers = [];
        this.attendeeTypeEnumDetails = [
            { key: staff_management_planner_model_1.PlannerAttendeeTypeEnum.Staff, value: 'Staff', class: 'staff' },
            { key: staff_management_planner_model_1.PlannerAttendeeTypeEnum.Student, value: 'Student', class: 'student' },
            { key: staff_management_planner_model_1.PlannerAttendeeTypeEnum.SystemUser, value: 'System User', class: 'systemuser' }
        ];
        this.isPlannerAttendeeEmptyError = false;
        this.activatedRoute.params.subscribe(param => this.planId = param.id);
    }
    ngOnInit() {
        this.isPlannerAttendeeEmptyError = false;
        this.plan.plannerAttendeeList = [];
        this.plannerAttendeeList = [];
        this.getStaffPlanInitialData();
    }
    getStaffPlanInitialData() {
        this.loaderService.toggleLoader(true);
        this.staffPlannerManagementService.getStaffPlanInitialData()
            .then(res => {
            let response = res.json();
            this.staffsList = response.staffsList;
            this.studentsList = response.studentsList;
            this.systemUsersList = response.systemUsersList;
            this.loaderService.toggleLoader(false);
            this.getStaffPlanDetailById();
        })
            .catch(err => {
            console.log(err.json());
            this.loaderService.toggleLoader(false);
        });
    }
    getStaffPlanDetailById() {
        this.loaderService.toggleLoader(true);
        this.staffPlannerManagementService.getStaffPlanDetailById(this.planId)
            .then(res => {
            this.plan = res.json();
            this.plannerAttendeeList = this.plan.plannerAttendeeList;
            this.loaderService.toggleLoader(false);
        })
            .catch(err => {
            console.log(err.json());
            this.loaderService.toggleLoader(false);
        });
    }
    updateStaffPlan() {
        if (this.plannerAttendeeList.length === 0) {
            this.isPlannerAttendeeEmptyError = true;
        }
        else {
            this.isPlannerAttendeeEmptyError = false;
            this.plan.plannerAttendeeList = this.plannerAttendeeList;
            this.plan.dateOfPlan = this.convertDateToUtc(this.plan.dateOfPlan);
            this.loaderService.toggleLoader(true);
            this.staffPlannerManagementService.updateStaffPlan(this.plan)
                .then(res => {
                let response = res.json();
                if (response.hasError === null || response.hasError === undefined || !response.hasError) {
                    this.snackBar.showSnackbar(response.message);
                    this.router.navigate(['staff', 'planner', 'list']);
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
        if (this.plan.name.trim() === '') {
            model.whiteSpaceError = 'Plan Name can\'t be null or empty';
        }
    }
    resetError(model) {
        model.whiteSpaceError = '';
        this.errorMessage = '';
    }
    convertDateToUtc(dateString) {
        var date = new Date(dateString);
        return new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()));
    }
    setFilterList() {
        if (this.selectedUserType === staff_management_planner_model_1.PlannerAttendeeTypeEnum.Staff) {
            this.filteredUsers = JSON.parse(JSON.stringify(this.staffsList));
        }
        else if (this.selectedUserType === staff_management_planner_model_1.PlannerAttendeeTypeEnum.Student) {
            this.filteredUsers = JSON.parse(JSON.stringify(this.studentsList));
        }
        else {
            this.filteredUsers = JSON.parse(JSON.stringify(this.systemUsersList));
        }
    }
    filterAttendees(attendeeName) {
        if (this.selectedUserType === staff_management_planner_model_1.PlannerAttendeeTypeEnum.Staff) {
            this.filteredUsers = JSON.parse(JSON.stringify(this.staffsList.filter(x => x.firstName.toLowerCase().includes(attendeeName.toLowerCase()))));
        }
        else if (this.selectedUserType === staff_management_planner_model_1.PlannerAttendeeTypeEnum.Student) {
            this.filteredUsers = JSON.parse(JSON.stringify(this.studentsList.filter(x => x.firstName.toLowerCase().includes(attendeeName.toLowerCase()))));
        }
        else {
            this.filteredUsers = JSON.parse(JSON.stringify(this.systemUsersList.filter(x => x.name.toLowerCase().includes(attendeeName.toLowerCase()))));
        }
    }
    selectAttendee(isSelected, attendeeName, attendeeType) {
        if (isSelected) {
            let selectedAttendee = {};
            if (this.selectedUserType === staff_management_planner_model_1.PlannerAttendeeTypeEnum.Staff) {
                selectedAttendee = this.staffsList.filter(x => x.firstName === attendeeName)[0];
            }
            else if (this.selectedUserType === staff_management_planner_model_1.PlannerAttendeeTypeEnum.Student) {
                selectedAttendee = this.studentsList.filter(x => x.firstName === attendeeName)[0];
            }
            else {
                selectedAttendee = this.systemUsersList.filter(x => x.name === attendeeName)[0];
            }
            let existingAttendee = this.plannerAttendeeList.filter(x => x.attendeeId === selectedAttendee.id && x.plannerAttendeeType === this.selectedUserType)[0];
            if (existingAttendee === null || existingAttendee === undefined) {
                let attendee = new staff_management_planner_model_1.PlannerAttendee();
                attendee.attendeeId = (this.selectedUserType === staff_management_planner_model_1.PlannerAttendeeTypeEnum.SystemUser) ? selectedAttendee.id : selectedAttendee.user.id;
                attendee.attendeeName = attendeeName;
                attendee.plannerAttendeeType = this.selectedUserType;
                this.plannerAttendeeList.push(attendee);
            }
        }
        else {
            let selectedAttendee = {};
            if (attendeeType === staff_management_planner_model_1.PlannerAttendeeTypeEnum.Staff) {
                selectedAttendee = this.staffsList.filter(x => x.firstName === attendeeName)[0];
            }
            else if (attendeeType === staff_management_planner_model_1.PlannerAttendeeTypeEnum.Student) {
                selectedAttendee = this.studentsList.filter(x => x.firstName === attendeeName)[0];
            }
            else {
                selectedAttendee = this.systemUsersList.filter(x => x.name === attendeeName)[0];
            }
            let existingAttendee = (attendeeType === staff_management_planner_model_1.PlannerAttendeeTypeEnum.SystemUser)
                ? this.plannerAttendeeList.filter(x => x.attendeeId === selectedAttendee.id && x.plannerAttendeeType === attendeeType)[0]
                : this.plannerAttendeeList.filter(x => x.attendeeId === selectedAttendee.user.id && x.plannerAttendeeType === attendeeType)[0];
            let index = this.plannerAttendeeList.indexOf(existingAttendee);
            this.plannerAttendeeList.splice(index, 1);
        }
    }
};
EditDetailsStaffPlannerManagementComponent = __decorate([
    core_1.Component({
        moduleId: module.id,
        templateUrl: 'staff-management-planner-edit-details.html'
    }),
    __metadata("design:paramtypes", [router_1.Router,
        router_1.ActivatedRoute,
        staff_management_planner_service_1.StaffPlannerManagementService,
        loader_service_1.LoaderService,
        snackbar_service_1.SnackbarService])
], EditDetailsStaffPlannerManagementComponent);
exports.EditDetailsStaffPlannerManagementComponent = EditDetailsStaffPlannerManagementComponent;
//# sourceMappingURL=staff-management-planner-edit-details.component.js.map