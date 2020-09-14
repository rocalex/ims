"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@angular/core");
const platform_browser_1 = require("@angular/platform-browser");
let PageTitleService = class PageTitleService {
    constructor(bodyTitle) {
        this.bodyTitle = bodyTitle;
        this._title = '';
    }
    get title() { return this._title; }
    set title(title) {
        this._title = title;
        if (title !== '') {
            title = `${title} | `;
        }
        this.bodyTitle.setTitle(`${title}IMS`);
    }
};
PageTitleService = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [platform_browser_1.Title])
], PageTitleService);
exports.PageTitleService = PageTitleService;
//# sourceMappingURL=page-title.js.map