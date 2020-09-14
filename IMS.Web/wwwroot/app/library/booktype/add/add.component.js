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
const loader_service_1 = require("../../../../shared/loader-service");
const permission_service_1 = require("../../../../shared/permission.service");
const sidenav_model_1 = require("../../../../shared/sidenav/sidenav.model");
const snackbar_service_1 = require("../../../../shared/snackbar-service");
const booktype_model_1 = require("../booktype.model");
const booktype_service_1 = require("../booktype.service");
const router_1 = require("@angular/router");
let AddComponent = class AddComponent {
    constructor(loaderService, permissionService, snackBar, router, bookTypeService) {
        this.loaderService = loaderService;
        this.permissionService = permissionService;
        this.snackBar = snackBar;
        this.router = router;
        this.bookTypeService = bookTypeService;
        this.addType = new booktype_model_1.BookTypeModel();
        this.errorMessage = '';
    }
    ngOnInit() {
    }
    isAllowed(type) {
        return this.permissionService.isAllowed(sidenav_model_1.UserGroupFeatureParentEnum.Finance, sidenav_model_1.UserGroupFeatureChildEnum.FinanceBasicReciept, type);
    }
    add() {
        this.loaderService.toggleLoader(true);
        this.bookTypeService.addBookType(this.addType).then(res => {
            let response = res.json();
            if (response.hasError === null || response.hasError === undefined || !response.hasError) {
                this.snackBar.showSnackbar(response.message);
                this.router.navigate(['library', 'booktypes']);
            }
            else {
                this.errorMessage = response.message;
            }
            this.loaderService.toggleLoader(false);
        }).catch(err => {
            this.loaderService.toggleLoader(false);
        });
    }
};
AddComponent = __decorate([
    core_1.Component({
        selector: 'app-add',
        templateUrl: './add.component.html',
        styleUrls: ['./add.component.css']
    }),
    __metadata("design:paramtypes", [loader_service_1.LoaderService,
        permission_service_1.PermissionService,
        snackbar_service_1.SnackbarService,
        router_1.Router,
        booktype_service_1.BookTypeService])
], AddComponent);
exports.AddComponent = AddComponent;
//# sourceMappingURL=add.component.js.map