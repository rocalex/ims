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
const institute_management_subject_service_1 = require("../institute-management-subject.service");
const loader_service_1 = require("../../../../shared/loader-service");
const sidenav_model_1 = require("../../../../shared/sidenav/sidenav.model");
const permission_service_1 = require("../../../../shared/permission.service");
let ListSubjectManagementComponent = class ListSubjectManagementComponent {
    constructor(subjectManagementService, loaderService, permissionService) {
        this.subjectManagementService = subjectManagementService;
        this.loaderService = loaderService;
        this.permissionService = permissionService;
        this.subjectes = [];
    }
    ngOnInit() {
        this.getInstituteInstituteSubjectsList();
    }
    getInstituteInstituteSubjectsList() {
        this.loaderService.toggleLoader(true);
        this.subjectManagementService.getInstituteInstituteSubjectsList().then(res => {
            this.subjectes = res.json();
            this.loaderService.toggleLoader(false);
        });
    }
    isAllowed(type) {
        return this.permissionService.isAllowed(sidenav_model_1.UserGroupFeatureParentEnum.Administration, sidenav_model_1.UserGroupFeatureChildEnum.InstituteSubject, type);
    }
};
ListSubjectManagementComponent = __decorate([
    core_1.Component({
        moduleId: module.id,
        templateUrl: 'institute-management-subject-list.html'
    }),
    __metadata("design:paramtypes", [institute_management_subject_service_1.SubjectManagementService, loader_service_1.LoaderService,
        permission_service_1.PermissionService])
], ListSubjectManagementComponent);
exports.ListSubjectManagementComponent = ListSubjectManagementComponent;
//# sourceMappingURL=institute-management-subject-list.component.js.map