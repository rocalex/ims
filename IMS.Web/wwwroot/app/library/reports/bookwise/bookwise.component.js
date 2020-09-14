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
const router_1 = require("@angular/router");
const loader_service_1 = require("../../../../shared/loader-service");
const permission_service_1 = require("../../../../shared/permission.service");
const snackbar_service_1 = require("../../../../shared/snackbar-service");
const sidenav_model_1 = require("../../../../shared/sidenav/sidenav.model");
const reports_service_1 = require("../reports.service");
let BookWiseComponent = class BookWiseComponent {
    constructor(loaderService, permissionService, groupService, snackBar, router) {
        this.loaderService = loaderService;
        this.permissionService = permissionService;
        this.groupService = groupService;
        this.snackBar = snackBar;
        this.router = router;
        this.errorMessage = '';
        this.bookList = [];
        this.books = [];
        this.statusList = [
            { id: 0, label: "Issued" },
            { id: 1, label: "Returned" }
        ];
    }
    ngOnInit() {
        this.getBookList();
    }
    fullName(book) {
        if (book.userType == 0) {
            return book.student.firstName + ' ' + book.student.lastName;
        }
        else {
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
            }
            else {
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
            }
            else {
                this.errorMessage = response.message;
                this.snackBar.showSnackbar(response.message);
            }
            this.loaderService.toggleLoader(false);
        }).catch(err => {
            this.loaderService.toggleLoader(false);
        });
    }
    isAllowed(type) {
        return this.permissionService.isAllowed(sidenav_model_1.UserGroupFeatureParentEnum.Finance, sidenav_model_1.UserGroupFeatureChildEnum.FinanceBasicReciept, type);
    }
};
BookWiseComponent = __decorate([
    core_1.Component({
        moduleId: module.id,
        templateUrl: './bookwise.component.html',
    }),
    __metadata("design:paramtypes", [loader_service_1.LoaderService,
        permission_service_1.PermissionService,
        reports_service_1.ReportService,
        snackbar_service_1.SnackbarService,
        router_1.Router])
], BookWiseComponent);
exports.BookWiseComponent = BookWiseComponent;
//# sourceMappingURL=bookwise.component.js.map