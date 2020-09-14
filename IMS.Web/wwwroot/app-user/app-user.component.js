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
const page_title_1 = require("../shared/page-title");
const core_2 = require("@ngx-translate/core");
const app_user_service_1 = require("./app-user.service");
const material_1 = require("@angular/material");
const shared_service_1 = require("../shared/shared.service");
let UserAppComponent = class UserAppComponent {
    constructor(router, loaderService, pageTitleService, translate, appService, dialog, sharedService) {
        this.router = router;
        this.loaderService = loaderService;
        this.pageTitleService = pageTitleService;
        this.translate = translate;
        this.appService = appService;
        this.dialog = dialog;
        this.sharedService = sharedService;
        this.isSidenavExpanded = false;
        this.isSidenavExpandedDesktop = true;
        this.direction = 'ltr';
        this.loader = false;
        this.nav = [
            { bindName: 'Sidenav.Label.Homework', icon: 'zmdi zmdi-book', url: '/homework', show: true },
            { bindName: 'Sidenav.Label.Disciplinary', icon: 'zmdi zmdi-book', url: '/disciplinary', show: false },
            { bindName: 'Sidenav.Label.LeaveManagement', icon: 'zmdi zmdi-book', url: '/leave', show: false },
            { bindName: 'Sidenav.Label.LeaveManagement', icon: 'zmdi zmdi-book', url: '/leavemanagement', show: false }
        ];
        this.institutes = [];
        this.selectedInstitute = {};
        this.academicYears = [];
        this.selectedAcademicYear = {};
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
                            if (name.name) {
                                this.pageTitleService.title = name.name;
                            }
                        }
                    }
                }
            }
        });
        this.getInstitutesForLoggedInUser();
        this.changeLabel();
        this.isLoggedInUserIsStaff();
    }
    isLoggedInUserIsStaff() {
        this.loaderService.toggleLoader(true);
        this.appService.isLoggedInUserIsStaff().then(res => {
            var response = res.json();
            this.nav[1].show = response.isStaff;
            this.nav[2].show = !response.isStaff;
            this.nav[3].show = response.isStaff;
            this.loaderService.toggleLoader(false);
        });
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
        setTimeout(() => {
            this.changeLabel();
        }, 0);
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
            var path = location.pathname.split('/');
            var managementName = path[1];
            if (this.nav.length) {
                var name = this.nav.find(x => x.url.includes(managementName));
                if (name) {
                    if (name.name) {
                        this.pageTitleService.title = name.name;
                    }
                }
            }
        });
    }
    getInstitutesForLoggedInUser() {
        this.loaderService.toggleLoader(true);
        this.appService.getInstitutesForLoggedInUser().then(res => {
            this.institutes = res.json();
            var anySelected = this.institutes.filter(x => x.isActive === true);
            if (!anySelected.length) {
                if (this.institutes.length === 1) {
                    this.selectedInstitute = this.institutes[0];
                    this.updateCurrentInstitute();
                }
                else {
                    this.openModal();
                }
            }
            else {
                this.selectedInstitute = anySelected[0];
                this.getAcademicYears();
            }
            this.loaderService.toggleLoader(false);
        });
    }
    updateCurrentInstitute() {
        this.loaderService.toggleLoader(true);
        this.selectedInstitute = this.institutes.find(x => x.instituteId === this.selectedInstitute.instituteId);
        this.appService.updateCurrentInstitute(this.selectedInstitute.instituteId).then(res => {
            var response = res.json();
            if (response.message !== 'User institute mapping updated successfully') {
                location.href = '/Home/LogOut';
            }
            this.getAcademicYears();
            location.reload();
            this.loaderService.toggleLoader(false);
        });
    }
    openModal() {
        this.dialog.open(this.template, { width: '250px', disableClose: true });
    }
    closeModal(dialogRef) {
        this.updateCurrentInstitute();
        dialogRef.close();
    }
    instituteChange(institute) {
        this.selectedInstitute = institute;
        this.updateCurrentInstitute();
    }
    getAcademicYears() {
        this.loaderService.toggleLoader(true);
        this.appService.getAcademicYears()
            .then(res => {
            this.academicYears = res.json();
            this.appService.getSelectedAcademicYear().then(resData => {
                var response = resData.json();
                let currentAcademicYear = {};
                if (response) {
                    this.sharedService.changeAcademicYear(response.academicYear);
                }
                this.sharedService.currentAcademicYear.subscribe(x => currentAcademicYear = x);
                if (currentAcademicYear === null || currentAcademicYear === undefined) {
                    this.selectedAcademicYear = this.academicYears.filter(x => x.isActive)[0];
                    this.sharedService.changeAcademicYear(this.selectedAcademicYear);
                }
                else {
                    this.selectedAcademicYear = currentAcademicYear;
                }
                this.addorUpdateSelectedAcademicYear(this.selectedAcademicYear.id);
                this.loaderService.toggleLoader(false);
            });
        })
            .catch(err => {
            this.loaderService.toggleLoader(false);
        });
    }
    academicYearChange(academicYear) {
        this.selectedAcademicYear = academicYear;
        this.addorUpdateSelectedAcademicYear(this.selectedAcademicYear.id);
        this.sharedService.changeAcademicYear(academicYear);
        location.reload();
    }
    addorUpdateSelectedAcademicYear(yearId) {
        this.loaderService.toggleLoader(true);
        this.appService.addorUpdateSelectedAcademicYear(yearId).then(res => {
            this.loaderService.toggleLoader(false);
        });
    }
};
__decorate([
    core_1.ViewChild(core_1.TemplateRef),
    __metadata("design:type", core_1.TemplateRef)
], UserAppComponent.prototype, "template", void 0);
__decorate([
    core_1.HostListener('window:resize', []),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], UserAppComponent.prototype, "onWindowResize", null);
UserAppComponent = __decorate([
    core_1.Component({
        selector: 'user-app-root',
        moduleId: module.id,
        templateUrl: 'app-user.html'
    }),
    __metadata("design:paramtypes", [router_1.Router, loader_service_1.LoaderService, page_title_1.PageTitleService,
        core_2.TranslateService, app_user_service_1.AppUserService, material_1.MatDialog,
        shared_service_1.SharedService])
], UserAppComponent);
exports.UserAppComponent = UserAppComponent;
//# sourceMappingURL=app-user.component.js.map