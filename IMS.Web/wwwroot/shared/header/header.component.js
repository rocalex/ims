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
const sidenav_service_1 = require("../sidenav/sidenav.service");
const loader_service_1 = require("../loader-service");
const shared_service_1 = require("../shared.service");
const notification_service_1 = require("../notification.service");
let HeaderComponent = class HeaderComponent {
    constructor(renderer, sidenavService, loaderService, sharedService, notificationManagementService) {
        this.renderer = renderer;
        this.sidenavService = sidenavService;
        this.loaderService = loaderService;
        this.sharedService = sharedService;
        this.notificationManagementService = notificationManagementService;
        this.nav = [];
        this.toggleSidenav = new core_1.EventEmitter();
        this.languageChange = new core_1.EventEmitter();
        this.directionChange = new core_1.EventEmitter();
        this.userInfo = {};
        this.userName = '';
        this.allNotifications = [];
        this.languages = [
            { code: 'en', name: 'English' },
            { code: 'ar', name: 'Arabic', dir: 'rtl' }
        ];
        this.institutes = [];
        this.instituteChange = new core_1.EventEmitter();
        this.academicYears = [];
        this.academicYearChange = new core_1.EventEmitter();
        this.isSuperAdmin = false;
        this.selectLanguage(this.languages[0]);
    }
    ngOnInit() {
        this.loaderService.toggleLoader(true);
        this.sidenavService.getLoggedInUserDetail().then(res => {
            this.userInfo = res.json();
            if (this.userInfo.allNotifications) {
                this.allNotifications = this.userInfo.allNotifications;
            }
            this.unreadNotificationCount = this.allNotifications.filter(x => !x.isReadByUser).length;
            this.sharedService.setPermission(this.userInfo.permissions);
            this.sharedService.currentUserName.subscribe(x => this.userName = x);
            if (this.userName === null || this.userName === undefined || this.userName === '') {
                this.sharedService.setCurrentUserName(this.userInfo.user.name);
                this.userName = this.userInfo.user.name;
            }
            this.loaderService.toggleLoader(false);
        });
    }
    selectLanguage(language) {
        this.currentLanguage = language;
        this.languageChange.emit(language.code);
        this.directionChange.emit(language.dir);
    }
    onToggleSidenav() {
        this.toggleSidenav.emit();
    }
    toggleSubMenu(event) {
        let target = event.target.parentNode;
        const action = target.classList.contains('open') ? 'removeClass' : 'addClass';
        this.renderer[action](target, 'open');
    }
    selectInstitute(institute) {
        this.instituteChange.emit(institute);
    }
    selectAcademicYear(academicYear) {
        this.academicYearChange.emit(academicYear);
    }
    markNotificationAsRead(notificationId) {
        this.loaderService.toggleLoader(true);
        this.notificationManagementService.markNotificationAsRead(notificationId)
            .then(res => {
            this.ngOnInit();
            this.loaderService.toggleLoader(false);
        })
            .catch(err => {
            this.loaderService.toggleLoader(false);
        });
    }
    markAllNotificationAsRead() {
        this.loaderService.toggleLoader(true);
        this.notificationManagementService.markAllNotificationAsRead()
            .then(res => {
            this.ngOnInit();
            this.loaderService.toggleLoader(false);
        })
            .catch(err => {
            this.loaderService.toggleLoader(false);
        });
    }
};
__decorate([
    core_1.Input(),
    __metadata("design:type", Array)
], HeaderComponent.prototype, "nav", void 0);
__decorate([
    core_1.Output(),
    __metadata("design:type", core_1.EventEmitter)
], HeaderComponent.prototype, "toggleSidenav", void 0);
__decorate([
    core_1.Output(),
    __metadata("design:type", core_1.EventEmitter)
], HeaderComponent.prototype, "languageChange", void 0);
__decorate([
    core_1.Output(),
    __metadata("design:type", core_1.EventEmitter)
], HeaderComponent.prototype, "directionChange", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Array)
], HeaderComponent.prototype, "institutes", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Object)
], HeaderComponent.prototype, "currentInstitute", void 0);
__decorate([
    core_1.Output(),
    __metadata("design:type", core_1.EventEmitter)
], HeaderComponent.prototype, "instituteChange", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Array)
], HeaderComponent.prototype, "academicYears", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Object)
], HeaderComponent.prototype, "selectedAcademicYear", void 0);
__decorate([
    core_1.Output(),
    __metadata("design:type", core_1.EventEmitter)
], HeaderComponent.prototype, "academicYearChange", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Boolean)
], HeaderComponent.prototype, "isSuperAdmin", void 0);
HeaderComponent = __decorate([
    core_1.Component({
        selector: 'app-header',
        templateUrl: './header.component.html'
    }),
    __metadata("design:paramtypes", [core_1.Renderer2, sidenav_service_1.SidenavService, loader_service_1.LoaderService,
        shared_service_1.SharedService, notification_service_1.NotificationManagementService])
], HeaderComponent);
exports.HeaderComponent = HeaderComponent;
//# sourceMappingURL=header.component.js.map