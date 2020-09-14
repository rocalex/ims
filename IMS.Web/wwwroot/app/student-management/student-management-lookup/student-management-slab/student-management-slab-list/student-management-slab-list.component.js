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
const student_management_slab_service_1 = require("../student-management-slab.service");
const loader_service_1 = require("../../../../../shared/loader-service");
const sidenav_model_1 = require("../../../../../shared/sidenav/sidenav.model");
const permission_service_1 = require("../../../../../shared/permission.service");
let ListSlabManagementComponent = class ListSlabManagementComponent {
    constructor(slabManagementService, loaderService, permissionService) {
        this.slabManagementService = slabManagementService;
        this.loaderService = loaderService;
        this.permissionService = permissionService;
        this.slabs = [];
    }
    ngOnInit() {
        this.getAllInstituteSlab();
    }
    getAllInstituteSlab() {
        this.loaderService.toggleLoader(true);
        this.slabManagementService.getAllInstituteSlab().then(res => {
            this.slabs = res.json();
            this.loaderService.toggleLoader(false);
        });
    }
    isAllowed(type) {
        return this.permissionService.isAllowed(sidenav_model_1.UserGroupFeatureParentEnum.Student, sidenav_model_1.UserGroupFeatureChildEnum.StudentLookUp, type);
    }
};
ListSlabManagementComponent = __decorate([
    core_1.Component({
        moduleId: module.id,
        templateUrl: 'student-management-slab-list.html'
    }),
    __metadata("design:paramtypes", [student_management_slab_service_1.SlabManagementService, loader_service_1.LoaderService,
        permission_service_1.PermissionService])
], ListSlabManagementComponent);
exports.ListSlabManagementComponent = ListSlabManagementComponent;
//# sourceMappingURL=student-management-slab-list.component.js.map