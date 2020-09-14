"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@angular/core");
const shared_module_1 = require("../../../../shared/shared.module");
const student_management_religion_category_component_1 = require("./student-management-religion-category.component");
const student_management_religion_category_list_component_1 = require("./student-management-religion-category-list/student-management-religion-category-list.component");
const student_management_religion_category_add_component_1 = require("./student-management-religion-category-add/student-management-religion-category-add.component");
const student_management_religion_category_edit_component_1 = require("./student-management-religion-category-edit-detail/student-management-religion-category-edit.component");
const student_management_religion_category_service_1 = require("./student-management-religion-category.service");
let ReligionCategoryManagementModule = class ReligionCategoryManagementModule {
};
ReligionCategoryManagementModule = __decorate([
    core_1.NgModule({
        imports: [
            shared_module_1.SharedModule,
        ],
        declarations: [
            student_management_religion_category_component_1.ReligionCategoryManagementComponent,
            student_management_religion_category_list_component_1.ListReligionCategoryManagementComponent,
            student_management_religion_category_add_component_1.AddReligionCategoryManagementComponent,
            student_management_religion_category_edit_component_1.EditAndDetailReligionCategoryManagementComponent
        ],
        providers: [
            student_management_religion_category_service_1.ReligionCategoryManagementService
        ],
    })
], ReligionCategoryManagementModule);
exports.ReligionCategoryManagementModule = ReligionCategoryManagementModule;
//# sourceMappingURL=student-management-religion-category.module.js.map