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
let AddHolidayOffManagementComponent = class AddHolidayOffManagementComponent {
    constructor(holidayOffManagementService, snackBar, activatedRoute, router, loader) {
        this.holidayOffManagementService = holidayOffManagementService;
        this.snackBar = snackBar;
        this.activatedRoute = activatedRoute;
        this.router = router;
        this.loader = loader;
        this.occuranceTypesList = [];
        this.holiday = new institute_management_holiday_off_model_1.AddHoliday();
        this.academicYear = {};
        this.isEditable = false;
        this.dateExceedError = '';
        this.activatedRoute.params.subscribe(param => this.academicYearId = param.academicyearid);
    }
    ngOnInit() {
        if (this.academicYearId == 0) {
            this.snackBar.showSnackbar('Please select academic year');
            this.router.navigate(['institute', 'holiday', 'list']);
        }
        else {
            this.getHolidayOccuranceTypesList();
        }
    }
    // Method for fetching the list of holiday occurance types
    getHolidayOccuranceTypesList() {
        this.holidayOffManagementService.getHolidayOccuranceTypesList(this.academicYearId)
            .then((res) => {
            let response = res.json();
            this.occuranceTypesList = response.occuranceTypesList;
            this.academicYear = response.academicYear;
            this.isEditable = this.academicYear.isActive;
        })
            .catch((err) => {
            console.log(err.json());
        });
    }
    // Method for adding new holiday
    addNewHoliday() {
        if (this.holiday.toDate !== null && this.holiday.toDate !== undefined && new Date(this.holiday.fromDate) > new Date(this.holiday.toDate)) {
            this.dateExceedError = "Ending date of the holiday can not be less than the Starting date of the holiday";
        }
        else {
            this.loader.toggleLoader(true);
            this.holiday.academicYearId = this.academicYearId;
            this.holidayOffManagementService.addHoliday(this.holiday)
                .then((res) => {
                let response = res.json();
                this.snackBar.showSnackbar(response.message);
                if (response.hasError === null || response.hasError === undefined || !response.hasError) {
                    this.router.navigate(['institute', 'holiday', 'list', this.academicYearId]);
                }
                this.loader.toggleLoader(false);
            })
                .catch((err) => {
                this.loader.toggleLoader(false);
                console.log(err.json());
            });
        }
    }
    // Method for resetting the error messages
    resetError() {
        if (this.dateExceedError !== null && this.dateExceedError !== undefined && this.dateExceedError !== ''
            && new Date(this.holiday.fromDate) <= new Date(this.holiday.toDate)) {
            this.dateExceedError = '';
        }
    }
};
AddHolidayOffManagementComponent = __decorate([
    core_1.Component({
        moduleId: module.id,
        templateUrl: 'institute-management-holiday-off-add.html'
    }),
    __metadata("design:paramtypes", [institute_management_holiday_off_service_1.HolidayOffManagementService,
        snackbar_service_1.SnackbarService,
        router_1.ActivatedRoute,
        router_1.Router,
        loader_service_1.LoaderService])
], AddHolidayOffManagementComponent);
exports.AddHolidayOffManagementComponent = AddHolidayOffManagementComponent;
//# sourceMappingURL=institute-management-holiday-off-add.component.js.map