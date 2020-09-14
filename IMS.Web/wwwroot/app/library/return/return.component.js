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
const return_model_1 = require("./return.model");
const router_1 = require("@angular/router");
const loader_service_1 = require("../../../shared/loader-service");
const permission_service_1 = require("../../../shared/permission.service");
const snackbar_service_1 = require("../../../shared/snackbar-service");
const books_model_1 = require("../books/books.model");
const return_service_1 = require("./return.service");
let ReturnComponent = class ReturnComponent {
    constructor(loaderService, permissionService, groupService, snackBar, router) {
        this.loaderService = loaderService;
        this.permissionService = permissionService;
        this.groupService = groupService;
        this.snackBar = snackBar;
        this.router = router;
        this.bookList = [];
        this.selectedBook = new books_model_1.BookModel();
        this.issueBookList = [];
        this.selectionList = [];
        this.fineList = [];
        this.returnDateList = [];
        this.enableSave = false;
    }
    ngOnInit() {
        this.getBookList();
    }
    getBookList() {
        this.loaderService.toggleLoader(true);
        this.groupService.getBooks().then(res => {
            let response = res.json();
            if (response.hasError === null || response.hasError === undefined || !response.hasError) {
                this.bookList = response;
            }
            else {
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
            if (response.hasError === null || response.hasError === undefined || !response.hasError) {
                if (response.length > 0) {
                    response.map(item => {
                        this.selectionList.push(false);
                        this.fineList.push(0);
                        this.returnDateList.push(new Date());
                        return item;
                    });
                }
                this.issueBookList = response;
            }
            else {
                this.snackBar.showSnackbar(response.message);
            }
            this.loaderService.toggleLoader(false);
        }).catch(err => {
            this.loaderService.toggleLoader(false);
        });
    }
    return() {
        let request = new return_model_1.ReturnBookRequest();
        request.bookId = this.selectedBook.id;
        request.returnBookList = [];
        this.selectionList.map((value, index) => {
            if (value) {
                let returnBook = new return_model_1.ReturnBookModel();
                returnBook.fine = this.fineList[index];
                returnBook.issueBookId = this.issueBookList[index].id;
                returnBook.returnDate = this.returnDateList[index];
                request.returnBookList.push(returnBook);
            }
        });
        this.loaderService.toggleLoader(true);
        this.groupService.returnBook(request).then(res => {
            let response = res.json();
            if (response.hasError === null || response.hasError === undefined || !response.hasError) {
                this.issueBookList = [];
                this.fineList = [];
                this.returnDateList = [];
                this.selectedBook = new books_model_1.BookModel();
                this.getBookList();
            }
            else {
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
            if (item) {
                flag = true;
            }
        });
        return flag;
    }
    fullName(staff) {
        return staff.firstName + ' ' + (staff.middleName ? staff.middleName : '') + ' ' + staff.lastName;
    }
};
ReturnComponent = __decorate([
    core_1.Component({
        moduleId: module.id,
        templateUrl: './return.component.html',
        styleUrls: ['./return.component.css']
    }),
    __metadata("design:paramtypes", [loader_service_1.LoaderService,
        permission_service_1.PermissionService,
        return_service_1.ReturnService,
        snackbar_service_1.SnackbarService,
        router_1.Router])
], ReturnComponent);
exports.ReturnComponent = ReturnComponent;
//# sourceMappingURL=return.component.js.map