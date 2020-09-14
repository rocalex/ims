import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoaderService } from '../../../../shared/loader-service';
import { PermissionService } from '../../../../shared/permission.service';
import { SnackbarService } from '../../../../shared/snackbar-service';
import { UserGroupFeatureParentEnum, UserGroupFeatureChildEnum } from '../../../../shared/sidenav/sidenav.model';
import { ReportService } from '../reports.service';
import { UserModel, BookReportsModel } from '../reports.model';

@Component({
    moduleId: module.id,
    templateUrl: './userwise.component.html',
})
export class UserWiseComponent implements OnInit {
    errorMessage: string = '';
    userList: UserModel[] = [];
    books: BookReportsModel[] = [];
    selectedUser: UserModel;
    statusList: any[] = [
        {id: 0, label: "Issued"},
        {id: 1, label: "Returned"}
    ]
    
    constructor(private loaderService: LoaderService,
        private permissionService: PermissionService,
        private groupService: ReportService,
        private snackBar: SnackbarService,
        private router: Router,
    ) { }

    ngOnInit() {
        this.getBookList();
    }

    fullName(book: BookReportsModel) {
        if(book.userType == 0) {
            return book.student.firstName + ' ' + book.student.lastName;
        } else {
            return book.staff.firstName + ' ' + book.staff.lastName;
        }
    }

    reset() {
        this.selectedUser = new UserModel();
        this.books = [];
    }

    changeUser() {
        this.groupService.getUserWiseData(this.selectedUser).then(res => {
            let response = res.json();
            if (response.hasError === null || response.hasError === undefined || !response.hasError) {
                this.books = response;
            } else {
                this.errorMessage = response.message;
                this.snackBar.showSnackbar(response.message);
            }
            this.loaderService.toggleLoader(false);
        }).catch(err => {
            this.loaderService.toggleLoader(false);
        });
    }

    getBookList() {
        this.loaderService.toggleLoader(true);
        this.groupService.getUserList().then(res => {
            let response = res.json();
            if (response.hasError === null || response.hasError === undefined || !response.hasError) {
                response.students.map(student => {
                    if(student.users != null) {
                        this.userList.push({...student.users, userType: 0});
                    }
                });
                response.staffs.map(staff => {
                    if(staff.users != null) {
                        this.userList.push({...staff.users, userType: 1});
                    }
                });
            } else {
                this.errorMessage = response.message;
                this.snackBar.showSnackbar(response.message);
            }
            this.loaderService.toggleLoader(false);
        }).catch(err => {
            this.loaderService.toggleLoader(false);
        });
    }

    isAllowed(type: string) {
        return this.permissionService.isAllowed(UserGroupFeatureParentEnum.Finance, UserGroupFeatureChildEnum.FinanceBasicReciept, type);
    }
}
