import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { LoaderService } from '../../../../shared/loader-service';
import { SnackbarService } from '../../../../shared/snackbar-service';
import { PermissionService } from '../../../../shared/permission.service';
import { UserGroupFeatureParentEnum, UserGroupFeatureChildEnum } from '../../../../shared/sidenav/sidenav.model';
import { IssueBookModel, BookModel, StudentModel, StaffModel } from '../issuebook.model';
import { IssueBookService } from '../issuebook.service';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {

  bookList: BookModel[] = [];
  staffList: StaffModel[] = [];
  studentList: StudentModel[] = [];
  userTypeList: any[] = [
    {
      id: 0,
      label: "Student",
    },
    {
      id: 1,
      label: "Staff"
    }
  ];

  addIssuebook: IssueBookModel = new IssueBookModel();
  issueBookId: number;
  remaining: number;
  constructor(
    private loaderService: LoaderService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private snackbar: SnackbarService,
    private apiService: IssueBookService,
    private permissionService: PermissionService
    ) {
      this.activatedRoute.params.subscribe(param => { this.issueBookId = param.id });
  }

  ngOnInit() {
    this.getIssueBookById();
  }
  
  changeBook(book: BookModel) {
    this.addIssuebook.bookId = book.id;
    this.remaining = book.remaining;
  }

  getIssueBookById() {
    this.loaderService.toggleLoader(true);
    this.apiService.getIssueBookById(this.issueBookId).then(res => {
      let response = res.json();
      if (response.hasError === null || response.hasError === undefined || !response.hasError) {
        this.addIssuebook = response;
        this.getInitialData();
      }
      else {
        this.snackbar.showSnackbar(response.message);
        this.router.navigate(['library', 'issuebook']);
        this.loaderService.toggleLoader(false);
      }
    }).catch(error => {
      this.snackbar.showSnackbar(error.message);
      this.loaderService.toggleLoader(false);
    });
  }

  getInitialData() {
    this.apiService.getInitialData().then(res => {
      let response = res.json();
      if (response.hasError === null || response.hasError === undefined || !response.hasError) {
        this.bookList = response.books;
        this.staffList = response.staffs;
        this.studentList = response.students;
      }
      else {
        this.snackbar.showSnackbar(response.message);
        this.router.navigate(['library', 'issuebook']);
      }
      this.loaderService.toggleLoader(false);
    }).catch(error => {
      this.snackbar.showSnackbar(error.message);
      this.loaderService.toggleLoader(false);
    });
  }

  isAllowed(type: string) {
    return this.permissionService.isAllowed(UserGroupFeatureParentEnum.Finance, UserGroupFeatureChildEnum.FinanceBasicReciept, type);
  }

  fullName(staff) {
    return staff.firstName + ' ' + (staff.middleName?staff.middleName:'') + ' ' + staff.lastName;
  }

  add() {
    this.loaderService.toggleLoader(true);
    this.apiService.updateIssueBook(this.addIssuebook).then(res => {
      let response = res.json();
      if (response.hasError === null || response.hasError === undefined || !response.hasError) {
        this.router.navigate(['library', 'issuebook']);
      }
      else {
        this.snackbar.showSnackbar(response.message);
      }
      this.loaderService.toggleLoader(false);
    }).catch(error => {
      this.snackbar.showSnackbar(error.message);
      this.loaderService.toggleLoader(false);
    });
  }
}
