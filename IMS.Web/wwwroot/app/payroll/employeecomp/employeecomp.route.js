"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const router_1 = require("@angular/router");
const employeecomp_component_1 = require("./employeecomp.component");
const mapping_component_1 = require("./mapping/mapping.component");
const employeeRoutes = [
    {
        path: 'payroll/employeecomponents',
        children: [
            { path: '', component: employeecomp_component_1.EmployeeCompComponent },
            {
                path: 'mapping',
                children: [
                    { path: ':id', component: mapping_component_1.MappingComponent }
                ]
            }
        ]
    },
];
exports.EmployeeCompRouting = router_1.RouterModule.forRoot(employeeRoutes);
//# sourceMappingURL=employeecomp.route.js.map