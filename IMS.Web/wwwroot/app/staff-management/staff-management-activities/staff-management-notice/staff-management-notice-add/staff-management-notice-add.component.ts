import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { LoaderService } from '../../../../../shared/loader-service';
import { SnackbarService } from '../../../../../shared/snackbar-service';
import { StaffNoticeManagementService } from '../staff-management-notice.service';

import { CircularNotice, CircularNoticeRecipient, NoticeToEnum, NoticeTypeEnum } from '../staff-management-notice.model';

@Component({
    moduleId: module.id,
    templateUrl: 'staff-management-notice-add.html'
})
export class AddNoticeManagementComponent implements OnInit {

    notice: CircularNotice = new CircularNotice();
    currentDate: Date = new Date();
    staffsList: any[] = [];
    studentsList: any[] = [];
    filteredStudentsList: any[] = [];
    systemUsersList: any[] = [];
    classList: any[] = [];
    sectionsList: any[] = [];
    circularNoticeRecipientsList: CircularNoticeRecipient[] = [];
    selectedClassId: number;
    selectedSectionId: number;

    noticeTypeEnumDetails: any[] = [
        { key: NoticeTypeEnum.Circular, value: 'Circular' },
        { key: NoticeTypeEnum.Notice, value: 'Notice' }
    ];
    noticeToEnumDetails: any[] = [
        { key: NoticeToEnum.AllStudents, value: 'All Students' },
        { key: NoticeToEnum.AllStaffs, value: 'All Staffs' },
        { key: NoticeToEnum.Student, value: 'Student' },
        { key: NoticeToEnum.Staff, value: 'Staff' },
        { key: NoticeToEnum.SystemUser, value: 'System User' }
    ];

    errorMessage: string;
    isEmptyNoticeMessageError: boolean = false;
    isEmptyRecipientsListError: boolean = false;

    constructor(private router: Router,
        private noticeManagementService: StaffNoticeManagementService,
        private loaderService: LoaderService,
        private snackbarService: SnackbarService) { }

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

    checkboxChange(isSelected: boolean, recipientId: number, recipientTypeEnum: NoticeToEnum) {
        if (isSelected) {
            let recipient = new CircularNoticeRecipient();
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

    addNotice(isNotificationSendingEnabled: boolean) {
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
                        this.errorMessage = response.message
                    }

                    this.loaderService.toggleLoader(false);
                })
                .catch(err => {
                    this.loaderService.toggleLoader(false);
                });
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
