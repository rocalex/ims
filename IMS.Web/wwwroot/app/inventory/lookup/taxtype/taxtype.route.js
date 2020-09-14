"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const router_1 = require("@angular/router");
const list_component_1 = require("./list/list.component");
const add_component_1 = require("./add/add.component");
const edit_component_1 = require("./edit/edit.component");
const permissions_route_guard_1 = require("../../../../shared/permissions-route.guard");
const sidenav_model_1 = require("../../../../shared/sidenav/sidenav.model");
const taxtype_component_1 = require("./taxtype.component");
const routes = [
    {
        path: 'inventory/lookup/taxtype', component: taxtype_component_1.TaxTypeComponent,
        children: [
            {
                path: '',
                component: list_component_1.ListComponent,
                canActivate: [permissions_route_guard_1.PermissionAuthGuard],
                data: { parent: sidenav_model_1.UserGroupFeatureParentEnum.Student, child: sidenav_model_1.UserGroupFeatureChildEnum.StudentDashboard, type: 'View' }
            },
            {
                path: 'add',
                component: add_component_1.AddComponent,
                canActivate: [permissions_route_guard_1.PermissionAuthGuard],
                data: { parent: sidenav_model_1.UserGroupFeatureParentEnum.Student, child: sidenav_model_1.UserGroupFeatureChildEnum.StudentDashboard, type: 'View' }
            },
            {
                path: ':id',
                component: edit_component_1.EditComponent,
                canActivate: [permissions_route_guard_1.PermissionAuthGuard],
                data: { parent: sidenav_model_1.UserGroupFeatureParentEnum.Student, child: sidenav_model_1.UserGroupFeatureChildEnum.StudentDashboard, type: 'View' }
            }
        ]
    },
];
exports.TaxTypeRouting = router_1.RouterModule.forRoot(routes);
//# sourceMappingURL=taxtype.route.js.map