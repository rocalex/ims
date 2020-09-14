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
const student_management_relationship_component_1 = require("./student-management-relationship.component");
const student_management_relationship_list_component_1 = require("./student-management-relationship-list/student-management-relationship-list.component");
const student_management_relationship_add_component_1 = require("./student-management-relationship-add/student-management-relationship-add.component");
const student_management_relationship_edit_detail_component_1 = require("./student-management-relationship-edit-detail/student-management-relationship-edit-detail.component");
const student_management_relationship_service_1 = require("./student-management-relationship.service");
let RelationshipManagementModule = class RelationshipManagementModule {
};
RelationshipManagementModule = __decorate([
    core_1.NgModule({
        imports: [
            shared_module_1.SharedModule,
        ],
        declarations: [
            student_management_relationship_component_1.RelationshipManagementComponent,
            student_management_relationship_list_component_1.ListRelationshipManagementComponent,
            student_management_relationship_add_component_1.AddRelationshipManagementComponent,
            student_management_relationship_edit_detail_component_1.EditAndDetailRelationshipManagementComponent
        ],
        providers: [
            student_management_relationship_service_1.RelationshipManagementService
        ],
    })
], RelationshipManagementModule);
exports.RelationshipManagementModule = RelationshipManagementModule;
//# sourceMappingURL=student-management-relationship.module.js.map