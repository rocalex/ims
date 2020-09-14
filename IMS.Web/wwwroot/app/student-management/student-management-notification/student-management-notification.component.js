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
const loader_service_1 = require("../../../shared/loader-service");
const snackbar_service_1 = require("../../../shared/snackbar-service");
const student_management_notification_service_1 = require("./student-management-notification.service");
const student_management_notification_model_1 = require("./student-management-notification.model");
let StudentManagementNotificationComponent = class StudentManagementNotificationComponent {
    constructor(studentManagementNotificationService, loaderService, snackbarService, activatedRoute, router) {
        this.studentManagementNotificationService = studentManagementNotificationService;
        this.loaderService = loaderService;
        this.snackbarService = snackbarService;
        this.activatedRoute = activatedRoute;
        this.router = router;
        this.studentNotificationDetails = new student_management_notification_model_1.StudentNotification();
        this.studentNotificationDetailsCopy = new student_management_notification_model_1.StudentNotification();
        this.errorMessage = '';
        this.subjectErrorMessage = '';
        this.notificationTypes = [
            { enumKey: student_management_notification_model_1.NotificationTypeEnum.Email, enumValue: student_management_notification_model_1.NotificationTypeEnum[student_management_notification_model_1.NotificationTypeEnum.Email] },
            { enumKey: student_management_notification_model_1.NotificationTypeEnum.Sms, enumValue: student_management_notification_model_1.NotificationTypeEnum[student_management_notification_model_1.NotificationTypeEnum.Sms].toUpperCase() }
        ];
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
};
StudentManagementNotificationComponent = __decorate([
    core_1.Component({
        moduleId: module.id,
        templateUrl: 'student-management-notification.html'
    }),
    __metadata("design:paramtypes", [student_management_notification_service_1.StudentManagementNotificationService,
        loader_service_1.LoaderService,
        snackbar_service_1.SnackbarService,
        router_1.ActivatedRoute,
        router_1.Router])
], StudentManagementNotificationComponent);
exports.StudentManagementNotificationComponent = StudentManagementNotificationComponent;
//# sourceMappingURL=student-management-notification.component.js.map