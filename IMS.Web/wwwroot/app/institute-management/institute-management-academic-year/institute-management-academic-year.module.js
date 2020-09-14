"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@angular/core");
const shared_module_1 = require("../../../shared/shared.module");
// Components
const institute_management_academic_year_component_1 = require("./institute-management-academic-year.component");
const institute_management_academic_year_list_component_1 = require("./institute-management-academic-year-list/institute-management-academic-year-list.component");
const institute_management_academic_year_add_component_1 = require("./institute-management-academic-year-add/institute-management-academic-year-add.component");
const institute_management_academic_year_edit_details_1 = require("./institute-management-academic-year-edit-details/institute-management-academic-year-edit-details");
// Services
const institute_management_academic_year_service_1 = require("./institute-management-academic-year.service");
let AcademicYearManagementModule = class AcademicYearManagementModule {
};
AcademicYearManagementModule = __decorate([
    core_1.NgModule({
        imports: [
            shared_module_1.SharedModule,
        ],
        declarations: [
            institute_management_academic_year_component_1.AcademicYearManagementComponent,
            institute_management_academic_year_list_component_1.ListAcademicYearManagementComponent,
            institute_management_academic_year_add_component_1.AddAcademicYearManagementComponent,
            institute_management_academic_year_edit_details_1.EditDetailsAcademicYearManagementComponent
        ],
        providers: [
            institute_management_academic_year_service_1.AcademicYearManagementService
        ],
    })
], AcademicYearManagementModule);
exports.AcademicYearManagementModule = AcademicYearManagementModule;
//# sourceMappingURL=institute-management-academic-year.module.js.map