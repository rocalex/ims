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
const student_management_slab_component_1 = require("./student-management-slab.component");
const student_management_slab_list_component_1 = require("./student-management-slab-list/student-management-slab-list.component");
const student_management_slab_add_component_1 = require("./student-management-slab-add/student-management-slab-add.component");
const student_management_slab_edit_detail_component_1 = require("./student-management-slab-edit-detail/student-management-slab-edit-detail.component");
const student_management_slab_service_1 = require("./student-management-slab.service");
let SlabManagementModule = class SlabManagementModule {
};
SlabManagementModule = __decorate([
    core_1.NgModule({
        imports: [
            shared_module_1.SharedModule
        ],
        declarations: [
            student_management_slab_component_1.SlabManagementComponent,
            student_management_slab_list_component_1.ListSlabManagementComponent,
            student_management_slab_add_component_1.AddSlabManagementComponent,
            student_management_slab_edit_detail_component_1.EditAndDetailSlabManagementComponent
        ],
        providers: [
            student_management_slab_service_1.SlabManagementService
        ],
    })
], SlabManagementModule);
exports.SlabManagementModule = SlabManagementModule;
//# sourceMappingURL=student-management-slab.module.js.map