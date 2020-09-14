"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const router_1 = require("@angular/router");
const student_management_fee_component_list_component_1 = require("./student-management-fee-component-list/student-management-fee-component-list.component");
const student_management_fee_component_add_component_1 = require("./student-management-fee-component-add/student-management-fee-component-add.component");
const student_management_fee_component_edit_details_component_1 = require("./student-management-fee-component-edit-details/student-management-fee-component-edit-details.component");
const FeeComponentManagementRoutes = [
    {
        path: 'student/feemanagement/component',
        children: [
            { path: '', redirectTo: 'list', pathMatch: 'full' },
            { path: 'list', component: student_management_fee_component_list_component_1.ListFeeComponentManagementComponent },
            { path: 'add', component: student_management_fee_component_add_component_1.AddFeeComponentManagementComponent },
            { path: ':id', component: student_management_fee_component_edit_details_component_1.EditDetailsFeeComponentManagementComponent }
        ]
    },
];
exports.FeeComponentManagementRouting = router_1.RouterModule.forRoot(FeeComponentManagementRoutes);
//# sourceMappingURL=student-management-fee-component.routes.js.map