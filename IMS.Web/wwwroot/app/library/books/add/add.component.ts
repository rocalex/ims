import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { BookModel, PublisherModel, BookTypeModel, AddAPIRequestModel } from '../books.model';
import { Router } from '@angular/router';
import { SnackbarService } from '../../../../shared/snackbar-service';
import { LoaderService } from '../../../../shared/loader-service';
import { PermissionService } from '../../../../shared/permission.service';
import { UserGroupFeatureParentEnum, UserGroupFeatureChildEnum } from '../../../../shared/sidenav/sidenav.model';
import { BookService } from '../books.service';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css']
})
export class AddComponent implements OnInit {
  @ViewChild('fileInput') fileInput: ElementRef;
  addBook: BookModel = new BookModel();
  imgURL: any;
  addPublisher: PublisherModel = new PublisherModel();
  bookTypeList: BookTypeModel[] = [];
  constructor(
    private loaderService: LoaderService,
    private snackbar: SnackbarService,
    private router: Router,
    private permissionService: PermissionService,
    private apiService: BookService
    ) { }

  ngOnInit() {
    this.getBookTypeList();
  }

  isAllowed(type: string) {
    return this.permissionService.isAllowed(UserGroupFeatureParentEnum.Finance, UserGroupFeatureChildEnum.FinanceBasicReciept, type);
  }

  getBookTypeList() {
    this.loaderService.toggleLoader(true);
    this.apiService.getBookTypes().then(res => {
      let response = res.json();
      if (response.hasError === null || response.hasError === undefined || !response.hasError) {
        this.bookTypeList = response;
      }
      else {
        this.snackbar.showSnackbar(response.message);
        this.router.navigate(['library', 'books']);
      }
      this.loaderService.toggleLoader(false);
    }).catch(error => {
      this.snackbar.showSnackbar(error.message);
      this.loaderService.toggleLoader(false);
    });
  }

  add() {
    let request: AddAPIRequestModel = new AddAPIRequestModel();
    request.addBook = this.addBook;
    request.addPublisher = this.addPublisher;
    this.loaderService.toggleLoader(true);
    this.apiService.addBook(request).then(res => {
      let response = res.json();
      if (response.hasError === null || response.hasError === undefined || !response.hasError) {
        let bookId: number = response.bookId;
        this.addOrUpdateStudentImage(bookId);
      }
      this.loaderService.toggleLoader(false);
    }).catch(error => {
      this.snackbar.showSnackbar(error.message);
      this.loaderService.toggleLoader(false);
    });
  }

  addOrUpdateStudentImage(studentId: number) {
    var files = this.fileInput.nativeElement.files;
    if (files.length !== 0) {
      const formData = new FormData();
      for (const file of files) {
        formData.append(file.name, file);
      }
      this.apiService.updateImage(studentId, formData).then(res => {
        this.loaderService.toggleLoader(false);
        this.router.navigate(['library', 'books']);
      });
    } else {
      this.router.navigate(['library', 'books']);
    }
  }

  preview(files: any[]) {
    if (files.length === 0)
      return;
    var reader = new FileReader();
    reader.readAsDataURL(files[0]);
    reader.onload = (_event) => {
      this.imgURL = reader.result;
    }
  }
}
