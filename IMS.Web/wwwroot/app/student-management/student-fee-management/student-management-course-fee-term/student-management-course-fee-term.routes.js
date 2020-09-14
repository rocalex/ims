"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const router_1 = require("@angular/router");
const student_management_course_fee_term_component_1 = require("./student-management-course-fee-term.component");
const student_management_course_fee_term_details_component_1 = require("./student-management-course-fee-term-details/student-management-course-fee-term-details.component");
const CourseFeeTermManagementRoutes = [
    {
        path: 'student/feemanagement/coursefeeterms',
        children: [
            { path: '', component: student_management_course_fee_term_component_1.CourseFeeTermManagementComponent },
            { path: ':classId', component: student_management_course_fee_term_details_component_1.CourseFeeTermDetailsManagementComponent }
        ]
    },
];
exports.CourseFeeTermManagementRouting = router_1.RouterModule.forRoot(CourseFeeTermManagementRoutes);
//# sourceMappingURL=student-management-course-fee-term.routes.js.map