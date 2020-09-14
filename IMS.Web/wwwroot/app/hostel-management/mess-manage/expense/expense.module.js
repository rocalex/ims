"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@angular/core");
const shared_module_1 = require("../../../../shared/shared.module");
const expense_route_1 = require("./expense.route");
const expense_component_1 = require("./expense.component");
const list_component_1 = require("./list/list.component");
const add_component_1 = require("./add/add.component");
const expense_service_1 = require("./expense.service");
const edit_component_1 = require("./edit/edit.component");
let ExpenseTypeModule = class ExpenseTypeModule {
};
ExpenseTypeModule = __decorate([
    core_1.NgModule({
        imports: [
            shared_module_1.SharedModule,
            expense_route_1.ExpenseRouting
        ],
        declarations: [
            expense_component_1.ExpenseComponent,
            list_component_1.ListComponent,
            add_component_1.AddComponent,
            edit_component_1.EditComponent
        ],
        providers: [
            core_1.forwardRef(() => expense_service_1.ExpenseService)
        ]
    })
], ExpenseTypeModule);
exports.ExpenseTypeModule = ExpenseTypeModule;
//# sourceMappingURL=expense.module.js.map