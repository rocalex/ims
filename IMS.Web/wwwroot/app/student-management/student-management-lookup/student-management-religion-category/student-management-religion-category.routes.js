"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const router_1 = require("@angular/router");
const student_management_religion_category_list_component_1 = require("./student-management-religion-category-list/student-management-religion-category-list.component");
const student_management_religion_category_add_component_1 = require("./student-management-religion-category-add/student-management-religion-category-add.component");
const student_management_religion_category_edit_component_1 = require("./student-management-religion-category-edit-detail/student-management-religion-category-edit.component");
const religionCategoryManagementRoutes = [
    {
        path: 'student/lookup/religioncategory',
        children: [
            { path: '', redirectTo: 'list', pathMatch: 'full' },
            { path: 'list', component: student_management_religion_category_list_component_1.ListReligionCategoryManagementComponent },
            { path: 'add', component: student_management_religion_category_add_component_1.AddReligionCategoryManagementComponent },
            { path: ':id', component: student_management_religion_category_edit_component_1.EditAndDetailReligionCategoryManagementComponent }
        ]
    },
];
exports.ReligionCategoryManagementRouting = router_1.RouterModule.forRoot(religionCategoryManagementRoutes);
//# sourceMappingURL=student-management-religion-category.routes.js.map