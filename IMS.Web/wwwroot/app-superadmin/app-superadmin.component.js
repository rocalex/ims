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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@angular/core");
const router_1 = require("@angular/router");
const loader_service_1 = require("../shared/loader-service");
const core_2 = require("@ngx-translate/core");
const page_title_1 = require("../shared/page-title");
let SuperAdminAppComponent = class SuperAdminAppComponent {
    constructor(router, loaderService, translate, pageTitleService) {
        this.router = router;
        this.loaderService = loaderService;
        this.translate = translate;
        this.pageTitleService = pageTitleService;
        this.isSidenavExpanded = false;
        this.isSidenavExpandedDesktop = true;
        this.loader = false;
        this.direction = 'ltr';
        this.nav = [
            {
                bindName: 'Sidenav.Label.Institute',
                icon: 'zmdi zmdi-view-dashboard',
                url: '/institute',
                show: true
            },
            {
                bindName: 'Sidenav.Label.ResourceFile',
                icon: 'zmdi zmdi-view-dashboard',
                url: '/resourcefile',
                show: true
            }
        ];
        this.router.events.subscribe((event) => {
            this.onWindowResize();
        });
        translate.addLangs(['en', 'ar']);
        translate.setDefaultLang('en');
    }
    ngOnInit() {
        this.loaderService.loader.subscribe(res => {
            setTimeout(() => {
                this.loader = res;
            }, 0);
        });
        this.router.events.subscribe((val) => {
            if (val instanceof router_1.NavigationEnd) {
                var url = val.url.split('/');
                if (url.length >= 2) {
                    var managementName = url[1];
                    if (this.nav.length) {
                        var name = this.nav.find(x => x.url.includes(managementName));
                        if (name) {
                            this.pageTitleService.title = name.name;
                        }
                    }
                }
            }
        });
        this.changeLabel();
    }
    onWindowResize() {
        if (window.innerWidth < 768) {
            this.isSidenavExpanded = false;
        }
        else {
            this.isSidenavExpanded = this.isSidenavExpandedDesktop;
        }
    }
    toggleSidenav(value) {
        if (value != null && value != undefined) {
            this.isSidenavExpanded = value;
        }
        else {
            this.isSidenavExpanded = !this.isSidenavExpanded;
        }
        if (window.innerWidth > 767) {
            this.isSidenavExpandedDesktop = this.isSidenavExpanded;
        }
    }
    languageChange(event) {
        this.translate.use(event);
        this.changeLabel();
    }
    directionChange(value) {
        this.direction = value;
    }
    changeLabel() {
        return __awaiter(this, void 0, void 0, function* () {
            for (var i = 0; i < this.nav.length; i++) {
                var value = yield this.translate.get(this.nav[i].bindName).toPromise();
                this.nav[i].name = value;
                if (this.nav[i].children) {
                    for (var j = 0; j < this.nav[i].children.length; j++) {
                        var childValue = yield this.translate.get(this.nav[i].children[j].bindName).toPromise();
                        this.nav[i].children[j].name = childValue;
                    }
                }
            }
        });
    }
};
__decorate([
    core_1.HostListener('window:resize', []),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], SuperAdminAppComponent.prototype, "onWindowResize", null);
SuperAdminAppComponent = __decorate([
    core_1.Component({
        selector: 'superadmin-app-root',
        moduleId: module.id,
        templateUrl: 'app-superadmin.html'
    }),
    __metadata("design:paramtypes", [router_1.Router, loader_service_1.LoaderService, core_2.TranslateService,
        page_title_1.PageTitleService])
], SuperAdminAppComponent);
exports.SuperAdminAppComponent = SuperAdminAppComponent;
//# sourceMappingURL=app-superadmin.component.js.map