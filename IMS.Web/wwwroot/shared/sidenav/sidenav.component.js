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
const sidenav_service_1 = require("./sidenav.service");
const loader_service_1 = require("../loader-service");
let SidenavComponent = class SidenavComponent {
    constructor(renderer, sidenavService, loaderService) {
        this.renderer = renderer;
        this.sidenavService = sidenavService;
        this.loaderService = loaderService;
        this.userInfo = {};
        this.nav = [];
    }
    toggleSubMenu(event) {
        let target = event.target.parentNode;
        const action = target.classList.contains('open') ? 'removeClass' : 'addClass';
        this.renderer[action](target, 'open');
    }
    ngOnInit() {
        //this.loaderService.toggleLoader(true);
        //this.sidenavService.getLoggedInUserDetail().then(res => {
        //  this.userInfo = res.json();
        //  this.loaderService.toggleLoader(false);
        //})
    }
};
__decorate([
    core_1.Input(),
    __metadata("design:type", Array)
], SidenavComponent.prototype, "nav", void 0);
SidenavComponent = __decorate([
    core_1.Component({
        selector: 'app-sidenav',
        templateUrl: './sidenav.component.html'
    }),
    __metadata("design:paramtypes", [core_1.Renderer2, sidenav_service_1.SidenavService, loader_service_1.LoaderService])
], SidenavComponent);
exports.SidenavComponent = SidenavComponent;
//# sourceMappingURL=sidenav.component.js.map