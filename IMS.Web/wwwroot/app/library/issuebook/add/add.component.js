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
const snackbar_service_1 = require("../../../../shared/snackbar-service");
const permission_service_1 = require("../../../../shared/permission.service");
const sidenav_model_1 = require("../../../../shared/sidenav/sidenav.model");
const issuebook_model_1 = require("../issuebook.model");
const issuebook_service_1 = require("../issuebook.service");
let AddComponent = class AddComponent {
    constructor(loaderService, router, snackbar, apiService, permissionService) {
        this.loaderService = loaderService;
        this.router = router;
        this.snackbar = snackbar;
        this.apiService = apiService;
        this.permissionService = permissionService;
        this.bookList = [];
        this.staffList = [];
        this.studentList = [];
        this.userTypeList = [
            {
                id: 0,
                label: "Student",
            },
            {
                id: 1,
                label: "Staff"
            }
        ];
        this.addIssuebook = new issuebook_model_1.IssueBookModel();
    }
    ngOnInit() {
        this.getInitialData();
    }
    changeBook(book) {
        this.addIssuebook.bookId = book.id;
        this.remaining = book.remaining;
    }
    getInitialData() {
        this.loaderService.toggleLoader(true);
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
    isAllowed(type) {
        return this.permissionService.isAllowed(sidenav_model_1.UserGroupFeatureParentEnum.Finance, sidenav_model_1.UserGroupFeatureChildEnum.FinanceBasicReciept, type);
    }
    fullName(staff) {
        return staff.firstName + ' ' + (staff.middleName ? staff.middleName : '') + ' ' + staff.lastName;
    }
    add() {
        this.loaderService.toggleLoader(true);
        this.apiService.addIssueBook(this.addIssuebook).then(res => {
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
};
AddComponent = __decorate([
    core_1.Component({
        moduleId: module.id,
        templateUrl: './add.component.html',
        styleUrls: ['./add.component.css']
    }),
    __metadata("design:paramtypes", [loader_service_1.LoaderService,
        router_1.Router,
        snackbar_service_1.SnackbarService,
        issuebook_service_1.IssueBookService,
        permission_service_1.PermissionService])
], AddComponent);
exports.AddComponent = AddComponent;
//# sourceMappingURL=add.component.js.map