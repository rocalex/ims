import { Component, OnInit } from '@angular/core';
import { LoaderService } from '../../../../shared/loader-service';
import { PermissionService } from '../../../../shared/permission.service';
import { SnackbarService } from '../../../../shared/snackbar-service';
import { UserGroupFeatureParentEnum, UserGroupFeatureChildEnum } from '../../../../shared/sidenav/sidenav.model';
import { BookModel } from '../books.model';
import { BookService } from '../books.service';

@Component({
  moduleId: module.id,
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {

  bookList: BookModel[] = [];
  constructor(
    private loaderService: LoaderService,
    private permissionService: PermissionService,
    private apiService: BookService,
    private snackService: SnackbarService
    ) { }

  ngOnInit() {
    this.getBookList();
  }

  getBookList() {
    this.loaderService.toggleLoader(true);
    this.apiService.getBookList().then(res => {
      let response = res.json();
      if (response.hasError !== null && response.hasError !== undefined && response.hasError) {
        this.snackService.showSnackbar(response.message);
      }
      this.bookList = response;
      this.loaderService.toggleLoader(false);
    });
  }

  delete(id: number) {
    this.apiService.delete(id).then(res => {
      let response = res.json();
      if (response.hasError !== null && response.hasError !== undefined && response.hasError) {
        this.snackService.showSnackbar(response.message);
      } else {
        this.bookList = this.bookList.filter(x => x.id != id);
      }
    }).catch(err => {
      this.loaderService.toggleLoader(false);
    });
  }

  isAllowed(type: string) {
    return this.permissionService.isAllowed(UserGroupFeatureParentEnum.Finance, UserGroupFeatureChildEnum.FinanceBasicReciept, type);
  }
}
