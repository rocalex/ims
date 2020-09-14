import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { BookModel, PublisherModel, BookTypeModel, UpdateAPIRequestModel } from '../books.model';
import { Router, ActivatedRoute } from '@angular/router';
import { SnackbarService } from '../../../../shared/snackbar-service';
import { LoaderService } from '../../../../shared/loader-service';
import { PermissionService } from '../../../../shared/permission.service';
import { UserGroupFeatureParentEnum, UserGroupFeatureChildEnum } from '../../../../shared/sidenav/sidenav.model';
import { BookService } from '../books.service';

@Component({
  moduleId: module.id,
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {
  @ViewChild('fileInput') fileInput: ElementRef;
  addBook: BookModel = new BookModel();
  imgURL: any;
  addPublisher: PublisherModel = new PublisherModel();
  bookTypeList: BookTypeModel[] = [];
  bookId: number;
  constructor(
    private loaderService: LoaderService,
    private snackbar: SnackbarService,
    private router: Router,
    private permissionService: PermissionService,
    private activatedRoute: ActivatedRoute,
    private apiService: BookService
    ) { 
    this.activatedRoute.params.subscribe(param => this.bookId = param.id);
  }

  ngOnInit() {
    this.getBookDetail();
  }

  isAllowed(type: string) {
    return this.permissionService.isAllowed(UserGroupFeatureParentEnum.Finance, UserGroupFeatureChildEnum.FinanceBasicReciept, type);
  }

  getBookDetail() {
    this.loaderService.toggleLoader(true);
    this.apiService.getBookDetail(this.bookId).then(res => {
      let response = res.json();
      if (response.hasError === null || response.hasError === undefined || !response.hasError) {
        this.addBook = response;
        this.addPublisher = this.addBook.publisher;
        this.imgURL = this.addBook.imageUrl;
        this.getBookTypeList();
      }
      else {
        this.snackbar.showSnackbar(response.message);
        this.router.navigate(['library', 'books']);
      }
    }).catch(error => {
      this.snackbar.showSnackbar(error.message);
      this.loaderService.toggleLoader(false);
    });
  }

  getBookTypeList() {
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
    let request: UpdateAPIRequestModel = new UpdateAPIRequestModel();
    request.updateBook = this.addBook;
    request.updatePublisher = this.addPublisher;
    this.loaderService.toggleLoader(true);
    this.apiService.updateBook(request).then(res => {
      let response = res.json();
      if (response.hasError === null || response.hasError === undefined || !response.hasError) {
        this.addOrUpdateStudentImage();
      }
      this.loaderService.toggleLoader(false);
    }).catch(error => {
      this.snackbar.showSnackbar(error.message);
      this.loaderService.toggleLoader(false);
    });
  }

  addOrUpdateStudentImage() {
    var files = this.fileInput.nativeElement.files;
    if (files.length !== 0) {
      const formData = new FormData();
      for (const file of files) {
        formData.append(file.name, file);
      }
      this.apiService.updateImage(this.addBook.id, formData).then(res => {
        this.loaderService.toggleLoader(false);
        this.router.navigate(["library", "books"]);
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
