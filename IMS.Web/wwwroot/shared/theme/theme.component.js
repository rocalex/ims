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
let ThemeComponent = class ThemeComponent {
    constructor(renderer) {
        this.renderer = renderer;
        this.themes = [{ id: 1, name: 'primary' },
            { id: 2, name: 'secondary' },
            { id: 3, name: 'warning' },
            { id: 4, name: 'info' },
            { id: 5, name: 'danger' },
            { id: 6, name: 'success' }];
        this.activeTheme = this.themes[0];
        this.enableSidebarBackgroundImage = true;
        this.sidebarBackgroundImages = [
            'assets/img/sidebar-1.jpg',
            'assets/img/sidebar-2.jpg',
            'assets/img/sidebar-3.jpg',
            'assets/img/sidebar-4.jpg'
        ];
        this.miniSidebar = false;
        this.darkMode = false;
        this.boxLayout = false;
        this.rtlLayout = false;
        this.navCollapsed = false;
        this.isDarkSidenav = true;
        this.isTopNav = true;
        this.selectedSidebarImage = this.sidebarBackgroundImages[3];
        this.toggleNavbar();
    }
    set direction(value) {
        this.rtlLayout = value === 'rtl' ? true : false;
        this.rtlLayoutHanlder();
    }
    toggleNavbar() {
        this.renderer[this.isTopNav ? 'addClass' : 'removeClass'](document.body, 'navbar-top');
        this.renderer[this.isTopNav ? 'removeClass' : 'addClass'](document.body, 'navbar-side');
    }
    setSidebarBgImage(sidebarImage) {
        this.selectedSidebarImage = sidebarImage;
        this.setSidebarImage();
    }
    toggleDarkSidebar() {
        this.renderer[this.isDarkSidenav ? 'addClass' : 'removeClass'](document.querySelector('.rct-sidebar'), 'sidebar-overlay-dark');
        this.renderer[this.isDarkSidenav ? 'removeClass' : 'addClass'](document.querySelector('.rct-sidebar'), 'sidebar-overlay-light');
    }
    toggleSidebarImage() {
        this.setSidebarImage();
    }
    setSidebarImage() {
        let bg = this.enableSidebarBackgroundImage ? `url(${this.selectedSidebarImage})` : 'none';
        this.renderer.setStyle(document.querySelector('.rct-sidebar'), 'background-image', bg);
    }
    miniSidebarHanlder() {
        this.renderer[this.miniSidebar ? 'addClass' : 'removeClass'](document.body, 'mini-sidebar');
    }
    darkModeHanlder() {
        this.renderer[this.darkMode ? 'addClass' : 'removeClass'](document.body, 'dark-mode');
    }
    boxLayoutHanlder() {
        this.renderer[this.boxLayout ? 'addClass' : 'removeClass'](document.body, 'boxed-layout');
    }
    rtlLayoutHanlder() {
        let direction = this.rtlLayout ? 'rtl' : 'ltr';
        this.renderer[this.rtlLayout ? 'addClass' : 'removeClass'](document.body, 'rtl');
        this.renderer[this.rtlLayout ? 'removeClass' : 'addClass'](document.body, 'ltr');
        this.renderer.setAttribute(document.body, 'dir', direction);
    }
    changeThemeColor(theme) {
        for (const appTheme of this.themes) {
            if (document.body.classList.contains('theme-' + appTheme.name)) {
                this.renderer.removeClass(document.body, 'theme-' + appTheme.name);
            }
        }
        this.renderer.addClass(document.body, 'theme-' + theme.name);
        this.darkMode = false;
        this.darkModeHanlder();
    }
};
__decorate([
    core_1.Input(),
    __metadata("design:type", String),
    __metadata("design:paramtypes", [String])
], ThemeComponent.prototype, "direction", null);
ThemeComponent = __decorate([
    core_1.Component({
        selector: 'app-theme',
        templateUrl: './theme.component.html'
    }),
    __metadata("design:paramtypes", [core_1.Renderer2])
], ThemeComponent);
exports.ThemeComponent = ThemeComponent;
//# sourceMappingURL=theme.component.js.map