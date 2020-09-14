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
const student_management_level_component_1 = require("./student-management-level.component");
const student_management_level_list_component_1 = require("./student-management-level-list/student-management-level-list.component");
const student_management_level_add_component_1 = require("./student-management-level-add/student-management-level-add.component");
const student_management_level_edit_detail_component_1 = require("./student-management-level-edit-detail/student-management-level-edit-detail.component");
const student_management_level_service_1 = require("./student-management-level.service");
let LevelManagementModule = class LevelManagementModule {
};
LevelManagementModule = __decorate([
    core_1.NgModule({
        imports: [
            shared_module_1.SharedModule,
        ],
        declarations: [
            student_management_level_component_1.LevelManagementComponent,
            student_management_level_list_component_1.ListLevelManagementComponent,
            student_management_level_add_component_1.AddLevelManagementComponent,
            student_management_level_edit_detail_component_1.EditAndDetailLevelManagementComponent
        ],
        providers: [
            student_management_level_service_1.LevelManagementService
        ],
    })
], LevelManagementModule);
exports.LevelManagementModule = LevelManagementModule;
//# sourceMappingURL=student-management-level.module.js.map