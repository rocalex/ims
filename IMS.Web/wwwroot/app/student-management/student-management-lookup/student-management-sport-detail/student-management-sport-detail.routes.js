"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const router_1 = require("@angular/router");
const student_management_sport_detail_list_component_1 = require("./student-management-sport-detail-list/student-management-sport-detail-list.component");
const student_management_sport_detail_add_component_1 = require("./student-management-sport-detail-add/student-management-sport-detail-add.component");
const student_management_sport_detail_edit_detail_component_1 = require("./student-management-sport-detail-edit-detail/student-management-sport-detail-edit-detail.component");
const sportDetailManagementRoutes = [
    {
        path: 'student/lookup/sportdetail',
        children: [
            { path: '', redirectTo: 'list', pathMatch: 'full' },
            { path: 'list', component: student_management_sport_detail_list_component_1.ListSportDetailManagementComponent },
            { path: 'add', component: student_management_sport_detail_add_component_1.AddSportDetailManagementComponent },
            { path: ':id', component: student_management_sport_detail_edit_detail_component_1.EditAndDetailSportDetailManagementComponent }
        ]
    },
];
exports.SportDetailManagementRouting = router_1.RouterModule.forRoot(sportDetailManagementRoutes);
//# sourceMappingURL=student-management-sport-detail.routes.js.map