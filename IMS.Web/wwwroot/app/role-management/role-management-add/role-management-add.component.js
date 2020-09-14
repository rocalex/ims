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
const router_1 = require("@angular/router");
const loader_service_1 = require("../../../shared/loader-service");
const snackbar_service_1 = require("../../../shared/snackbar-service");
let RoleManagementAddComponent = class RoleManagementAddComponent {
    constructor(roleManagementService, router, snackBar, loaderService) {
        this.roleManagementService = roleManagementService;
        this.router = router;
        this.snackBar = snackBar;
        this.loaderService = loaderService;
    }
    ngOnInit() {
    }
    addRole() {
        this.loaderService.toggleLoader(true);
        this.roleManagementService.addNewRole({ RoleName: this.roleName }).then(res => {
            var response = res.json();
            if (response.message === 'Role added successfully') {
                this.router.navigate(['role', 'list']);
            }
            this.snackBar.showSnackbar(response.message);
            this.loaderService.toggleLoader(false);
        });
    }
};
RoleManagementAddComponent = __decorate([
    core_1.Component({
        moduleId: module.id,
        templateUrl: 'role-management-add.html'
    }),
    __metadata("design:paramtypes", [role_management_service_1.RoleManagementService, router_1.Router,
        snackbar_service_1.SnackbarService, loader_service_1.LoaderService])
], RoleManagementAddComponent);
exports.RoleManagementAddComponent = RoleManagementAddComponent;
//# sourceMappingURL=role-management-add.component.js.map