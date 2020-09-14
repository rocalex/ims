import { Component, OnInit } from '@angular/core';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { Router, ActivatedRoute } from '@angular/router';

import { LoaderService } from '../../../../shared/loader-service';
import { SnackbarService } from '../../../../shared/snackbar-service';
import { StaffPlannerManagementService } from '../staff-management-planner.service';

import { StaffPlanner, PlannerAttendeeTypeEnum, PlannerAttendee } from '../staff-management-planner.model';

@Component({
    moduleId: module.id,
    templateUrl: 'staff-management-planner-edit-details.html'
})
export class EditDetailsStaffPlannerManagementComponent implements OnInit {

    planId: number;
    plan: StaffPlanner = new StaffPlanner();
    errorMessage: string = '';
    currentDate: Date = new Date();
    staffsList: any[] = [];
    studentsList: any[] = [];
    systemUsersList: any[] = [];
    plannerAttendeeList: PlannerAttendee[] = [];

    attendeeName: string;
    selectedUserType: PlannerAttendeeTypeEnum = null;
    separatorKeysCodes: number[] = [ENTER, COMMA];
    filteredUsers: any[] = [];
    filteredUserId: number;

    attendeeTypeEnumDetails: any[] = [
        { key: PlannerAttendeeTypeEnum.Staff, value: 'Staff', class: 'staff' },
        { key: PlannerAttendeeTypeEnum.Student, value: 'Student', class: 'student' },
        { key: PlannerAttendeeTypeEnum.SystemUser, value: 'System User', class: 'systemuser' }
    ];
    isPlannerAttendeeEmptyError: boolean = false;

    constructor(private router: Router,
        private activatedRoute: ActivatedRoute,
        private staffPlannerManagementService: StaffPlannerManagementService,
        private loaderService: LoaderService,
        private snackBar: SnackbarService) {

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
                        this.errorMessage = response.message
                    }

                    this.loaderService.toggleLoader(false);
                })
                .catch(err => {
                    console.log(err.json());
                    this.loaderService.toggleLoader(false);
                });
        }
    }

    checkWhiteSpace(model: any) {
        model.whiteSpaceError = '';
        if (this.plan.name.trim() === '') {
            model.whiteSpaceError = 'Plan Name can\'t be null or empty';
        }
    }

    resetError(model: any) {
        model.whiteSpaceError = '';
        this.errorMessage = '';
    }

    convertDateToUtc(dateString: any) {
        var date = new Date(dateString);
        return new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()));
    }

    setFilterList() {
        if (this.selectedUserType === PlannerAttendeeTypeEnum.Staff) {
            this.filteredUsers = JSON.parse(JSON.stringify(this.staffsList));
        }
        else if (this.selectedUserType === PlannerAttendeeTypeEnum.Student) {
            this.filteredUsers = JSON.parse(JSON.stringify(this.studentsList));
        }
        else {
            this.filteredUsers = JSON.parse(JSON.stringify(this.systemUsersList));
        }
    }

    filterAttendees(attendeeName: string) {
        if (this.selectedUserType === PlannerAttendeeTypeEnum.Staff) {
            this.filteredUsers = JSON.parse(JSON.stringify(this.staffsList.filter(x => x.firstName.toLowerCase().includes(attendeeName.toLowerCase()))));
        }
        else if (this.selectedUserType === PlannerAttendeeTypeEnum.Student) {
            this.filteredUsers = JSON.parse(JSON.stringify(this.studentsList.filter(x => x.firstName.toLowerCase().includes(attendeeName.toLowerCase()))));
        }
        else {
            this.filteredUsers = JSON.parse(JSON.stringify(this.systemUsersList.filter(x => x.name.toLowerCase().includes(attendeeName.toLowerCase()))));
        }
    }

    selectAttendee(isSelected: boolean, attendeeName: string, attendeeType: PlannerAttendeeTypeEnum) {
        if (isSelected) {
            let selectedAttendee: any = {};
            if (this.selectedUserType === PlannerAttendeeTypeEnum.Staff) {
                selectedAttendee = this.staffsList.filter(x => x.firstName === attendeeName)[0];
            }
            else if (this.selectedUserType === PlannerAttendeeTypeEnum.Student) {
                selectedAttendee = this.studentsList.filter(x => x.firstName === attendeeName)[0];
            }
            else {
                selectedAttendee = this.systemUsersList.filter(x => x.name === attendeeName)[0];
            }

            let existingAttendee = this.plannerAttendeeList.filter(x => x.attendeeId === selectedAttendee.id && x.plannerAttendeeType === this.selectedUserType)[0];
            if (existingAttendee === null || existingAttendee === undefined) {
                let attendee = new PlannerAttendee();
                attendee.attendeeId = (this.selectedUserType === PlannerAttendeeTypeEnum.SystemUser) ? selectedAttendee.id : selectedAttendee.user.id;
                attendee.attendeeName = attendeeName;
                attendee.plannerAttendeeType = this.selectedUserType;
                this.plannerAttendeeList.push(attendee);
            }
        }
        else {
            let selectedAttendee: any = {};
            if (attendeeType === PlannerAttendeeTypeEnum.Staff) {
                selectedAttendee = this.staffsList.filter(x => x.firstName === attendeeName)[0];
            }
            else if (attendeeType === PlannerAttendeeTypeEnum.Student) {
                selectedAttendee = this.studentsList.filter(x => x.firstName === attendeeName)[0];
            }
            else {
                selectedAttendee = this.systemUsersList.filter(x => x.name === attendeeName)[0];
            }

            let existingAttendee = (attendeeType === PlannerAttendeeTypeEnum.SystemUser)
                ? this.plannerAttendeeList.filter(x => x.attendeeId === selectedAttendee.id && x.plannerAttendeeType === attendeeType)[0]
                : this.plannerAttendeeList.filter(x => x.attendeeId === selectedAttendee.user.id && x.plannerAttendeeType === attendeeType)[0];
            let index = this.plannerAttendeeList.indexOf(existingAttendee);
            this.plannerAttendeeList.splice(index, 1);
        }
    }
}
