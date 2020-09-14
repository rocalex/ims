import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoaderService } from '../../../../shared/loader-service';
import { PermissionService } from '../../../../shared/permission.service';
import { SnackbarService } from '../../../../shared/snackbar-service';
import { UserGroupFeatureParentEnum, UserGroupFeatureChildEnum } from '../../../../shared/sidenav/sidenav.model';
import { ReportService } from '../reports.service';
import { Book, BookReportsModel } from '../reports.model';

@Component({
    moduleId: module.id,
    templateUrl: './bookwise.component.html',
})
export class BookWiseComponent implements OnInit {
    errorMessage: string = '';
    bookList: Book[] = [];
    books: BookReportsModel[] = [];
    bookTypeId: number;
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
        this.bookTypeId = -1;
        this.books = [];
    }

    changeBookType() {
        this.groupService.getBookWiseData(this.bookTypeId).then(res => {
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
        this.groupService.getBookList().then(res => {
            let response = res.json();
            if (response.hasError === null || response.hasError === undefined || !response.hasError) {
                this.bookList = response;
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
