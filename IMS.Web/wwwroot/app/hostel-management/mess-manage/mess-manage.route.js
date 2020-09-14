"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const router_1 = require("@angular/router");
const mess_manage_component_1 = require("./mess-manage.component");
const messmanage_component_1 = require("./messmanage/messmanage.component");
const daily_component_1 = require("./daily/daily.component");
const expenditure_component_1 = require("./expenditure/expenditure.component");
const list_component_1 = require("./expense/list/list.component");
const edit_component_1 = require("./expense/edit/edit.component");
const add_component_1 = require("./expense/add/add.component");
const routes = [
    {
        path: 'hostel/messmanagement', component: mess_manage_component_1.MessManageComponent,
        children: [
            {
                path: 'messmanage', component: messmanage_component_1.MessmanageComponent
            },
            {
                path: 'expensetype',
                children: [{
                        path: '', component: list_component_1.ListComponent
                    }, {
                        path: 'add', component: add_component_1.AddComponent
                    }, {
                        path: ':id', component: edit_component_1.EditComponent
                    }]
            },
            {
                path: 'daily', component: daily_component_1.DailyComponent
            },
            {
                path: 'expenditure', component: expenditure_component_1.ExpenditureComponent
            }
        ]
    }
];
exports.MessManageRouting = router_1.RouterModule.forRoot(routes);
//# sourceMappingURL=mess-manage.route.js.map