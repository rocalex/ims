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
const snackbar_service_1 = require("../../../../shared/snackbar-service");
const sidenav_model_1 = require("../../../../shared/sidenav/sidenav.model");
const hostel_block_service_1 = require("../hostel-block.service");
let HostelBlockListComponent = class HostelBlockListComponent {
    constructor(loaderService, snackBar, permissionService, apiService) {
        this.loaderService = loaderService;
        this.snackBar = snackBar;
        this.permissionService = permissionService;
        this.apiService = apiService;
        this.blockList = [];
    }
    ngOnInit() {
        this.getBlockList();
    }
    getBlockList() {
        this.loaderService.toggleLoader(true);
        this.apiService.getBookTypesForLoggedInUser().then(res => {
            let response = res.json();
            if (response.hasError === null || response.hasError === undefined || !response.hasError) {
                this.blockList = response;
            }
            else {
                this.snackBar.showSnackbar(response.message);
            }
            this.loaderService.toggleLoader(false);
        })
            .catch((err) => {
            this.snackBar.showSnackbar(err.message);
            this.loaderService.toggleLoader(false);
        });
    }
    isAllowed(type) {
        return this.permissionService.isAllowed(sidenav_model_1.UserGroupFeatureParentEnum.Finance, sidenav_model_1.UserGroupFeatureChildEnum.FinanceBasicReciept, type);
    }
};
HostelBlockListComponent = __decorate([
    core_1.Component({
        moduleId: module.id,
        templateUrl: './hostel-block-list.component.html',
        styleUrls: ['./hostel-block-list.component.css']
    }),
    __metadata("design:paramtypes", [loader_service_1.LoaderService,
        snackbar_service_1.SnackbarService,
        permission_service_1.PermissionService,
        hostel_block_service_1.HostelBlockService])
], HostelBlockListComponent);
exports.HostelBlockListComponent = HostelBlockListComponent;
//# sourceMappingURL=hostel-block-list.component.js.map