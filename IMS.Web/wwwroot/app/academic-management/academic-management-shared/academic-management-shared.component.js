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
const academic_management_model_1 = require("../academic-management.model");
let AcademicManagementSharedComponent = class AcademicManagementSharedComponent {
    constructor(router) {
        this.router = router;
        this.lookUpData = new academic_management_model_1.BaseModelLookUp();
        this.saveChanges = new core_1.EventEmitter();
        this.error = new academic_management_model_1.LookUpResponse();
        this.selectedUrl = '';
        this.countries = [];
        this.selectedCountry = {};
        this.states = [];
        this.selectedState = {};
    }
    ngOnInit() {
    }
    hasError(fieldName) {
        var id = academic_management_model_1.LookUpResponseType[fieldName];
        if (this.error.ErrorType === id) {
            return this.error.HasError;
        }
        else {
            return false;
        }
    }
    resetError(fieldName) {
        var id = academic_management_model_1.LookUpResponseType[fieldName];
        if (this.error.ErrorType === id) {
            this.error = new academic_management_model_1.LookUpResponse();
        }
    }
    add() {
        this.saveChanges.emit({ lookUp: this.lookUpData, country: this.selectedCountry, state: this.selectedState });
    }
    isAllowedForCountry() {
        if (this.selectedUrl === 'state' || this.selectedUrl === 'city') {
            if (this.selectedCountry.id) {
                return true;
            }
            else {
                return false;
            }
        }
        else {
            return true;
        }
    }
    getStates() {
        var country = this.countries.find(x => x.id === this.selectedCountry.id);
        this.states = country.states;
        this.selectedState = {};
    }
    isAllowedForState() {
        if (this.selectedUrl === 'city') {
            if (this.selectedState.id) {
                return true;
            }
            else {
                return false;
            }
        }
        else {
            return true;
        }
    }
};
__decorate([
    core_1.Input(),
    __metadata("design:type", academic_management_model_1.BaseModelLookUp)
], AcademicManagementSharedComponent.prototype, "lookUpData", void 0);
__decorate([
    core_1.Output(),
    __metadata("design:type", core_1.EventEmitter)
], AcademicManagementSharedComponent.prototype, "saveChanges", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", academic_management_model_1.LookUpResponse)
], AcademicManagementSharedComponent.prototype, "error", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", String)
], AcademicManagementSharedComponent.prototype, "selectedUrl", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Array)
], AcademicManagementSharedComponent.prototype, "countries", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Object)
], AcademicManagementSharedComponent.prototype, "selectedCountry", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Array)
], AcademicManagementSharedComponent.prototype, "states", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Object)
], AcademicManagementSharedComponent.prototype, "selectedState", void 0);
AcademicManagementSharedComponent = __decorate([
    core_1.Component({
        moduleId: module.id,
        selector: 'academic-shared',
        templateUrl: 'academic-management-shared.html'
    }),
    __metadata("design:paramtypes", [router_1.Router])
], AcademicManagementSharedComponent);
exports.AcademicManagementSharedComponent = AcademicManagementSharedComponent;
//# sourceMappingURL=academic-management-shared.component.js.map