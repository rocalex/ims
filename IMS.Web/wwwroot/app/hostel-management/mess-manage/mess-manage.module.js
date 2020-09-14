"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@angular/core");
const shared_module_1 = require("../../../shared/shared.module");
const mess_manage_route_1 = require("./mess-manage.route");
const mess_manage_component_1 = require("./mess-manage.component");
const messmanage_module_1 = require("./messmanage/messmanage.module");
const daily_module_1 = require("./daily/daily.module");
const expenditure_module_1 = require("./expenditure/expenditure.module");
const expense_module_1 = require("./expense/expense.module");
let MessManageModule = class MessManageModule {
};
MessManageModule = __decorate([
    core_1.NgModule({
        imports: [
            shared_module_1.SharedModule,
            mess_manage_route_1.MessManageRouting,
            messmanage_module_1.MessmanageModule,
            daily_module_1.DailyModule,
            expenditure_module_1.ExpenditureModule,
            expense_module_1.ExpenseTypeModule
        ],
        declarations: [
            mess_manage_component_1.MessManageComponent,
        ],
        providers: [],
    })
], MessManageModule);
exports.MessManageModule = MessManageModule;
//# sourceMappingURL=mess-manage.module.js.map