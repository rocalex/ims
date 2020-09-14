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
const taxtype_component_1 = require("./taxtype.component");
const taxtype_route_1 = require("./taxtype.route");
const add_component_1 = require("./add/add.component");
const edit_component_1 = require("./edit/edit.component");
const list_component_1 = require("./list/list.component");
const taxtype_service_1 = require("./taxtype.service");
let TaxTypeModule = class TaxTypeModule {
};
TaxTypeModule = __decorate([
    core_1.NgModule({
        imports: [
            shared_module_1.SharedModule,
            taxtype_route_1.TaxTypeRouting,
        ],
        declarations: [
            taxtype_component_1.TaxTypeComponent,
            add_component_1.AddComponent,
            edit_component_1.EditComponent,
            list_component_1.ListComponent
        ],
        providers: [
            core_1.forwardRef(() => taxtype_service_1.TaxTypeService)
        ]
    })
], TaxTypeModule);
exports.TaxTypeModule = TaxTypeModule;
//# sourceMappingURL=taxtype.module.js.map