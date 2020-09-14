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
let EditDetailsDesignationManagementComponent = class EditDetailsDesignationManagementComponent {
    constructor(staffDesignationManagementService, loader, router, activatedRoute, snackBar) {
        this.staffDesignationManagementService = staffDesignationManagementService;
        this.loader = loader;
        this.router = router;
        this.activatedRoute = activatedRoute;
        this.snackBar = snackBar;
        this.errorMessage = '';
        this.designation = {};
        this.activatedRoute.params.subscribe(param => this.designationId = param.id);
    }
    ngOnInit() {
        this.getDesignation();
    }
    getDesignation() {
        this.loader.toggleLoader(true);
        this.staffDesignationManagementService.getDesignationDetail(this.designationId)
            .then(res => {
            this.designation = res.json();
            this.loader.toggleLoader(false);
        })
            .catch(err => {
            this.loader.toggleLoader(false);
            console.log(err.json());
        });
    }
    updateDesignation() {
        this.loader.toggleLoader(true);
        this.staffDesignationManagementService.updateDesignation(this.designation)
            .then(res => {
            let response = res.json();
            if (response.hasError === null || response.hasError === undefined || !response.hasError) {
                this.snackBar.showSnackbar(response.message);
                this.router.navigate(['staff', 'designation', 'list']);
            }
            else {
                this.errorMessage = response.message;
            }
            this.loader.toggleLoader(false);
        })
            .catch(err => {
            this.loader.toggleLoader(false);
            console.log(err.json());
        });
    }
    checkWhiteSpace(designationNameModel, designationCodeModel) {
        designationNameModel.whiteSpaceError = '';
        designationCodeModel.whiteSpaceError = '';
        if (this.designation.designationName !== null && this.designation.designationName !== undefined && this.designation.designationName.trim() === '') {
            designationNameModel.whiteSpaceError = 'Designation Name can\'t be empty';
        }
        if (this.designation.code !== null && this.designation.code !== undefined && this.designation.code.trim() === '') {
            designationCodeModel.whiteSpaceError = 'Designation Code can\'t be empty';
        }
    }
    resetError(designationNameModel, designationCodeModel) {
        if (this.designation.designationName === null || this.designation.designationName === undefined || this.designation.designationName.trim() !== '') {
            designationNameModel.whiteSpaceError = '';
        }
        if (this.designation.designationCode === null || this.designation.designationCode === undefined || this.designation.designationCode.trim() !== '') {
            designationCodeModel.whiteSpaceError = '';
        }
        this.errorMessage = '';
    }
};
EditDetailsDesignationManagementComponent = __decorate([
    core_1.Component({
        moduleId: module.id,
        templateUrl: 'staff-management-designation-edit-details.html'
    }),
    __metadata("design:paramtypes", [staff_management_designation_service_1.StaffDesignationManagementService,
        loader_service_1.LoaderService,
        router_1.Router,
        router_1.ActivatedRoute,
        snackbar_service_1.SnackbarService])
], EditDetailsDesignationManagementComponent);
exports.EditDetailsDesignationManagementComponent = EditDetailsDesignationManagementComponent;
//# sourceMappingURL=staff-management-designation-edit-details.component.js.map