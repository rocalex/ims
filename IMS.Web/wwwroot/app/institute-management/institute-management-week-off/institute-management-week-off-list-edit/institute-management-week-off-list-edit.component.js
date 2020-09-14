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
// Services
const institute_management_week_off_service_1 = require("../institute-management-week-off.service");
const institute_management_academic_year_service_1 = require("../../institute-management-academic-year/institute-management-academic-year.service");
const loader_service_1 = require("../../../../shared/loader-service");
const snackbar_service_1 = require("../../../../shared/snackbar-service");
const shared_service_1 = require("../../../../shared/shared.service");
let ListEditWeekOffManagementComponent = class ListEditWeekOffManagementComponent {
    constructor(weekOffManagementService, academicYearManagementService, loaderService, snackBar, sharedService) {
        this.weekOffManagementService = weekOffManagementService;
        this.academicYearManagementService = academicYearManagementService;
        this.loaderService = loaderService;
        this.snackBar = snackBar;
        this.sharedService = sharedService;
        this.academicYears = [];
        this.selectedAcademicYearId = 0;
        this.weekOffsList = [];
        this.updatedWeekOffList = [];
        this.globallySelectedAcademicYear = {};
        this.isEditable = false;
    }
    ngOnInit() {
        this.sharedService.currentAcademicYear.subscribe(res => {
            this.globallySelectedAcademicYear = res;
            if (this.globallySelectedAcademicYear !== null && this.globallySelectedAcademicYear !== undefined) {
                this.getAcademicYears();
            }
        });
    }
    // Method for fetching the list of all active academic years
    getAcademicYears() {
        this.academicYearManagementService.getInstituteAcademicYearsList()
            .then((res) => {
            this.academicYears = res.json();
            let activeAcademicYear = this.academicYears.filter(x => x.isActive)[0];
            if (activeAcademicYear !== null && activeAcademicYear !== undefined && activeAcademicYear.id === this.globallySelectedAcademicYear.id) {
                this.isEditable = true;
                this.selectedAcademicYearId = activeAcademicYear.id;
            }
            else {
                this.isEditable = false;
                this.selectedAcademicYearId = this.globallySelectedAcademicYear.id;
            }
            this.getWeekOffsForSelectedAcademicYear();
        })
            .catch((err) => {
            console.log(err.json());
        });
    }
    // Method for fetching the week offs for the selected academic year
    getWeekOffsForSelectedAcademicYear() {
        if (this.selectedAcademicYearId !== 0) {
            this.updatedWeekOffList = [];
            this.loaderService.toggleLoader(true);
            this.weekOffManagementService.getWeekOffsForSelectedAcademicYear(this.selectedAcademicYearId)
                .then((res) => {
                let result = res.json();
                this.weekOffsList = result;
                this.loaderService.toggleLoader(false);
            })
                .catch((err) => {
                console.log(err.json());
                this.loaderService.toggleLoader(false);
            });
        }
        else {
            this.weekOffsList = [];
        }
    }
    // Method for getting the updated entries
    setWeekOff(weekOff) {
        weekOff.isUpdated = (weekOff.isUpdated === null || weekOff.isUpdated === undefined) ? true : !weekOff.isUpdated;
        this.updatedWeekOffList.push(weekOff);
        this.updatedWeekOffList = this.updatedWeekOffList.filter(x => x.isUpdated);
    }
    // Method for bulk updating the week offs
    bulkUpdateWeekOffs() {
        this.weekOffManagementService.bulkUpdateWeekOffs(this.updatedWeekOffList)
            .then((res) => {
            this.snackBar.showSnackbar(res.json().message);
            this.getWeekOffsForSelectedAcademicYear();
        })
            .catch((err) => {
            this.getWeekOffsForSelectedAcademicYear();
            console.log(err.json());
        });
    }
};
ListEditWeekOffManagementComponent = __decorate([
    core_1.Component({
        moduleId: module.id,
        templateUrl: 'institute-management-week-off-list-edit.html'
    }),
    __metadata("design:paramtypes", [institute_management_week_off_service_1.WeekOffManagementService,
        institute_management_academic_year_service_1.AcademicYearManagementService,
        loader_service_1.LoaderService,
        snackbar_service_1.SnackbarService,
        shared_service_1.SharedService])
], ListEditWeekOffManagementComponent);
exports.ListEditWeekOffManagementComponent = ListEditWeekOffManagementComponent;
//# sourceMappingURL=institute-management-week-off-list-edit.component.js.map