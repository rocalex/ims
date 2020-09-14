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
const router_1 = require("@angular/router");
const snackbar_service_1 = require("../../../../../shared/snackbar-service");
const student_management_lookup_model_1 = require("../../student-management-lookup.model");
let EditAndDetailSlabManagementComponent = class EditAndDetailSlabManagementComponent {
    constructor(slabManagementService, loaderService, router, snackBar) {
        this.slabManagementService = slabManagementService;
        this.loaderService = loaderService;
        this.router = router;
        this.snackBar = snackBar;
        this.baseModel = new student_management_lookup_model_1.BaseModelLookUp();
        this.error = new student_management_lookup_model_1.LookUpResponse();
    }
    ngOnInit() {
        var path = location.pathname.split('/');
        this.slabId = +(path[4]);
        this.getInstituteSlabDetail();
    }
    getInstituteSlabDetail() {
        this.loaderService.toggleLoader(true);
        this.slabManagementService.getInstituteSlabDetail(this.slabId).then(res => {
            var response = res.json();
            if (response.message) {
                this.snackBar.showSnackbar(response.message);
                this.router.navigate(['student', 'lookup', 'slab', 'list']);
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
    updateInstituteSlab(updateSlab) {
        this.loaderService.toggleLoader(true);
        var updateData = {
            Name: updateSlab.Name, Code: updateSlab.Code, SlabId: this.slabId,
            Description: updateSlab.Description, Status: updateSlab.Status
        };
        this.slabManagementService.updateInstituteSlab(updateData).then(res => {
            var response = res.json();
            if (!response.hasError) {
                this.router.navigate(['student', 'lookup', 'slab', 'list']);
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
EditAndDetailSlabManagementComponent = __decorate([
    core_1.Component({
        moduleId: module.id,
        templateUrl: 'student-management-slab-edit-detail.html'
    }),
    __metadata("design:paramtypes", [student_management_slab_service_1.SlabManagementService, loader_service_1.LoaderService,
        router_1.Router, snackbar_service_1.SnackbarService])
], EditAndDetailSlabManagementComponent);
exports.EditAndDetailSlabManagementComponent = EditAndDetailSlabManagementComponent;
//# sourceMappingURL=student-management-slab-edit-detail.component.js.map