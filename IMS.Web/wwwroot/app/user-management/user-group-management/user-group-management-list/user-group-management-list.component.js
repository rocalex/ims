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
// Import services
const user_group_management_service_1 = require("../user-group-management.service");
const loader_service_1 = require("../../../../shared/loader-service");
const sidenav_model_1 = require("../../../../shared/sidenav/sidenav.model");
const permission_service_1 = require("../../../../shared/permission.service");
let UserGroupManagementListComponent = class UserGroupManagementListComponent {
    constructor(userGroupManagementService, permissionService, loader) {
        this.userGroupManagementService = userGroupManagementService;
        this.permissionService = permissionService;
        this.loader = loader;
        this.userGroupList = [];
    }
    ngOnInit() {
        this.getUserGroupList();
    }
    // Method for fetching the list of all user groups
    getUserGroupList() {
        this.loader.toggleLoader(true);
        this.userGroupManagementService.getAllUserGroups()
            .then((res) => {
            this.userGroupList = res.json();
            this.loader.toggleLoader(false);
        })
            .catch((err) => {
            console.log(err.json());
            this.loader.toggleLoader(false);
        });
    }
    isAllowed(type) {
        return this.permissionService.isAllowed(sidenav_model_1.UserGroupFeatureParentEnum.Administration, sidenav_model_1.UserGroupFeatureChildEnum.UserManagementRole, type);
    }
};
UserGroupManagementListComponent = __decorate([
    core_1.Component({
        moduleId: module.id,
        templateUrl: 'user-group-management-list.html'
    }),
    __metadata("design:paramtypes", [user_group_management_service_1.UserGroupManagementService, permission_service_1.PermissionService,
        loader_service_1.LoaderService])
], UserGroupManagementListComponent);
exports.UserGroupManagementListComponent = UserGroupManagementListComponent;
//# sourceMappingURL=user-group-management-list.component.js.map