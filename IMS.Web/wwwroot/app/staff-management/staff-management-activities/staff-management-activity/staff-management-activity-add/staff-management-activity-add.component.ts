import { Component, OnInit } from '@angular/core';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { Router } from '@angular/router';

import { LoaderService } from '../../../../../shared/loader-service';
import { SnackbarService } from '../../../../../shared/snackbar-service';
import { StaffActivityManagementService } from '../staff-management-activity.service';

import { StaffActivity, ActivityAttendeeTypeEnum, ActivityAttendee } from '../staff-management-activity.model';

@Component({
    moduleId: module.id,
    templateUrl: 'staff-management-activity-add.html'
})
export class AddStaffActivityManagementComponent implements OnInit {

    activity: StaffActivity = new StaffActivity();
    errorMessage: string = '';
    meetingAgendaList: any[] = [];
    activityStatusList: any[] = [];
    currentDate: Date = new Date();
    staffsList: any[] = [];
    studentsList: any[] = [];
    systemUsersList: any[] = [];
    activityAttendeeList: ActivityAttendee[] = [];

    attendeeName: string;
    selectedUserType: ActivityAttendeeTypeEnum = null;
    separatorKeysCodes: number[] = [ENTER, COMMA];
    filteredUsers: any[] = [];
    filteredUserId: number;

    attendeeTypeEnumDetails: any[] = [
        { key: ActivityAttendeeTypeEnum.Staff, value: 'Staff', class: 'staff' },
        { key: ActivityAttendeeTypeEnum.Student, value: 'Student', class: 'student' },
        { key: ActivityAttendeeTypeEnum.SystemUser, value: 'System User', class: 'systemuser' }
    ];
    isActivityAttendeeEmptyError: boolean = false;
    isInvalidDateError: boolean = false;

    constructor(private router: Router,
        private staffActivityManagementService: StaffActivityManagementService,
        private loaderService: LoaderService,
        private snackBar: SnackbarService) { }

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
            })
            .catch(err => {
                console.log(err.json());
                this.loaderService.toggleLoader(false);
            });
    }

    addActivity() {
        if (this.activityAttendeeList.length === 0) {
            this.isActivityAttendeeEmptyError = true;
        }
        else if (new Date(this.activity.startDate) > new Date(this.activity.endDate)) {
            this.isInvalidDateError = true;
        }
        else {
            this.isActivityAttendeeEmptyError = false;
            this.activity.activityAttendeeList = this.activityAttendeeList;
            this.loaderService.toggleLoader(true);
            this.activity.startDate = this.convertDateToUtc(this.activity.startDate);
            this.activity.endDate = this.convertDateToUtc(this.activity.endDate);
            this.staffActivityManagementService.addActivity(this.activity)
                .then(res => {
                    let response = res.json();

                    if (response.hasError === null || response.hasError === undefined || !response.hasError) {
                        this.snackBar.showSnackbar(response.message);
                        this.router.navigate(['staff', 'activities', 'activity', 'list']);
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
        if (this.activity.name.trim() === '') {
            model.whiteSpaceError = 'Activity Name can\'t be null or empty';
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
        if (this.selectedUserType === ActivityAttendeeTypeEnum.Staff) {
            this.filteredUsers = JSON.parse(JSON.stringify(this.staffsList));
        }
        else if (this.selectedUserType === ActivityAttendeeTypeEnum.Student) {
            this.filteredUsers = JSON.parse(JSON.stringify(this.studentsList));
        }
        else {
            this.filteredUsers = JSON.parse(JSON.stringify(this.systemUsersList));
        }
    }

    filterAttendees(attendeeName: string) {
        if (this.selectedUserType === ActivityAttendeeTypeEnum.Staff) {
            this.filteredUsers = JSON.parse(JSON.stringify(this.staffsList.filter(x => x.firstName.toLowerCase().includes(attendeeName.toLowerCase()))));
        }
        else if (this.selectedUserType === ActivityAttendeeTypeEnum.Student) {
            this.filteredUsers = JSON.parse(JSON.stringify(this.studentsList.filter(x => x.firstName.toLowerCase().includes(attendeeName.toLowerCase()))));
        }
        else {
            this.filteredUsers = JSON.parse(JSON.stringify(this.systemUsersList.filter(x => x.name.toLowerCase().includes(attendeeName.toLowerCase()))));
        }
    }

    selectAttendee(isSelected: boolean, attendeeName: string, attendeeType: ActivityAttendeeTypeEnum) {
        if (isSelected) {
            let selectedAttendee: any = {};
            if (this.selectedUserType === ActivityAttendeeTypeEnum.Staff) {
                selectedAttendee = this.staffsList.filter(x => x.firstName === attendeeName)[0];
            }
            else if (this.selectedUserType === ActivityAttendeeTypeEnum.Student) {
                selectedAttendee = this.studentsList.filter(x => x.firstName === attendeeName)[0];
            }
            else {
                selectedAttendee = this.systemUsersList.filter(x => x.name === attendeeName)[0];
            }

            let existingAttendee = this.activityAttendeeList.filter(x => x.attendeeId === selectedAttendee.id && x.activityAttendeeType === this.selectedUserType)[0];
            if (existingAttendee === null || existingAttendee === undefined) {
                let attendee = new ActivityAttendee();
                attendee.attendeeId = (this.selectedUserType === ActivityAttendeeTypeEnum.SystemUser) ? selectedAttendee.id : selectedAttendee.user.id;
                attendee.attendeeName = attendeeName;
                attendee.activityAttendeeType = this.selectedUserType;
                this.activityAttendeeList.push(attendee);
            }
        }
        else {
            let selectedAttendee: any = {};
            if (attendeeType === ActivityAttendeeTypeEnum.Staff) {
                selectedAttendee = this.staffsList.filter(x => x.firstName === attendeeName)[0];
            }
            else if (attendeeType === ActivityAttendeeTypeEnum.Student) {
                selectedAttendee = this.studentsList.filter(x => x.firstName === attendeeName)[0];
            }
            else {
                selectedAttendee = this.systemUsersList.filter(x => x.name === attendeeName)[0];
            }

            let existingAttendee = (attendeeType === ActivityAttendeeTypeEnum.SystemUser)
                ? this.activityAttendeeList.filter(x => x.attendeeId === selectedAttendee.id && x.activityAttendeeType === attendeeType)[0]
                : this.activityAttendeeList.filter(x => x.attendeeId === selectedAttendee.user.id && x.activityAttendeeType === attendeeType)[0];
            let index = this.activityAttendeeList.indexOf(existingAttendee);
            this.activityAttendeeList.splice(index, 1);
        }
    }
}
