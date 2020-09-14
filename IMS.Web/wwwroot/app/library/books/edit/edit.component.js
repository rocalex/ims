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
const books_model_1 = require("../books.model");
const router_1 = require("@angular/router");
const snackbar_service_1 = require("../../../../shared/snackbar-service");
const loader_service_1 = require("../../../../shared/loader-service");
const permission_service_1 = require("../../../../shared/permission.service");
const sidenav_model_1 = require("../../../../shared/sidenav/sidenav.model");
const books_service_1 = require("../books.service");
let EditComponent = class EditComponent {
    constructor(loaderService, snackbar, router, permissionService, activatedRoute, apiService) {
        this.loaderService = loaderService;
        this.snackbar = snackbar;
        this.router = router;
        this.permissionService = permissionService;
        this.activatedRoute = activatedRoute;
        this.apiService = apiService;
        this.addBook = new books_model_1.BookModel();
        this.addPublisher = new books_model_1.PublisherModel();
        this.bookTypeList = [];
        this.activatedRoute.params.subscribe(param => this.bookId = param.id);
    }
    ngOnInit() {
        this.getBookDetail();
    }
    isAllowed(type) {
        return this.permissionService.isAllowed(sidenav_model_1.UserGroupFeatureParentEnum.Finance, sidenav_model_1.UserGroupFeatureChildEnum.FinanceBasicReciept, type);
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
        let request = new books_model_1.UpdateAPIRequestModel();
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
        }
        else {
            this.router.navigate(['library', 'books']);
        }
    }
    preview(files) {
        if (files.length === 0)
            return;
        var reader = new FileReader();
        reader.readAsDataURL(files[0]);
        reader.onload = (_event) => {
            this.imgURL = reader.result;
        };
    }
};
__decorate([
    core_1.ViewChild('fileInput'),
    __metadata("design:type", core_1.ElementRef)
], EditComponent.prototype, "fileInput", void 0);
EditComponent = __decorate([
    core_1.Component({
        moduleId: module.id,
        templateUrl: './edit.component.html',
        styleUrls: ['./edit.component.css']
    }),
    __metadata("design:paramtypes", [loader_service_1.LoaderService,
        snackbar_service_1.SnackbarService,
        router_1.Router,
        permission_service_1.PermissionService,
        router_1.ActivatedRoute,
        books_service_1.BookService])
], EditComponent);
exports.EditComponent = EditComponent;
//# sourceMappingURL=edit.component.js.map