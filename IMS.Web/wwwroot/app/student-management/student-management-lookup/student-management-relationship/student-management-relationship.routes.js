"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const router_1 = require("@angular/router");
const student_management_relationship_list_component_1 = require("./student-management-relationship-list/student-management-relationship-list.component");
const student_management_relationship_add_component_1 = require("./student-management-relationship-add/student-management-relationship-add.component");
const student_management_relationship_edit_detail_component_1 = require("./student-management-relationship-edit-detail/student-management-relationship-edit-detail.component");
const relationshipManagementRoutes = [
    {
        path: 'student/lookup/relationship',
        children: [
            { path: '', redirectTo: 'list', pathMatch: 'full' },
            { path: 'list', component: student_management_relationship_list_component_1.ListRelationshipManagementComponent },
            { path: 'add', component: student_management_relationship_add_component_1.AddRelationshipManagementComponent },
            { path: ':id', component: student_management_relationship_edit_detail_component_1.EditAndDetailRelationshipManagementComponent }
        ]
    },
];
exports.RelationshipManagementRouting = router_1.RouterModule.forRoot(relationshipManagementRoutes);
//# sourceMappingURL=student-management-relationship.routes.js.map