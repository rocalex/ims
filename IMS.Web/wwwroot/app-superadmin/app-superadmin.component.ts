import { Component, HostListener } from '@angular/core';
import { Sidenav } from '../shared/sidenav/sidenav.model';
import { Router, NavigationEnd } from '@angular/router';
import { LoaderService } from '../shared/loader-service';
import { TranslateService } from '@ngx-translate/core';
import { PageTitleService } from '../shared/page-title';

@Component({
  selector: 'superadmin-app-root',
  moduleId: module.id,
  templateUrl: 'app-superadmin.html'
})
export class SuperAdminAppComponent {
  isSidenavExpanded: boolean = false;
  isSidenavExpandedDesktop: boolean = true;
  loader = false;
  direction: string = 'ltr';
  nav: Sidenav[] = [
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

  constructor(private router: Router, private loaderService: LoaderService, private translate: TranslateService,
    private pageTitleService: PageTitleService) {
    this.router.events.subscribe((event: NavigationEnd) => {
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
      if (val instanceof NavigationEnd) {
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

  @HostListener('window:resize', [])
  onWindowResize() {
    if (window.innerWidth < 768) {
      this.isSidenavExpanded = false;
    } else {
      this.isSidenavExpanded = this.isSidenavExpandedDesktop;
    }
  }

  toggleSidenav(value: any) {
    if (value != null && value != undefined) {
      this.isSidenavExpanded = value;
    } else {
      this.isSidenavExpanded = !this.isSidenavExpanded;
    }
    if (window.innerWidth > 767) {
      this.isSidenavExpandedDesktop = this.isSidenavExpanded;
    }
  }

  languageChange(event: string) {
    this.translate.use(event);
    this.changeLabel();
  }

  directionChange(value: string) {
    this.direction = value;
  }

  async changeLabel() {
    for (var i = 0; i < this.nav.length; i++) {
      var value = await this.translate.get(this.nav[i].bindName).toPromise();
      this.nav[i].name = value;
      if (this.nav[i].children) {
        for (var j = 0; j < this.nav[i].children.length; j++) {
          var childValue = await this.translate.get(this.nav[i].children[j].bindName).toPromise();
          this.nav[i].children[j].name = childValue;
        }
      }
    }
  }
}
