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
// Import services
const institute_management_academic_year_service_1 = require("../institute-management-academic-year.service");
const snackbar_service_1 = require("../../../../shared/snackbar-service");
const loader_service_1 = require("../../../../shared/loader-service");
// Import models
const institute_management_academic_year_model_1 = require("../institute-management-academic-year.model");
let AddAcademicYearManagementComponent = class AddAcademicYearManagementComponent {
    constructor(academicYearManagementService, snackBar, router, loader) {
        this.academicYearManagementService = academicYearManagementService;
        this.snackBar = snackBar;
        this.router = router;
        this.loader = loader;
        this.academicYear = new institute_management_academic_year_model_1.AddAcademicYear();
        this.errorMessage = '';
        this.dateExceedError = '';
    }
    ngOnInit() { }
    // Method for adding new academic year
    addAcademicYear() {
        if (this.academicYear.toDate !== null && this.academicYear.toDate !== undefined && this.academicYear.fromDate > this.academicYear.toDate) {
            this.dateExceedError = "Ending date of the academic year can not be less than the Starting date of the academic year";
        }
        else {
            this.loader.toggleLoader(true);
            this.academicYear.fromDate = this.convertDateToUtc(this.academicYear.fromDate);
            this.academicYear.toDate = this.convertDateToUtc(this.academicYear.toDate);
            this.academicYearManagementService.addAcademicYear(this.academicYear)
                .then((res) => {
                let response = res.json();
                if (response.hasError === null || response.hasError === undefined || !response.hasError) {
                    this.snackBar.showSnackbar(response.message);
                    this.router.navigate(['institute', 'academicyear', 'list']);
                }
                else {
                    this.errorMessage = response.message;
                }
                this.loader.toggleLoader(false);
            })
                .catch((err) => {
                console.log(err.json());
                this.loader.toggleLoader(false);
            });
        }
    }
    checkWhiteSpace(academicYearCodeModel, challanStartingNumberModel) {
        academicYearCodeModel.whiteSpaceError = '';
        challanStartingNumberModel.whiteSpaceError = '';
        if (this.academicYear.academicYearCode !== null && this.academicYear.academicYearCode !== undefined && this.academicYear.academicYearCode.trim() === '') {
            academicYearCodeModel.whiteSpaceError = 'Academic year code can\'t be null or empty';
        }
        if (this.academicYear.challanStartingNumber !== null && this.academicYear.challanStartingNumber !== undefined && this.academicYear.challanStartingNumber.trim() == '') {
            challanStartingNumberModel.whiteSpaceError = 'Challan starting number can\'t be null or empty';
        }
    }
    resetError(academicYearCodeModel, challanStartingNumberModel) {
        if (this.dateExceedError !== null && this.dateExceedError !== undefined && this.dateExceedError !== ''
            && this.academicYear.toDate !== null && this.academicYear.toDate !== undefined && this.academicYear.fromDate <= this.academicYear.toDate) {
            this.dateExceedError = '';
        }
        if (this.academicYear.academicYearCode !== null && this.academicYear.academicYearCode !== undefined && this.academicYear.academicYearCode.trim() !== '') {
            academicYearCodeModel.whiteSpaceError = '';
        }
        if (this.academicYear.challanStartingNumber !== null && this.academicYear.challanStartingNumber !== undefined && this.academicYear.challanStartingNumber.trim() !== '') {
            challanStartingNumberModel.whiteSpaceError = '';
        }
        this.errorMessage = '';
    }
    convertDateToUtc(dateString) {
        var date = new Date(dateString);
        return new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()));
    }
};
AddAcademicYearManagementComponent = __decorate([
    core_1.Component({
        moduleId: module.id,
        templateUrl: 'institute-management-academic-year-add.html'
    }),
    __metadata("design:paramtypes", [institute_management_academic_year_service_1.AcademicYearManagementService,
        snackbar_service_1.SnackbarService,
        router_1.Router,
        loader_service_1.LoaderService])
], AddAcademicYearManagementComponent);
exports.AddAcademicYearManagementComponent = AddAcademicYearManagementComponent;
//# sourceMappingURL=institute-management-academic-year-add.component.js.map