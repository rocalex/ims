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
const employeecomp_component_1 = require("./employeecomp.component");
const employeecomp_route_1 = require("./employeecomp.route");
const mapping_module_1 = require("./mapping/mapping.module");
let EmployeeCompModule = class EmployeeCompModule {
};
EmployeeCompModule = __decorate([
    core_1.NgModule({
        imports: [
            shared_module_1.SharedModule,
            employeecomp_route_1.EmployeeCompRouting,
            mapping_module_1.MappingModule
        ],
        declarations: [
            employeecomp_component_1.EmployeeCompComponent,
        ],
        providers: []
    })
], EmployeeCompModule);
exports.EmployeeCompModule = EmployeeCompModule;
//# sourceMappingURL=employeecomp.module.js.map