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
const snackbar_service_1 = require("../../../../shared/snackbar-service");
const hostel_management_hostel_service_1 = require("../hostel-management-hostel.service");
const permission_service_1 = require("../../../../shared/permission.service");
const sidenav_model_1 = require("../../../../shared/sidenav/sidenav.model");
let HostelManagementHostelListComponent = class HostelManagementHostelListComponent {
    constructor(loaderService, permissionService, snackService, apiService) {
        this.loaderService = loaderService;
        this.permissionService = permissionService;
        this.snackService = snackService;
        this.apiService = apiService;
        this.hostelList = [];
        this.hostelTypes = [
            {
                label: 'female',
                value: 0
            },
            {
                label: 'male',
                value: 1
            }
        ];
    }
    ngOnInit() {
        this.getHostelList();
    }
    getHostelList() {
        this.loaderService.toggleLoader(true);
        this.apiService.getHostelList().then(res => {
            let response = res.json();
            if (response.hasError === null || response.hasError === undefined || !response.hasError) {
                this.hostelList = response;
            }
            else {
                this.snackService.showSnackbar(response.message);
            }
            this.loaderService.toggleLoader(false);
        }).catch(err => {
            this.snackService.showSnackbar("There is error on fetching hostel list");
            this.loaderService.toggleLoader(false);
        });
    }
    isAllowed(type) {
        return this.permissionService.isAllowed(sidenav_model_1.UserGroupFeatureParentEnum.Finance, sidenav_model_1.UserGroupFeatureChildEnum.FinanceBasicReciept, type);
    }
};
HostelManagementHostelListComponent = __decorate([
    core_1.Component({
        moduleId: module.id,
        templateUrl: 'hostel-management-hostel-list.html'
    }),
    __metadata("design:paramtypes", [loader_service_1.LoaderService,
        permission_service_1.PermissionService,
        snackbar_service_1.SnackbarService,
        hostel_management_hostel_service_1.HostelManagementHostelService])
], HostelManagementHostelListComponent);
exports.HostelManagementHostelListComponent = HostelManagementHostelListComponent;
//# sourceMappingURL=hostel-management-hostel-list.component.js.map