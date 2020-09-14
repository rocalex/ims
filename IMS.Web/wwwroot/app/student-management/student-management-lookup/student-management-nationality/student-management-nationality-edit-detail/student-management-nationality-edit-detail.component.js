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
const student_management_nationality_service_1 = require("../student-management-nationality.service");
const loader_service_1 = require("../../../../../shared/loader-service");
const router_1 = require("@angular/router");
const snackbar_service_1 = require("../../../../../shared/snackbar-service");
const student_management_lookup_model_1 = require("../../student-management-lookup.model");
let EditAndDetailNationalityManagementComponent = class EditAndDetailNationalityManagementComponent {
    constructor(nationalityManagementService, loaderService, router, snackBar) {
        this.nationalityManagementService = nationalityManagementService;
        this.loaderService = loaderService;
        this.router = router;
        this.snackBar = snackBar;
        this.baseModel = new student_management_lookup_model_1.BaseModelLookUp();
        this.error = new student_management_lookup_model_1.LookUpResponse();
    }
    ngOnInit() {
        var path = location.pathname.split('/');
        this.nationalityId = +(path[4]);
        this.getInstituteNationalityDetail();
    }
    getInstituteNationalityDetail() {
        this.loaderService.toggleLoader(true);
        this.nationalityManagementService.getInstituteNationalityDetail(this.nationalityId).then(res => {
            var response = res.json();
            if (response.message) {
                this.snackBar.showSnackbar(response.message);
                this.router.navigate(['student', 'lookup', 'nationality', 'list']);
            }
            else {
                this.baseModel.Name = response.name;
                this.baseModel.Code = response.code;
                this.baseModel.Description = response.description;
                this.baseModel.Status = response.status;
            }
            this.loaderService.toggleLoader(false);
        });
    }
    updateInstituteNationality(updateNationality) {
        this.loaderService.toggleLoader(true);
        var updateData = {
            Name: updateNationality.Name, Code: updateNationality.Code, NationalityId: this.nationalityId,
            Description: updateNationality.Description, Status: updateNationality.Status
        };
        this.nationalityManagementService.updateInstituteNationality(updateData).then(res => {
            var response = res.json();
            if (!response.hasError) {
                this.router.navigate(['student', 'lookup', 'nationality', 'list']);
                this.snackBar.showSnackbar(response.message);
            }
            else {
                this.error = new student_management_lookup_model_1.LookUpResponse();
                this.error.ErrorType = response.errorType;
                this.error.HasError = response.hasError;
                this.error.Message = response.message;
            }
            this.loaderService.toggleLoader(false);
        });
    }
};
EditAndDetailNationalityManagementComponent = __decorate([
    core_1.Component({
        moduleId: module.id,
        templateUrl: 'student-management-nationality-edit-detail.html'
    }),
    __metadata("design:paramtypes", [student_management_nationality_service_1.NationalityManagementService, loader_service_1.LoaderService,
        router_1.Router, snackbar_service_1.SnackbarService])
], EditAndDetailNationalityManagementComponent);
exports.EditAndDetailNationalityManagementComponent = EditAndDetailNationalityManagementComponent;
//# sourceMappingURL=student-management-nationality-edit-detail.component.js.map