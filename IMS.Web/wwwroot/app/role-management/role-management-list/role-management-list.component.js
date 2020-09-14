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
const role_management_service_1 = require("../role-management.service");
const loader_service_1 = require("../../../shared/loader-service");
let RoleManagementListComponent = class RoleManagementListComponent {
    constructor(roleManagementService, loaderService) {
        this.roleManagementService = roleManagementService;
        this.loaderService = loaderService;
        this.roles = [];
    }
    ngOnInit() {
        this.loaderService.toggleLoader(true);
        this.getAllRoles();
    }
    getAllRoles() {
        this.roleManagementService.getAllRoles().then(res => {
            this.roles = res.json();
            this.loaderService.toggleLoader(false);
        });
    }
};
RoleManagementListComponent = __decorate([
    core_1.Component({
        moduleId: module.id,
        templateUrl: 'role-management-list.html'
    }),
    __metadata("design:paramtypes", [role_management_service_1.RoleManagementService, loader_service_1.LoaderService])
], RoleManagementListComponent);
exports.RoleManagementListComponent = RoleManagementListComponent;
//# sourceMappingURL=role-management-list.component.js.map