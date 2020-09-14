"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const router_1 = require("@angular/router");
const institute_management_class_list_component_1 = require("./institute-management-class-list/institute-management-class-list.component");
const institute_management_class_add_component_1 = require("./institute-management-class-add/institute-management-class-add.component");
const institute_management_class_edit_details_1 = require("./institute-management-class-edit-details/institute-management-class-edit-details");
const classManagementRoutes = [
    {
        path: 'institute/class',
        children: [
            { path: '', redirectTo: 'list', pathMatch: 'full' },
            { path: 'list', component: institute_management_class_list_component_1.ListClassManagementComponent },
            { path: 'add', component: institute_management_class_add_component_1.AddClassManagementComponent },
            { path: ':id', component: institute_management_class_edit_details_1.EditDetailsClassManagementComponent }
        ]
    },
];
exports.ClassManagementRouting = router_1.RouterModule.forRoot(classManagementRoutes);
//# sourceMappingURL=institute-management-class.routes.js.map