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
const loader_service_1 = require("../../../../../shared/loader-service");
const snackbar_service_1 = require("../../../../../shared/snackbar-service");
const staff_management_notice_service_1 = require("../staff-management-notice.service");
const staff_management_notice_model_1 = require("../staff-management-notice.model");
let AddNoticeManagementComponent = class AddNoticeManagementComponent {
    constructor(router, noticeManagementService, loaderService, snackbarService) {
        this.router = router;
        this.noticeManagementService = noticeManagementService;
        this.loaderService = loaderService;
        this.snackbarService = snackbarService;
        this.notice = new staff_management_notice_model_1.CircularNotice();
        this.currentDate = new Date();
        this.staffsList = [];
        this.studentsList = [];
        this.filteredStudentsList = [];
        this.systemUsersList = [];
        this.classList = [];
        this.sectionsList = [];
        this.circularNoticeRecipientsList = [];
        this.noticeTypeEnumDetails = [
            { key: staff_management_notice_model_1.NoticeTypeEnum.Circular, value: 'Circular' },
            { key: staff_management_notice_model_1.NoticeTypeEnum.Notice, value: 'Notice' }
        ];
        this.noticeToEnumDetails = [
            { key: staff_management_notice_model_1.NoticeToEnum.AllStudents, value: 'All Students' },
            { key: staff_management_notice_model_1.NoticeToEnum.AllStaffs, value: 'All Staffs' },
            { key: staff_management_notice_model_1.NoticeToEnum.Student, value: 'Student' },
            { key: staff_management_notice_model_1.NoticeToEnum.Staff, value: 'Staff' },
            { key: staff_management_notice_model_1.NoticeToEnum.SystemUser, value: 'System User' }
        ];
        this.isEmptyNoticeMessageError = false;
        this.isEmptyRecipientsListError = false;
    }
    ngOnInit() {
        this.notice.circularNoticeRecipientsList = [];
        this.circularNoticeRecipientsList = [];
        this.selectedClassId = 0;
        this.selectedSectionId = 0;
        this.getNoticeInitialData();
    }
    getNoticeInitialData() {
        this.loaderService.toggleLoader(true);
        this.noticeManagementService.getInitialData()
            .then(res => {
            let response = res.json();
            this.staffsList = response.staffsList;
            this.studentsList = response.studentsList;
            this.systemUsersList = response.systemUsersList;
            this.classList = response.classList;
            this.classList.unshift({ id: 0, name: 'All' });
            this.sectionsList = response.sectionsList;
            this.sectionsList.unshift({ id: 0, name: 'All' });
            this.filterStudentsList();
            this.loaderService.toggleLoader(false);
        })
            .catch(err => {
            this.loaderService.toggleLoader(false);
        });
    }
    checkWhiteSpace() {
        if (this.notice.message !== null && this.notice.message !== undefined && this.notice.message.trim() === '') {
            this.isEmptyNoticeMessageError = true;
        }
    }
    resetError() {
        this.errorMessage = '';
        if (this.notice.message !== null && this.notice.message !== undefined && this.notice.message.trim() !== '') {
            this.isEmptyNoticeMessageError = false;
        }
    }
    checkboxChange(isSelected, recipientId, recipientTypeEnum) {
        if (isSelected) {
            let recipient = new staff_management_notice_model_1.CircularNoticeRecipient();
            recipient.recipientId = recipientId;
            recipient.recipientType = recipientTypeEnum;
            this.circularNoticeRecipientsList.push(recipient);
        }
        else {
            let existingRecipient = this.circularNoticeRecipientsList.filter(x => x.recipientId === recipientId && x.recipientType === recipientTypeEnum)[0];
            let index = this.circularNoticeRecipientsList.indexOf(existingRecipient);
            this.circularNoticeRecipientsList.splice(index, 1);
        }
    }
    addNotice(isNotificationSendingEnabled) {
        if (this.circularNoticeRecipientsList.length === 0) {
            this.isEmptyRecipientsListError = true;
        }
        else {
            this.notice.isNotificationSendingEnabled = isNotificationSendingEnabled;
            this.isEmptyRecipientsListError = false;
            this.notice.circularNoticeRecipientsList = this.circularNoticeRecipientsList;
            this.loaderService.toggleLoader(true);
            this.noticeManagementService.addNotice(this.notice)
                .then(res => {
                let response = res.json();
                if (response.hasError === null || response.hasError === undefined || !response.hasError) {
                    this.snackbarService.showSnackbar(response.message);
                    this.router.navigate(['staff', 'activities', 'notice', 'list']);
                }
                else {
                    this.errorMessage = response.message;
                }
                this.loaderService.toggleLoader(false);
            })
                .catch(err => {
                this.loaderService.toggleLoader(false);
            });
        }
    }
    setRecipientsListForAllSelected() {
        if (this.notice.noticeTo === staff_management_notice_model_1.NoticeToEnum.AllStaffs) {
            this.circularNoticeRecipientsList = [];
            for (let i = 0; i < this.staffsList.length; i++) {
                this.staffsList[i].isSelected = true;
                this.staffsList[i].isDisabled = true;
                let recipient = new staff_management_notice_model_1.CircularNoticeRecipient();
                recipient.recipientId = this.staffsList[i].userId;
                recipient.recipientType = staff_management_notice_model_1.NoticeToEnum.AllStaffs;
                this.circularNoticeRecipientsList.push(recipient);
            }
        }
        else if (this.notice.noticeTo === staff_management_notice_model_1.NoticeToEnum.AllStudents) {
            this.circularNoticeRecipientsList = [];
            for (let i = 0; i < this.filteredStudentsList.length; i++) {
                this.filteredStudentsList[i].isSelected = true;
                this.filteredStudentsList[i].isDisabled = true;
                let recipient = new staff_management_notice_model_1.CircularNoticeRecipient();
                recipient.recipientId = this.filteredStudentsList[i].userId;
                recipient.recipientType = staff_management_notice_model_1.NoticeToEnum.AllStudents;
                this.circularNoticeRecipientsList.push(recipient);
            }
        }
        else {
            this.circularNoticeRecipientsList = [];
            for (let i = 0; i < this.staffsList.length; i++) {
                this.staffsList[i].isSelected = false;
                this.staffsList[i].isDisabled = false;
            }
            for (let i = 0; i < this.filteredStudentsList.length; i++) {
                this.filteredStudentsList[i].isSelected = false;
                this.filteredStudentsList[i].isDisabled = false;
            }
            for (let i = 0; i < this.systemUsersList.length; i++) {
                this.systemUsersList[i].isSelected = false;
            }
        }
    }
    filterStudentsList() {
        // Filter data
        if (this.selectedClassId === 0 && this.selectedSectionId === 0) {
            this.filteredStudentsList = JSON.parse(JSON.stringify(this.studentsList));
        }
        else if (this.selectedClassId !== 0 && this.selectedSectionId === 0) {
            this.filteredStudentsList = JSON.parse(JSON.stringify(this.studentsList.filter(x => x.currentClassId === this.selectedClassId)));
        }
        else if (this.selectedClassId === 0 && this.selectedSectionId !== 0) {
            this.filteredStudentsList = JSON.parse(JSON.stringify(this.studentsList.filter(x => x.sectionId === this.selectedSectionId)));
        }
        else {
            this.filteredStudentsList = JSON.parse(JSON.stringify(this.studentsList.filter(x => x.sectionId === this.selectedSectionId && x.currentClassId === this.selectedClassId)));
        }
        // Set selected data
        this.filteredStudentsList.forEach(student => {
            if (this.circularNoticeRecipientsList.some(x => x.recipientId == student.userId)) {
                student.isSelected = true;
            }
        });
    }
};
AddNoticeManagementComponent = __decorate([
    core_1.Component({
        moduleId: module.id,
        templateUrl: 'staff-management-notice-add.html'
    }),
    __metadata("design:paramtypes", [router_1.Router,
        staff_management_notice_service_1.StaffNoticeManagementService,
        loader_service_1.LoaderService,
        snackbar_service_1.SnackbarService])
], AddNoticeManagementComponent);
exports.AddNoticeManagementComponent = AddNoticeManagementComponent;
//# sourceMappingURL=staff-management-notice-add.component.js.map