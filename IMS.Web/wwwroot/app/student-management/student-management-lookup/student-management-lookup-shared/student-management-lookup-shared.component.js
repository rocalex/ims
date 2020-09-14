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
const LookupModel = require("../student-management-lookup.model");
const sidenav_model_1 = require("../../../../shared/sidenav/sidenav.model");
const permission_service_1 = require("../../../../shared/permission.service");
let StudentManagementLookUpSharedComponent = class StudentManagementLookUpSharedComponent {
    constructor(router) {
        this.router = router;
        this.lookUps = LookupModel.Lookups();
        this.selected = new LookupModel.LookUpModel();
        this.lookUpData = new LookupModel.BaseModelLookUp();
        this.saveChanges = new core_1.EventEmitter();
        this.error = new LookupModel.LookUpResponse();
    }
    ngOnInit() {
        var path = location.pathname.split('/');
        if (path[3]) {
            this.selected = this.lookUps.find(x => x.Url === path[3]);
        }
    }
    checkWhiteSpace(nameModel, name) {
        if (name) {
            if (name.trim() === '') {
                nameModel.whiteSpaceError = true;
            }
            else {
                nameModel.whiteSpaceError = false;
            }
        }
    }
    hasError(fieldName) {
        var id = LookupModel.LookUpResponseType[fieldName];
        if (this.error.ErrorType === id) {
            return this.error.HasError;
        }
        else {
            return false;
        }
    }
    resetError(fieldName) {
        var id = LookupModel.LookUpResponseType[fieldName];
        if (this.error.ErrorType === id) {
            this.error = new LookupModel.LookUpResponse();
        }
    }
    add() {
        this.saveChanges.emit(this.lookUpData);
    }
};
__decorate([
    core_1.Input(),
    __metadata("design:type", LookupModel.BaseModelLookUp)
], StudentManagementLookUpSharedComponent.prototype, "lookUpData", void 0);
__decorate([
    core_1.Output(),
    __metadata("design:type", core_1.EventEmitter)
], StudentManagementLookUpSharedComponent.prototype, "saveChanges", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", LookupModel.LookUpResponse)
], StudentManagementLookUpSharedComponent.prototype, "error", void 0);
StudentManagementLookUpSharedComponent = __decorate([
    core_1.Component({
        moduleId: module.id,
        selector: 'look-up-shared',
        templateUrl: 'student-management-lookup-shared.html'
    }),
    __metadata("design:paramtypes", [router_1.Router])
], StudentManagementLookUpSharedComponent);
exports.StudentManagementLookUpSharedComponent = StudentManagementLookUpSharedComponent;
let StudentManagementLookUpSharedListComponent = class StudentManagementLookUpSharedListComponent {
    constructor(router, permissionService) {
        this.router = router;
        this.permissionService = permissionService;
        this.lookUps = LookupModel.Lookups();
        this.selected = new LookupModel.LookUpModel();
        this.list = [];
    }
    ngOnInit() {
        var path = location.pathname.split('/');
        if (path[3]) {
            this.selected = this.lookUps.find(x => x.Url === path[3]);
        }
    }
    isAllowed(type) {
        return this.permissionService.isAllowed(sidenav_model_1.UserGroupFeatureParentEnum.Student, sidenav_model_1.UserGroupFeatureChildEnum.StudentLookUp, 'Edit');
    }
};
__decorate([
    core_1.Input(),
    __metadata("design:type", Array)
], StudentManagementLookUpSharedListComponent.prototype, "list", void 0);
StudentManagementLookUpSharedListComponent = __decorate([
    core_1.Component({
        moduleId: module.id,
        selector: 'look-up-shared-list',
        templateUrl: 'student-management-lookup-shared-list.html'
    }),
    __metadata("design:paramtypes", [router_1.Router, permission_service_1.PermissionService])
], StudentManagementLookUpSharedListComponent);
exports.StudentManagementLookUpSharedListComponent = StudentManagementLookUpSharedListComponent;
//# sourceMappingURL=student-management-lookup-shared.component.js.map