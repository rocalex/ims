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
const institute_management_class_service_1 = require("../institute-management-class.service");
const loader_service_1 = require("../../../../shared/loader-service");
const router_1 = require("@angular/router");
const snackbar_service_1 = require("../../../../shared/snackbar-service");
const institute_management_class_model_1 = require("../institute-management-class.model");
let EditDetailsClassManagementComponent = class EditDetailsClassManagementComponent {
    constructor(classManagementService, loaderService, router, snackBar) {
        this.classManagementService = classManagementService;
        this.loaderService = loaderService;
        this.router = router;
        this.snackBar = snackBar;
        this.updateClass = new institute_management_class_model_1.UpdateInstituteClass();
        this.durationUnitList = [institute_management_class_model_1.InstituteClassDurationUnitEnum[institute_management_class_model_1.InstituteClassDurationUnitEnum.Days], institute_management_class_model_1.InstituteClassDurationUnitEnum[institute_management_class_model_1.InstituteClassDurationUnitEnum.Months],
            institute_management_class_model_1.InstituteClassDurationUnitEnum[institute_management_class_model_1.InstituteClassDurationUnitEnum.Weeks], institute_management_class_model_1.InstituteClassDurationUnitEnum[institute_management_class_model_1.InstituteClassDurationUnitEnum.Years]];
        this.error = new institute_management_class_model_1.InstituteClassResponse();
        this.initialdata = {};
    }
    ngOnInit() {
        this.getInitialData();
        var path = location.pathname.split('/');
        this.classId = +(path[3]);
        this.getInstituteClassDetails();
    }
    getInitialData() {
        this.loaderService.toggleLoader(true);
        this.classManagementService.getInitialData().then(res => {
            this.initialdata = res.json();
            this.loaderService.toggleLoader(false);
        });
    }
    getInstituteClassDetails() {
        this.loaderService.toggleLoader(true);
        this.classManagementService.getInstituteClassDetails(this.classId).then(res => {
            var response = res.json();
            if (response.message) {
                this.router.navigate(['institute', 'class', 'list']);
                this.snackBar.showSnackbar(response.message);
            }
            else {
                this.updateClass.ClassOrder = response.classOrder;
                this.updateClass.Duration = response.duration;
                this.updateClass.DurationUnit = response.durationUnit;
                this.updateClass.GroupCode = response.groupCode;
                this.updateClass.IsGroup = response.isGroup;
                this.updateClass.Name = response.name;
                this.updateClass.NumberOfFeeTerms = response.numberOfFeeTerms;
                this.updateClass.ClassTeacherId = response.classTeacherId;
                this.selectedDurationUnit = institute_management_class_model_1.InstituteClassDurationUnitEnum[this.updateClass.DurationUnit];
            }
            this.loaderService.toggleLoader(false);
        });
    }
    hasError(fieldName) {
        var id = institute_management_class_model_1.InstituteClassResponseType[fieldName];
        if (this.error.ErrorType === id) {
            return this.error.HasError;
        }
        else {
            return false;
        }
    }
    resetError(fieldName) {
        var id = institute_management_class_model_1.InstituteClassResponseType[fieldName];
        if (this.error.ErrorType === id) {
            this.error = new institute_management_class_model_1.InstituteClassResponse();
        }
    }
    updateInstituteClass() {
        this.loaderService.toggleLoader(true);
        this.updateClass.Id = this.classId;
        this.updateClass.DurationUnit = institute_management_class_model_1.InstituteClassDurationUnitEnum[this.selectedDurationUnit];
        this.classManagementService.updateInstituteClass(this.updateClass).then(res => {
            var response = res.json();
            if (!response.hasError) {
                this.router.navigate(['institute', 'class', 'list']);
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
EditDetailsClassManagementComponent = __decorate([
    core_1.Component({
        moduleId: module.id,
        templateUrl: 'institute-management-class-edit-details.html'
    }),
    __metadata("design:paramtypes", [institute_management_class_service_1.ClassManagementService, loader_service_1.LoaderService,
        router_1.Router, snackbar_service_1.SnackbarService])
], EditDetailsClassManagementComponent);
exports.EditDetailsClassManagementComponent = EditDetailsClassManagementComponent;
//# sourceMappingURL=institute-management-class-edit-details.js.map