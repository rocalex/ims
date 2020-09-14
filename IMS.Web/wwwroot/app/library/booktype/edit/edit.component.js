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
const booktype_model_1 = require("../booktype.model");
const booktype_service_1 = require("../booktype.service");
let EditComponent = class EditComponent {
    constructor(bookTypeService, snackBar, loaderService, router, activatedRoute) {
        this.bookTypeService = bookTypeService;
        this.snackBar = snackBar;
        this.loaderService = loaderService;
        this.router = router;
        this.activatedRoute = activatedRoute;
        this.bookType = new booktype_model_1.BookTypeModel();
        this.activatedRoute.params.subscribe(param => this.bookTypeId = param.id);
    }
    ngOnInit() {
        this.getBookTypeInfo();
    }
    getBookTypeInfo() {
        this.loaderService.toggleLoader(true);
        this.bookTypeService.getBookTypeById(this.bookTypeId).then(res => {
            let response = res.json();
            if (response.hasError !== null && response.hasError !== undefined && response.hasError) {
                this.snackBar.showSnackbar(response.message);
                this.router.navigate(['library', 'booktypes']);
            }
            this.bookType = response;
            console.log(this.bookType);
            this.loaderService.toggleLoader(false);
        }).catch(error => {
            console.log(error.json());
            this.loaderService.toggleLoader(false);
        });
    }
    save() {
        this.loaderService.toggleLoader(true);
        this.bookTypeService.updateBookType(this.bookType)
            .then(res => {
            let response = res.json();
            if (response.hasError === null || response.hasError === undefined || !response.hasError) {
                this.snackBar.showSnackbar(response.message);
                this.router.navigate(['library', 'booktypes']);
            }
            this.loaderService.toggleLoader(false);
        }).catch(error => {
            this.loaderService.toggleLoader(false);
        });
    }
};
EditComponent = __decorate([
    core_1.Component({
        selector: 'app-edit',
        templateUrl: './edit.component.html',
        styleUrls: ['./edit.component.css']
    }),
    __metadata("design:paramtypes", [booktype_service_1.BookTypeService,
        snackbar_service_1.SnackbarService,
        loader_service_1.LoaderService,
        router_1.Router,
        router_1.ActivatedRoute])
], EditComponent);
exports.EditComponent = EditComponent;
//# sourceMappingURL=edit.component.js.map