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
const staff_management_designation_service_1 = require("../staff-management-designation.service");
const loader_service_1 = require("../../../../shared/loader-service");
const snackbar_service_1 = require("../../../../shared/snackbar-service");
let AddDesignationManagementComponent = class AddDesignationManagementComponent {
    constructor(staffDesignationManagementService, loaderService, router, snackBar) {
        this.staffDesignationManagementService = staffDesignationManagementService;
        this.loaderService = loaderService;
        this.router = router;
        this.snackBar = snackBar;
        this.designationName = null;
        this.designationCode = null;
        this.designationDescription = null;
        this.errorMessage = '';
    }
    ngOnInit() { }
    addDesignation() {
        this.loaderService.toggleLoader(true);
        this.staffDesignationManagementService.addDesignation({ DesignationName: this.designationName, Code: this.designationCode, Description: this.designationDescription })
            .then(res => {
            let response = res.json();
            if (response.hasError === null || response.hasError === undefined || !response.hasError) {
                this.snackBar.showSnackbar(response.message);
                this.router.navigate(['staff', 'designation', 'list']);
            }
            else {
                this.errorMessage = response.message;
            }
            this.loaderService.toggleLoader(false);
        })
            .catch(err => {
            this.loaderService.toggleLoader(false);
            console.log(err.json());
        });
    }
    checkWhiteSpace(designationNameModel, designationCodeModel) {
        designationNameModel.whiteSpaceError = '';
        designationCodeModel.whiteSpaceError = '';
        if (this.designationName !== null && this.designationName !== undefined && this.designationName.trim() === '') {
            designationNameModel.whiteSpaceError = 'Designation Name can\'t be empty';
        }
        if (this.designationCode !== null && this.designationCode !== undefined && this.designationCode.trim() === '') {
            designationCodeModel.whiteSpaceError = 'Designation Code can\'t be empty';
        }
    }
    resetError(designationNameModel, designationCodeModel) {
        if (this.designationName === null || this.designationName === undefined || this.designationName.trim() !== '') {
            designationNameModel.whiteSpaceError = '';
        }
        if (this.designationCode === null || this.designationCode === undefined || this.designationCode.trim() !== '') {
            designationCodeModel.whiteSpaceError = '';
        }
        this.errorMessage = '';
    }
};
AddDesignationManagementComponent = __decorate([
    core_1.Component({
        moduleId: module.id,
        templateUrl: 'staff-management-designation-add.html'
    }),
    __metadata("design:paramtypes", [staff_management_designation_service_1.StaffDesignationManagementService,
        loader_service_1.LoaderService,
        router_1.Router,
        snackbar_service_1.SnackbarService])
], AddDesignationManagementComponent);
exports.AddDesignationManagementComponent = AddDesignationManagementComponent;
//# sourceMappingURL=staff-management-designation-add.component.js.map