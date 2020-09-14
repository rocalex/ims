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
const institute_management_holiday_off_service_1 = require("../institute-management-holiday-off.service");
const snackbar_service_1 = require("../../../../shared/snackbar-service");
const loader_service_1 = require("../../../../shared/loader-service");
// Import models
const institute_management_holiday_off_model_1 = require("../institute-management-holiday-off.model");
let EditDetailsHolidayOffManagementComponent = class EditDetailsHolidayOffManagementComponent {
    constructor(holidayOffManagementService, snackBar, router, activatedRoute, loader) {
        this.holidayOffManagementService = holidayOffManagementService;
        this.snackBar = snackBar;
        this.router = router;
        this.activatedRoute = activatedRoute;
        this.loader = loader;
        this.occuranceTypesList = [];
        this.holiday = new institute_management_holiday_off_model_1.AddHoliday();
        this.academicYear = {};
        this.isEditable = false;
        this.dateExceedError = '';
        this.activatedRoute.params.subscribe(param => this.holidayId = param.id);
    }
    ngOnInit() {
        this.getHolidayDetails();
    }
    // Method for fetching the details of the holiday
    getHolidayDetails() {
        this.loader.toggleLoader(true);
        this.holidayOffManagementService.getHolidayDetails(this.holidayId)
            .then((res) => {
            let response = res.json();
            this.holiday = response.holiday;
            this.occuranceTypesList = response.occuranceTypesList;
            this.academicYear = response.academicYear;
            this.isEditable = this.academicYear.isActive;
            this.loader.toggleLoader(false);
        })
            .catch((err) => {
            console.log(err.json());
            this.loader.toggleLoader(false);
        });
    }
    // Method for updating holiday
    updateHoliday() {
        if (this.holiday.toDate !== null && this.holiday.toDate !== undefined && new Date(this.holiday.fromDate) > new Date(this.holiday.toDate)) {
            this.dateExceedError = "Ending date of the holiday can not be less than the Starting date of the holiday";
        }
        else {
            this.loader.toggleLoader(true);
            this.holidayOffManagementService.updateHoliday(this.holiday)
                .then((res) => {
                let response = res.json();
                this.snackBar.showSnackbar(response.message);
                if (response.hasError === null || response.hasError === undefined || !response.hasError) {
                    this.router.navigate(['institute', 'holiday', 'list', this.holiday.academicYearId]);
                }
                this.loader.toggleLoader(false);
            })
                .catch((err) => {
                console.log(err.json());
                this.loader.toggleLoader(false);
            });
        }
    }
    // Method for resetting the error messages
    resetError() {
        if (this.dateExceedError !== null && this.dateExceedError !== undefined && this.dateExceedError !== ''
            && this.holiday.toDate !== null && this.holiday.toDate !== undefined
            && new Date(this.holiday.fromDate) <= new Date(this.holiday.toDate)) {
            this.dateExceedError = '';
        }
    }
};
EditDetailsHolidayOffManagementComponent = __decorate([
    core_1.Component({
        moduleId: module.id,
        templateUrl: 'institute-management-holiday-off-edit-details.html'
    }),
    __metadata("design:paramtypes", [institute_management_holiday_off_service_1.HolidayOffManagementService,
        snackbar_service_1.SnackbarService,
        router_1.Router,
        router_1.ActivatedRoute,
        loader_service_1.LoaderService])
], EditDetailsHolidayOffManagementComponent);
exports.EditDetailsHolidayOffManagementComponent = EditDetailsHolidayOffManagementComponent;
//# sourceMappingURL=institute-management-holiday-off-edit-details.component.js.map