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
const mapping_component_1 = require("./mapping.component");
const mapping_service_1 = require("./mapping.service");
const mapping_component_2 = require("./mapping.component");
let MappingModule = class MappingModule {
};
MappingModule = __decorate([
    core_1.NgModule({
        imports: [
            shared_module_1.SharedModule,
        ],
        declarations: [
            mapping_component_1.MappingComponent,
            mapping_component_2.DialogOverviewExampleDialog,
            mapping_component_2.EditDialog
        ],
        providers: [
            core_1.forwardRef(() => mapping_service_1.MappingService)
        ],
        entryComponents: [
            mapping_component_2.DialogOverviewExampleDialog,
            mapping_component_2.EditDialog
        ]
    })
], MappingModule);
exports.MappingModule = MappingModule;
//# sourceMappingURL=mapping.module.js.map