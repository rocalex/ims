import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { LoaderService } from '../../../../../shared/loader-service';
import { SnackbarService } from '../../../../../shared/snackbar-service';
import { StaffNoticeManagementService } from '../staff-management-notice.service';

import { CircularNotice, CircularNoticeRecipient, NoticeToEnum, NoticeTypeEnum } from '../staff-management-notice.model';

@Component({
    moduleId: module.id,
    templateUrl: 'staff-management-notice-edit-details.html'
})
export class EditDetailsNoticeManagementComponent implements OnInit {

    noticeId: number;
    notice: CircularNotice = new CircularNotice();
    currentDate = new Date();
    staffsList: any[] = [];
    studentsList: any[] = [];
    filteredStudentsList: any[] = [];
    systemUsersList: any[] = [];
    classList: any[] = [];
    sectionsList: any[] = [];
    circularNoticeRecipientsList: CircularNoticeRecipient[] = [];
    selectedClassId: number;
    selectedSectionId: number;

    errorMessage: string;
    isEmptyNoticeMessageError: boolean = false;
    isEmptyRecipientsListError: boolean = false;

    noticeTypeEnumDetails: any[] = [
        { key: NoticeTypeEnum.Circular, value: 'Circular', class: 'circular' },
        { key: NoticeTypeEnum.Notice, value: 'Notice', class: 'notice' }
    ];
    noticeToEnumDetails: any[] = [
        { key: NoticeToEnum.AllStaffs, value: 'All Staffs', class: 'all-staffs' },
        { key: NoticeToEnum.AllStudents, value: 'All Students', class: 'all-students' },
        { key: NoticeToEnum.Student, value: 'Student', class: 'student' },
        { key: NoticeToEnum.Staff, value: 'Staff', class: 'staff' },
        { key: NoticeToEnum.SystemUser, value: 'System User', class: 'systemuser' }
    ];

    constructor(private router: Router,
        private activatedRoute: ActivatedRoute,
        private noticeManagementService: StaffNoticeManagementService,
        private loaderService: LoaderService,
        private snackbarService: SnackbarService) {

        this.activatedRoute.params.subscribe(param => this.noticeId = param.id);
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

                this.loaderService.toggleLoader(false);                
                this.getNotificationDetails();
            })
            .catch(err => {
                this.loaderService.toggleLoader(false);
            });
    }

    getNotificationDetails() {
        this.loaderService.toggleLoader(true);
        this.noticeManagementService.getNoticeById(this.noticeId)
            .then(res => {
                this.notice = res.json();
                this.circularNoticeRecipientsList = this.notice.circularNoticeRecipientsList;

                this.filterStudentsList();
                this.loaderService.toggleLoader(false);

                this.setInitialData();
            })
            .catch(err => {
                this.loaderService.toggleLoader(false);
            });
    }

    setInitialData() {
        // All Students
        if (this.notice.noticeTo === NoticeToEnum.AllStudents) {
            this.filteredStudentsList.forEach(student => {
                student.isSelected = true;
                student.isDisabled = true;
            });
        }
        // All Staffs
        else if (this.notice.noticeTo === NoticeToEnum.AllStaffs) {
            this.staffsList.forEach(staff => {
                staff.isSelected = true;
                staff.isDisabled = true;
            });
        }
        // Staff
        else if (this.notice.noticeTo === NoticeToEnum.Staff) {
            this.staffsList.forEach(staff => {
                if (this.notice.circularNoticeRecipientsList.some(x => x.recipientId === staff.userId)) {
                    staff.isSelected = true;
                }
            });
        }
        // Student
        else if (this.notice.noticeTo === NoticeToEnum.Student) {
            this.filteredStudentsList.forEach(student => {
                if (this.notice.circularNoticeRecipientsList.some(x => x.recipientId === student.userId)) {
                    student.isSelected = true;
                }
            });
        }
        // System User
        else if (this.notice.noticeTo === NoticeToEnum.SystemUser) {
            this.systemUsersList.forEach(systemUser => {
                if (this.notice.circularNoticeRecipientsList.some(x => x.recipientId === systemUser.id)) {
                    systemUser.isSelected = true;
                }
            });
        }
    }

    checkboxChange(isSelected: boolean, recipientId: number, recipientTypeEnum: NoticeToEnum) {
        if (isSelected) {
            let recipient = new CircularNoticeRecipient();
            recipient.recipientId = recipientId;
            recipient.recipientType = recipientTypeEnum;
            this.circularNoticeRecipientsList.push(recipient);
        }
        else {
            let existingRecipient = this.circularNoticeRecipientsList.filter(x => x.recipientId === recipientId && x.recipientType === recipientTypeEnum)[0]
            let index = this.circularNoticeRecipientsList.indexOf(existingRecipient);
            this.circularNoticeRecipientsList.splice(index, 1);
        }
    }

    setRecipientsListForAllSelected() {
        if (this.notice.noticeTo === NoticeToEnum.AllStaffs) {
            this.circularNoticeRecipientsList = [];
            for (let i = 0; i < this.staffsList.length; i++) {
                this.staffsList[i].isSelected = true;
                this.staffsList[i].isDisabled = true;

                let recipient = new CircularNoticeRecipient();
                recipient.recipientId = this.staffsList[i].userId;
                recipient.recipientType = NoticeToEnum.AllStaffs;
                this.circularNoticeRecipientsList.push(recipient);
            }
        }
        else if (this.notice.noticeTo === NoticeToEnum.AllStudents) {
            this.circularNoticeRecipientsList = [];
            for (let i = 0; i < this.filteredStudentsList.length; i++) {
                this.filteredStudentsList[i].isSelected = true;
                this.filteredStudentsList[i].isDisabled = true;

                let recipient = new CircularNoticeRecipient();
                recipient.recipientId = this.filteredStudentsList[i].userId;
                recipient.recipientType = NoticeToEnum.AllStudents;
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

    updateNotice(isNotificationSendingEnabled: boolean) {
        if (this.circularNoticeRecipientsList.length === 0) {
            this.isEmptyRecipientsListError = true;
        }
        else {
            this.notice.isNotificationSendingEnabled = isNotificationSendingEnabled;
            this.isEmptyRecipientsListError = false;
            this.notice.circularNoticeRecipientsList = this.circularNoticeRecipientsList;
            this.loaderService.toggleLoader(true);
            this.noticeManagementService.updateNotice(this.notice)
                .then(res => {
                    let response = res.json();

                    if (response.hasError === null || response.hasError === undefined || !response.hasError) {
                        this.snackbarService.showSnackbar(response.message);
                        this.router.navigate(['staff', 'activities', 'notice', 'list']);
                    }
                    else {
                        this.errorMessage = response.message
                    }

                    this.loaderService.toggleLoader(false);
                })
                .catch(err => {
                    this.loaderService.toggleLoader(false);
                });
        }
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
}
