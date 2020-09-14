import { Component, OnInit } from '@angular/core';
import { ReturnBookModel, ReturnBookRequest } from './return.model';
import { Router } from '@angular/router';
import { LoaderService } from '../../../shared/loader-service';
import { PermissionService } from '../../../shared/permission.service';
import { SnackbarService } from '../../../shared/snackbar-service';
import { UserGroupFeatureParentEnum, UserGroupFeatureChildEnum } from '../../../shared/sidenav/sidenav.model';
import { BookModel } from '../books/books.model';
import { ReturnService } from './return.service';
import { IssueBookModel } from '../issuebook/issuebook.model';

@Component({
  moduleId: module.id,
  templateUrl: './return.component.html',
  styleUrls: ['./return.component.css']
})
export class ReturnComponent implements OnInit {
  
  bookList: BookModel[] = [];
  selectedBook: BookModel = new BookModel();
  issueBookList: IssueBookModel[] = [];
  selectionList: boolean[] = [];
  fineList: number[] = [];
  returnDateList: Date[] = [];
  enableSave: boolean = false;
  constructor(
    private loaderService: LoaderService,
    private permissionService: PermissionService,
    private groupService: ReturnService,
    private snackBar: SnackbarService,
    private router: Router,
  ) { }

  ngOnInit() {
    this.getBookList();
  }

  getBookList() {
    this.loaderService.toggleLoader(true);
    this.groupService.getBooks().then(res => {
      let response = res.json();
      if(response.hasError === null || response.hasError === undefined || !response.hasError) {
        this.bookList = response;
      } else {
        this.snackBar.showSnackbar(response.message);
      }
      this.loaderService.toggleLoader(false);
    }).catch(err => {
      this.loaderService.toggleLoader(false);
    });
  }

  checkCanSave(flag) {
    this.enableSave = !(this.canSave());
  }

  search() {
    this.loaderService.toggleLoader(true);
    this.groupService.getIssueBookInfo(this.selectedBook.id).then(res => {
      let response = res.json();
      if(response.hasError === null || response.hasError === undefined || !response.hasError) {
        if(response.length > 0) {
          response.map(item => {
            this.selectionList.push(false);
            this.fineList.push(0);
            this.returnDateList.push(new Date());
            return item;
          });
        }
        this.issueBookList = response;
      } else {
        this.snackBar.showSnackbar(response.message);
      }
      this.loaderService.toggleLoader(false);
    }).catch(err => {
      this.loaderService.toggleLoader(false);
    });
  }

  return() {
    let request = new ReturnBookRequest();
    request.bookId = this.selectedBook.id;
    request.returnBookList = [];
    this.selectionList.map((value, index) => {
      if(value) {
        let returnBook = new ReturnBookModel();
        returnBook.fine = this.fineList[index];
        returnBook.issueBookId = this.issueBookList[index].id;
        returnBook.returnDate = this.returnDateList[index];
        request.returnBookList.push(returnBook);
      }
    });
    this.loaderService.toggleLoader(true);
    this.groupService.returnBook(request).then(res => {
      let response = res.json();
      if(response.hasError === null || response.hasError === undefined || !response.hasError) {
        this.issueBookList = [];
        this.fineList = [];
        this.returnDateList = [];
        this.selectedBook = new BookModel();
        this.getBookList();      
      } else {
        this.snackBar.showSnackbar(response.message);
      }
      this.loaderService.toggleLoader(false);
    }).catch(err => {
      this.loaderService.toggleLoader(false);
    });
  }

  canSave() {
    let flag = false;
    this.selectionList.forEach(item => {
      if(item) {
        flag = true;
      }
    });
    return flag;
  }
  
  fullName(staff) {
    return staff.firstName + ' ' + (staff.middleName?staff.middleName:'') + ' ' + staff.lastName;
  }
}
