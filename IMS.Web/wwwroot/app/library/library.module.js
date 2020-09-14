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
const library_component_1 = require("./library.component");
const library_route_1 = require("./library.route");
const dashboard_module_1 = require("./dashboard/dashboard.module");
const booktype_module_1 = require("./booktype/booktype.module");
const books_module_1 = require("./books/books.module");
const exampaper_module_1 = require("./exampaper/exampaper.module");
const issuebook_module_1 = require("./issuebook/issuebook.module");
const return_module_1 = require("./return/return.module");
const reports_module_1 = require("./reports/reports.module");
let LibraryModule = class LibraryModule {
};
LibraryModule = __decorate([
    core_1.NgModule({
        imports: [
            shared_module_1.SharedModule,
            library_route_1.LibraryRouting,
            dashboard_module_1.DashboardModule,
            booktype_module_1.BooktypeModule,
            books_module_1.BooksModule,
            exampaper_module_1.ExampaperModule,
            issuebook_module_1.IssuebookModule,
            return_module_1.ReturnModule,
            reports_module_1.ReportsModule
        ],
        declarations: [
            library_component_1.LibraryComponent,
        ],
        providers: []
    })
], LibraryModule);
exports.LibraryModule = LibraryModule;
//# sourceMappingURL=library.module.js.map