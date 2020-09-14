import { Component, Input, Renderer2 } from '@angular/core';

@Component({
  selector: 'app-theme',
  templateUrl: './theme.component.html'
})
export class ThemeComponent {

  @Input() set direction(value: string) {
    this.rtlLayout = value === 'rtl' ? true : false;
    this.rtlLayoutHanlder();
  }

  constructor(private renderer: Renderer2) {
    this.toggleNavbar();
  }

  themes = [{ id: 1, name: 'primary' },
  { id: 2, name: 'secondary' },
  { id: 3, name: 'warning' },
  { id: 4, name: 'info' },
  { id: 5, name: 'danger' },
  { id: 6, name: 'success' }];

  activeTheme = this.themes[0];
  enableSidebarBackgroundImage: boolean = true;
  sidebarBackgroundImages = [
    'assets/img/sidebar-1.jpg',
    'assets/img/sidebar-2.jpg',
    'assets/img/sidebar-3.jpg',
    'assets/img/sidebar-4.jpg'
  ];
  miniSidebar: boolean = false;
  darkMode: boolean = false;
  boxLayout: boolean = false;
  rtlLayout: boolean = false;
  navCollapsed: boolean = false;
  isDarkSidenav: boolean = true;
  isTopNav: boolean = true;
  selectedSidebarImage: string = this.sidebarBackgroundImages[3];

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
}
