import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { LoaderService } from '../../../shared/loader-service';
import { SnackbarService } from '../../../shared/snackbar-service';
import { StudentManagementNotificationService } from './student-management-notification.service';
import { StudentNotification, NotificationTypeEnum } from './student-management-notification.model';

@Component({
    moduleId: module.id,
    templateUrl: 'student-management-notification.html'
})
export class StudentManagementNotificationComponent implements OnInit {

    studentId: number;
    studentNotificationDetails: StudentNotification = new StudentNotification();
    studentNotificationDetailsCopy: StudentNotification = new StudentNotification();
    errorMessage: string = '';
    subjectErrorMessage: string = '';
    notificationTypes: any[] = [
        { enumKey: NotificationTypeEnum.Email, enumValue: NotificationTypeEnum[NotificationTypeEnum.Email] },
        { enumKey: NotificationTypeEnum.Sms, enumValue: NotificationTypeEnum[NotificationTypeEnum.Sms].toUpperCase() }
    ];

    constructor(private studentManagementNotificationService: StudentManagementNotificationService,
        private loaderService: LoaderService,
        private snackbarService: SnackbarService,
        private activatedRoute: ActivatedRoute,
        private router: Router) {

        this.activatedRoute.params.subscribe(param => this.studentId = param.id);
    }

    ngOnInit() {
        this.getStudentDetails();
    }

    getStudentDetails() {
        this.loaderService.toggleLoader(true);
        this.studentManagementNotificationService.getStudentDetails(this.studentId)
            .then(res => {
                this.studentNotificationDetails = res.json();
                this.studentNotificationDetailsCopy = JSON.parse(JSON.stringify(this.studentNotificationDetails));
                this.loaderService.toggleLoader(false);
            })
            .catch(err => {
                this.loaderService.toggleLoader(false);
            });
    }

    resetModel() {
        this.studentNotificationDetails.email = this.studentNotificationDetailsCopy.email;
        this.studentNotificationDetails.phoneNumber = this.studentNotificationDetailsCopy.phoneNumber;
        this.studentNotificationDetails.message = this.studentNotificationDetailsCopy.message;
        this.studentNotificationDetails.subject = this.studentNotificationDetailsCopy.subject;
    }

    resetError() {
        if (this.studentNotificationDetails.message !== null && this.studentNotificationDetails.message !== undefined && this.studentNotificationDetails.message !== '') {
            this.errorMessage = '';
        }
        if (this.studentNotificationDetails.subject !== null && this.studentNotificationDetails.subject !== undefined && this.studentNotificationDetails.subject !== '') {
            this.subjectErrorMessage = '';
        }
    }

    sendNotification() {
        if (this.studentNotificationDetails.message === null || this.studentNotificationDetails.message === undefined || this.studentNotificationDetails.message === '') {
            this.errorMessage = 'Message can not be empty';
        }
        else if (this.studentNotificationDetails.subject === null || this.studentNotificationDetails.subject === undefined || this.studentNotificationDetails.subject.trim() === '') {
            this.subjectErrorMessage = 'Subject can not be empty';
        }
        else {
            this.studentNotificationDetails.studentId = this.studentId;
            this.loaderService.toggleLoader(true);
            this.studentManagementNotificationService.sendNotification(this.studentNotificationDetails)
                .then(res => {
                    let response = res.json();
                    this.snackbarService.showSnackbar(response.message);
                    this.loaderService.toggleLoader(false);

                    if (response.hasError === null || response.hasError === undefined || !response.hasError) {
                        this.router.navigate(['student', 'information', 'list']);
                    }
                })
                .catch(err => {
                    this.loaderService.toggleLoader(false);
                });
        }
    }
}
