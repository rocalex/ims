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
const look_up_management_model_1 = require("../look-up-management.model");
const look_up_management_service_1 = require("../look-up-management.service");
const loader_service_1 = require("../../../../shared/loader-service");
const router_1 = require("@angular/router");
const snackbar_service_1 = require("../../../../shared/snackbar-service");
let EditAndDetailLookUpManagementComponent = class EditAndDetailLookUpManagementComponent {
    constructor(lookUpManagementService, loaderService, router, snackBar) {
        this.lookUpManagementService = lookUpManagementService;
        this.loaderService = loaderService;
        this.router = router;
        this.snackBar = snackBar;
        this.updateLookUp = new look_up_management_model_1.UpdateLookUpManagementAc();
        this.error = new look_up_management_model_1.LookUpManagementResponse();
        this.selectedLookUp = {};
        this.lookUps = [];
    }
    ngOnInit() {
        var path = location.pathname.split('/');
        this.lookUpId = +(path[3]);
        this.getLookUpMappingDetailById();
    }
    hasError(fieldName) {
        var id = look_up_management_model_1.LookUpManagementResponseType[fieldName];
        if (this.error.ErrorType === id) {
            return this.error.HasError;
        }
        else {
            return false;
        }
    }
    resetError(fieldName) {
        var id = look_up_management_model_1.LookUpManagementResponseType[fieldName];
        if (this.error.ErrorType === id) {
            this.error = new look_up_management_model_1.LookUpManagementResponse();
        }
    }
    getLookUpMappingDetailById() {
        this.loaderService.toggleLoader(true);
        this.lookUpManagementService.getLookUpMappingDetailById(this.lookUpId).then(res => {
            var response = res.json();
            if (response.message) {
                this.router.navigate(['administration', 'lookup', 'list']);
                this.snackBar.showSnackbar(response.message);
            }
            else {
                this.updateLookUp.Code = response.code;
                this.updateLookUp.Description = response.description;
                this.updateLookUp.IsDefault = response.isDefault;
                this.updateLookUp.IsDeleted = response.isDeleted;
                this.updateLookUp.IsSystemRow = response.isSystemRow;
                this.updateLookUp.LookUpId = response.lookUpId;
                this.updateLookUp.Name = response.name;
                this.updateLookUp.Status = response.status;
                this.getAllLookUps();
            }
            this.loaderService.toggleLoader(false);
        });
    }
    getAllLookUps() {
        this.loaderService.toggleLoader(true);
        this.lookUpManagementService.getAllLookUps().then(res => {
            this.lookUps = res.json();
            this.selectedLookUp = this.lookUps.find(x => x.id === this.updateLookUp.LookUpId);
            this.loaderService.toggleLoader(false);
        });
    }
    updateLookUpMapping() {
        this.loaderService.toggleLoader(true);
        this.updateLookUp.LookUpId = this.selectedLookUp.id;
        this.updateLookUp.Id = this.lookUpId;
        this.lookUpManagementService.updateLookUpMapping(this.updateLookUp).then(res => {
            var response = res.json();
            if (!response.hasError) {
                this.router.navigate(['administration', 'lookup', 'list']);
                this.snackBar.showSnackbar(response.message);
            }
            else {
                this.error.ErrorType = response.errorType;
                this.error.HasError = response.hasError;
                this.error.Message = response.message;
            }
            this.loaderService.toggleLoader(false);
        });
    }
};
EditAndDetailLookUpManagementComponent = __decorate([
    core_1.Component({
        moduleId: module.id,
        templateUrl: 'look-up-management-edit-detail.html'
    }),
    __metadata("design:paramtypes", [look_up_management_service_1.LookUpManagementService, loader_service_1.LoaderService,
        router_1.Router, snackbar_service_1.SnackbarService])
], EditAndDetailLookUpManagementComponent);
exports.EditAndDetailLookUpManagementComponent = EditAndDetailLookUpManagementComponent;
//# sourceMappingURL=look-up-management-edit-detail.component.js.map