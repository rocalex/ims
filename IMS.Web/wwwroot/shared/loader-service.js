"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@angular/core");
const rxjs_1 = require("rxjs");
let LoaderService = class LoaderService {
    constructor() {
        this.loader = new rxjs_1.Subject();
        this.loaderList = [];
    }
    toggleLoader(toggleSetting) {
        if (toggleSetting) {
            this.loaderList.push('');
        }
        else {
            this.loaderList.pop();
        }
        if (this.loaderList.length === 0) {
            this.loader.next(false);
        }
        else {
            this.loader.next(true);
        }
    }
};
LoaderService = __decorate([
    core_1.Injectable()
], LoaderService);
exports.LoaderService = LoaderService;
//# sourceMappingURL=loader-service.js.map