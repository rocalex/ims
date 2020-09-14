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
const student_management_promotion_routes_1 = require("./student-management-promotion.routes");
const student_management_promotion_component_1 = require("./student-management-promotion.component");
const student_management_promotion_list_component_1 = require("./student-management-promotion-list/student-management-promotion-list.component");
const student_management_promotion_add_component_1 = require("./student-management-promotion-add/student-management-promotion-add.component");
const student_management_promotion_edit_detail_component_1 = require("./student-management-promotion-edit-detail/student-management-promotion-edit-detail.component");
const student_management_promotion_service_1 = require("./student-management-promotion.service");
let StudentPromotionManagementModule = class StudentPromotionManagementModule {
};
StudentPromotionManagementModule = __decorate([
    core_1.NgModule({
        imports: [
            shared_module_1.SharedModule,
            student_management_promotion_routes_1.StudentPromotionManagementRouting
        ],
        declarations: [
            student_management_promotion_component_1.StudentPromotionManagementComponent,
            student_management_promotion_list_component_1.ListStudentPromotionManagementComponent,
            student_management_promotion_add_component_1.AddStudentPromotionManagementComponent,
            student_management_promotion_edit_detail_component_1.EditAndDetailStudentPromotionManagementComponent
        ],
        providers: [
            student_management_promotion_service_1.StudentPromotionManagementService
        ],
    })
], StudentPromotionManagementModule);
exports.StudentPromotionManagementModule = StudentPromotionManagementModule;
//# sourceMappingURL=student-management-promotion.module.js.map