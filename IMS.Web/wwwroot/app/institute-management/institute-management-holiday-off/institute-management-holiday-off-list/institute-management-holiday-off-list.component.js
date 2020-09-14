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
// Services
const institute_management_holiday_off_service_1 = require("../institute-management-holiday-off.service");
const institute_management_academic_year_service_1 = require("../../institute-management-academic-year/institute-management-academic-year.service");
const loader_service_1 = require("../../../../shared/loader-service");
const snackbar_service_1 = require("../../../../shared/snackbar-service");
const shared_service_1 = require("../../../../shared/shared.service");
const sidenav_model_1 = require("../../../../shared/sidenav/sidenav.model");
const permission_service_1 = require("../../../../shared/permission.service");
let ListHolidayOffManagementComponent = class ListHolidayOffManagementComponent {
    constructor(holidayOffManagementService, academicYearManagementService, activatedRoute, snackBar, loaderService, sharedService, permissionService) {
        this.holidayOffManagementService = holidayOffManagementService;
        this.academicYearManagementService = academicYearManagementService;
        this.activatedRoute = activatedRoute;
        this.snackBar = snackBar;
        this.loaderService = loaderService;
        this.sharedService = sharedService;
        this.permissionService = permissionService;
        this.academicYears = [];
        this.selectedAcademicYearId = 0;
        this.holidaysList = [];
        this.globallySelectedAcademicYear = {};
        this.isEditable = false;
        this.activatedRoute.params.subscribe(param => {
            if (param.academicyearid !== null && param.academicyearid !== undefined) {
                this.selectedAcademicYearId = param.academicyearid;
                this.getHolidayssForSelectedAcademicYear();
            }
        });
    }
    ngOnInit() {
        this.sharedService.currentAcademicYear.subscribe(res => {
            setTimeout(() => {
                this.globallySelectedAcademicYear = res;
                if (this.globallySelectedAcademicYear !== null && this.globallySelectedAcademicYear !== undefined) {
                    this.getAcademicYears();
                }
            }, 0);
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
            this.getHolidayssForSelectedAcademicYear();
        })
            .catch((err) => {
            console.log(err.json());
        });
    }
    // Method for fetching the holidays for the selected academic year
    getHolidayssForSelectedAcademicYear() {
        if (this.selectedAcademicYearId !== null && this.selectedAcademicYearId !== undefined && this.selectedAcademicYearId !== 0) {
            this.loaderService.toggleLoader(true);
            this.holidayOffManagementService.getHolidayssForSelectedAcademicYear(this.selectedAcademicYearId)
                .then((res) => {
                this.holidaysList = res.json();
                this.loaderService.toggleLoader(false);
            })
                .catch((err) => {
                console.log(err.json());
                this.loaderService.toggleLoader(false);
            });
        }
        else {
            this.holidaysList = [];
        }
    }
    // Method for deleting a holiday
    deleteHoliday(holidayId) {
        //this.loaderService.toggleLoader(true);
        this.holidayOffManagementService.deleteHoliday(holidayId)
            .then(res => {
            let response = res.json();
            this.loaderService.toggleLoader(false);
            this.snackBar.showSnackbar(response.message);
            this.getHolidayssForSelectedAcademicYear();
        })
            .catch(err => {
            console.log(err.json());
            this.loaderService.toggleLoader(false);
        });
    }
    isAllowed(type) {
        return this.permissionService.isAllowed(sidenav_model_1.UserGroupFeatureParentEnum.Administration, sidenav_model_1.UserGroupFeatureChildEnum.InstituteHolidayOff, type);
    }
};
ListHolidayOffManagementComponent = __decorate([
    core_1.Component({
        moduleId: module.id,
        templateUrl: 'institute-management-holiday-off-list.html'
    }),
    __metadata("design:paramtypes", [institute_management_holiday_off_service_1.HolidayOffManagementService,
        institute_management_academic_year_service_1.AcademicYearManagementService,
        router_1.ActivatedRoute,
        snackbar_service_1.SnackbarService,
        loader_service_1.LoaderService,
        shared_service_1.SharedService,
        permission_service_1.PermissionService])
], ListHolidayOffManagementComponent);
exports.ListHolidayOffManagementComponent = ListHolidayOffManagementComponent;
//# sourceMappingURL=institute-management-holiday-off-list.component.js.map