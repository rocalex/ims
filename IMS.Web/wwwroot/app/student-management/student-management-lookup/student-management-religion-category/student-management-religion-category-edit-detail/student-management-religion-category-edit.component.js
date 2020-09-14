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
const student_management_religion_category_service_1 = require("../student-management-religion-category.service");
const loader_service_1 = require("../../../../../shared/loader-service");
const router_1 = require("@angular/router");
const snackbar_service_1 = require("../../../../../shared/snackbar-service");
const student_management_lookup_model_1 = require("../../student-management-lookup.model");
let EditAndDetailReligionCategoryManagementComponent = class EditAndDetailReligionCategoryManagementComponent {
    constructor(religionCategoryManagementService, loaderService, router, snackBar) {
        this.religionCategoryManagementService = religionCategoryManagementService;
        this.loaderService = loaderService;
        this.router = router;
        this.snackBar = snackBar;
        this.baseModel = new student_management_lookup_model_1.BaseModelLookUp();
        this.error = new student_management_lookup_model_1.LookUpResponse();
    }
    ngOnInit() {
        var path = location.pathname.split('/');
        this.religionCategoryId = +(path[4]);
        this.getInstituteReligionCategoryDetail();
    }
    getInstituteReligionCategoryDetail() {
        this.loaderService.toggleLoader(true);
        this.religionCategoryManagementService.getInstituteReligionCategoryDetail(this.religionCategoryId).then(res => {
            var response = res.json();
            if (response.message) {
                this.snackBar.showSnackbar(response.message);
                this.router.navigate(['student', 'lookup', 'religioncategory', 'list']);
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
    updateInstituteReligionCategory(updateReligionCategory) {
        this.loaderService.toggleLoader(true);
        var updateData = {
            Name: updateReligionCategory.Name, Code: updateReligionCategory.Code, ReligionCategoryId: this.religionCategoryId,
            Description: updateReligionCategory.Description, Status: updateReligionCategory.Status
        };
        this.religionCategoryManagementService.updateInstituteReligionCategory(updateData).then(res => {
            var response = res.json();
            if (!response.hasError) {
                this.router.navigate(['student', 'lookup', 'religioncategory', 'list']);
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
EditAndDetailReligionCategoryManagementComponent = __decorate([
    core_1.Component({
        moduleId: module.id,
        templateUrl: 'student-management-religion-category-edit-detail.html'
    }),
    __metadata("design:paramtypes", [student_management_religion_category_service_1.ReligionCategoryManagementService, loader_service_1.LoaderService,
        router_1.Router, snackbar_service_1.SnackbarService])
], EditAndDetailReligionCategoryManagementComponent);
exports.EditAndDetailReligionCategoryManagementComponent = EditAndDetailReligionCategoryManagementComponent;
//# sourceMappingURL=student-management-religion-category-edit.component.js.map