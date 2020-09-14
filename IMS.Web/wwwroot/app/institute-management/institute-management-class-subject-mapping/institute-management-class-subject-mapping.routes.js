"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const router_1 = require("@angular/router");
const institute_management_class_subject_mapping_list_component_1 = require("./institute-management-class-subject-mapping-list/institute-management-class-subject-mapping-list.component");
const classSubjectMappingManagementRoutes = [
    {
        path: 'institute/classsubject',
        children: [
            { path: '', redirectTo: 'list', pathMatch: 'full' },
            { path: 'list', component: institute_management_class_subject_mapping_list_component_1.ListClassSubjectMappingManagementComponent }
        ]
    },
];
exports.ClassSubjectMappingManagementRouting = router_1.RouterModule.forRoot(classSubjectMappingManagementRoutes);
//# sourceMappingURL=institute-management-class-subject-mapping.routes.js.map