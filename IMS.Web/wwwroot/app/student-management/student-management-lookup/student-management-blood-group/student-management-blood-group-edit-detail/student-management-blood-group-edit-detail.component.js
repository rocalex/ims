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
const student_management_blood_group_service_1 = require("../student-management-blood-group.service");
const loader_service_1 = require("../../../../../shared/loader-service");
const router_1 = require("@angular/router");
const snackbar_service_1 = require("../../../../../shared/snackbar-service");
const student_management_lookup_model_1 = require("../../student-management-lookup.model");
let EditAndDetailBloodGroupManagementComponent = class EditAndDetailBloodGroupManagementComponent {
    constructor(bloodGroupManagementService, loaderService, router, snackBar) {
        this.bloodGroupManagementService = bloodGroupManagementService;
        this.loaderService = loaderService;
        this.router = router;
        this.snackBar = snackBar;
        this.bloodGroup = new student_management_lookup_model_1.BaseModelLookUp();
        this.error = new student_management_lookup_model_1.LookUpResponse();
    }
    ngOnInit() {
        var path = location.pathname.split('/');
        this.bloodGroupId = +(path[4]);
        this.getInstituteBloodGroupDetail();
    }
    getInstituteBloodGroupDetail() {
        this.loaderService.toggleLoader(true);
        this.bloodGroupManagementService.getInstituteBloodGroupDetail(this.bloodGroupId).then(res => {
            var response = res.json();
            if (response.message) {
                this.snackBar.showSnackbar(response.message);
                this.router.navigate(['student', 'lookup', 'bloodgroup', 'list']);
            }
            else {
                this.bloodGroup.Code = response.code;
                this.bloodGroup.Name = response.name;
                this.bloodGroup.Description = response.description;
                this.bloodGroup.Status = response.status;
            }
            this.loaderService.toggleLoader(false);
        });
    }
    updateInstituteBloodGroup(updateBloodGroup) {
        this.loaderService.toggleLoader(true);
        var updateData = {
            Name: updateBloodGroup.Name, Code: updateBloodGroup.Code, BloodGroupId: this.bloodGroupId,
            Description: updateBloodGroup.Description, Status: updateBloodGroup.Status
        };
        this.bloodGroupManagementService.updateInstituteBloodGroup(updateData).then(res => {
            var response = res.json();
            if (!response.hasError) {
                this.router.navigate(['student', 'lookup', 'bloodgroup', 'list']);
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
EditAndDetailBloodGroupManagementComponent = __decorate([
    core_1.Component({
        moduleId: module.id,
        templateUrl: 'student-management-blood-group-edit-detail.html'
    }),
    __metadata("design:paramtypes", [student_management_blood_group_service_1.BloodGroupManagementService, loader_service_1.LoaderService,
        router_1.Router, snackbar_service_1.SnackbarService])
], EditAndDetailBloodGroupManagementComponent);
exports.EditAndDetailBloodGroupManagementComponent = EditAndDetailBloodGroupManagementComponent;
//# sourceMappingURL=student-management-blood-group-edit-detail.component.js.map