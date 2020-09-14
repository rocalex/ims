"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const router_1 = require("@angular/router");
// Components
const institute_management_academic_year_list_component_1 = require("./institute-management-academic-year-list/institute-management-academic-year-list.component");
const institute_management_academic_year_add_component_1 = require("./institute-management-academic-year-add/institute-management-academic-year-add.component");
const institute_management_academic_year_edit_details_1 = require("./institute-management-academic-year-edit-details/institute-management-academic-year-edit-details");
const academicYearManagementRoutes = [
    {
        path: 'institute/academicyear',
        children: [
            { path: '', redirectTo: 'list', pathMatch: 'full' },
            { path: 'list', component: institute_management_academic_year_list_component_1.ListAcademicYearManagementComponent },
            { path: 'add', component: institute_management_academic_year_add_component_1.AddAcademicYearManagementComponent },
            { path: ':id', component: institute_management_academic_year_edit_details_1.EditDetailsAcademicYearManagementComponent }
        ]
    },
];
exports.AcademicYearManagementRouting = router_1.RouterModule.forRoot(academicYearManagementRoutes);
//# sourceMappingURL=institute-management-academic-year.routes.js.map