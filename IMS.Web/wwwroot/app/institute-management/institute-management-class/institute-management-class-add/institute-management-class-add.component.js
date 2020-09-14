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
const institute_management_class_model_1 = require("../institute-management-class.model");
const institute_management_class_service_1 = require("../institute-management-class.service");
const loader_service_1 = require("../../../../shared/loader-service");
const router_1 = require("@angular/router");
const snackbar_service_1 = require("../../../../shared/snackbar-service");
let AddClassManagementComponent = class AddClassManagementComponent {
    constructor(classManagementService, loaderService, router, snackBar) {
        this.classManagementService = classManagementService;
        this.loaderService = loaderService;
        this.router = router;
        this.snackBar = snackBar;
        this.addClass = new institute_management_class_model_1.AddInstituteClass();
        this.durationUnitList = [institute_management_class_model_1.InstituteClassDurationUnitEnum[institute_management_class_model_1.InstituteClassDurationUnitEnum.Days], institute_management_class_model_1.InstituteClassDurationUnitEnum[institute_management_class_model_1.InstituteClassDurationUnitEnum.Months],
            institute_management_class_model_1.InstituteClassDurationUnitEnum[institute_management_class_model_1.InstituteClassDurationUnitEnum.Weeks], institute_management_class_model_1.InstituteClassDurationUnitEnum[institute_management_class_model_1.InstituteClassDurationUnitEnum.Years]];
        this.selectedDurationUnit = '';
        this.error = new institute_management_class_model_1.InstituteClassResponse();
        this.initialdata = {};
    }
    ngOnInit() {
        this.getInitialData();
    }
    getInitialData() {
        this.loaderService.toggleLoader(true);
        this.classManagementService.getInitialData().then(res => {
            this.initialdata = res.json();
            this.loaderService.toggleLoader(false);
        });
    }
    addInstituteClass() {
        this.loaderService.toggleLoader(true);
        this.addClass.DurationUnit = institute_management_class_model_1.InstituteClassDurationUnitEnum[this.selectedDurationUnit];
        this.classManagementService.addInstituteClass(this.addClass).then(res => {
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
};
AddClassManagementComponent = __decorate([
    core_1.Component({
        moduleId: module.id,
        templateUrl: 'institute-management-class-add.html'
    }),
    __metadata("design:paramtypes", [institute_management_class_service_1.ClassManagementService, loader_service_1.LoaderService,
        router_1.Router, snackbar_service_1.SnackbarService])
], AddClassManagementComponent);
exports.AddClassManagementComponent = AddClassManagementComponent;
//# sourceMappingURL=institute-management-class-add.component.js.map