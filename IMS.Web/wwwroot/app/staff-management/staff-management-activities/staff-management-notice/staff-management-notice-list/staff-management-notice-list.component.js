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
const staff_management_notice_service_1 = require("../staff-management-notice.service");
const loader_service_1 = require("../../../../../shared/loader-service");
const snackbar_service_1 = require("../../../../../shared/snackbar-service");
const sidenav_model_1 = require("../../../../../shared/sidenav/sidenav.model");
const permission_service_1 = require("../../../../../shared/permission.service");
let ListNoticeManagementComponent = class ListNoticeManagementComponent {
    constructor(noticeManagementService, loaderService, snackbarService, permissionService) {
        this.noticeManagementService = noticeManagementService;
        this.loaderService = loaderService;
        this.snackbarService = snackbarService;
        this.permissionService = permissionService;
        this.noticeList = [];
    }
    ngOnInit() {
        this.getNoticeList();
    }
    getNoticeList() {
        this.loaderService.toggleLoader(true);
        this.noticeManagementService.getAllNotices()
            .then(res => {
            this.noticeList = res.json();
            this.loaderService.toggleLoader(false);
        })
            .catch(err => {
            this.loaderService.toggleLoader(false);
        });
    }
    deleteNotice(noticeId) {
        this.loaderService.toggleLoader(true);
        this.noticeManagementService.deleteNotice(noticeId)
            .then(res => {
            this.snackbarService.showSnackbar(res.json().message);
            this.ngOnInit();
            this.loaderService.toggleLoader(false);
        })
            .catch(err => {
            this.loaderService.toggleLoader(false);
        });
    }
    isAllowed(type) {
        return this.permissionService.isAllowed(sidenav_model_1.UserGroupFeatureParentEnum.Staff, sidenav_model_1.UserGroupFeatureChildEnum.CircularNotice, type);
    }
};
ListNoticeManagementComponent = __decorate([
    core_1.Component({
        moduleId: module.id,
        templateUrl: 'staff-management-notice-list.html'
    }),
    __metadata("design:paramtypes", [staff_management_notice_service_1.StaffNoticeManagementService,
        loader_service_1.LoaderService,
        snackbar_service_1.SnackbarService,
        permission_service_1.PermissionService])
], ListNoticeManagementComponent);
exports.ListNoticeManagementComponent = ListNoticeManagementComponent;
//# sourceMappingURL=staff-management-notice-list.component.js.map