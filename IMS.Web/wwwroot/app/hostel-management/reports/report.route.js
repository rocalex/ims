"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const router_1 = require("@angular/router");
const report_component_1 = require("./report.component");
const allocate_component_1 = require("./allocate/allocate.component");
const messmanage_component_1 = require("./messmanage/messmanage.component");
const routes = [
    {
        path: 'hostel/reports', component: report_component_1.ReportComponent,
        children: [
            {
                path: 'allocate', component: allocate_component_1.AllocateComponent
            },
            {
                path: 'messmanage', component: messmanage_component_1.MessManageComponent
            }
        ]
    }
];
exports.ReportRouting = router_1.RouterModule.forRoot(routes);
//# sourceMappingURL=report.route.js.map