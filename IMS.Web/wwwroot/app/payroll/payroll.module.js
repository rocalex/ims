"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@angular/core");
const shared_module_1 = require("../../shared/shared.module");
const payroll_component_1 = require("./payroll.component");
const payroll_route_1 = require("./payroll.route");
const componentgroup_module_1 = require("./componentgroup/componentgroup.module");
const component_module_1 = require("./component/component.module");
const timesheets_module_1 = require("./timesheets/timesheets.module");
const generate_module_1 = require("./generate/generate.module");
const payslip_module_1 = require("./payslip/payslip.module");
const employeecomp_module_1 = require("./employeecomp/employeecomp.module");
let PayrollModule = class PayrollModule {
};
PayrollModule = __decorate([
    core_1.NgModule({
        imports: [
            shared_module_1.SharedModule,
            payroll_route_1.PayrollRouting,
            componentgroup_module_1.ComponentGroupModule,
            component_module_1.ComponentModule,
            timesheets_module_1.TimesheetsModule,
            generate_module_1.GenerateModule,
            payslip_module_1.PayslipModule,
            employeecomp_module_1.EmployeeCompModule
        ],
        declarations: [
            payroll_component_1.PayrollComponent,
        ],
        providers: []
    })
], PayrollModule);
exports.PayrollModule = PayrollModule;
//# sourceMappingURL=payroll.module.js.map