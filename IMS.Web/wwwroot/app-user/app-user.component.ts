import { Component, HostListener, OnInit, ViewChild, TemplateRef } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { Sidenav } from '../shared/sidenav/sidenav.model';
import { LoaderService } from '../shared/loader-service';
import { PageTitleService } from '../shared/page-title';
import { TranslateService } from '@ngx-translate/core';
import { AppUserService } from './app-user.service';
import { MatDialog, MatDialogConfig } from '@angular/material';
import { SharedService } from '../shared/shared.service';

@Component({
  selector: 'user-app-root',
  moduleId: module.id,
  templateUrl: 'app-user.html'
})
export class UserAppComponent {
  isSidenavExpanded: boolean = false;
  isSidenavExpandedDesktop: boolean = true;
  direction: string = 'ltr';
  loader = false;
  nav: Sidenav[] = [
    { bindName: 'Sidenav.Label.Homework', icon: 'zmdi zmdi-book', url: '/homework', show: true },
    { bindName: 'Sidenav.Label.Disciplinary', icon: 'zmdi zmdi-book', url: '/disciplinary', show: false },
    { bindName: 'Sidenav.Label.LeaveManagement', icon: 'zmdi zmdi-book', url: '/leave', show: false },
    { bindName: 'Sidenav.Label.LeaveManagement', icon: 'zmdi zmdi-book', url: '/leavemanagement', show: false }
  ];
  institutes: any[] = [];
  selectedInstitute: any = {};
  @ViewChild(TemplateRef) template: TemplateRef<any>;

  academicYears: any[] = [];
  selectedAcademicYear: any = {};

  constructor(private router: Router, private loaderService: LoaderService, private pageTitleService: PageTitleService,
    private translate: TranslateService, private appService: AppUserService, public dialog: MatDialog,
    private sharedService: SharedService) {
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
    setTimeout(() => {
      this.changeLabel();
    }, 0);
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
        } else {
          this.openModal();
        }
      } else {
        this.selectedInstitute = anySelected[0];
        this.getAcademicYears();
      }
      this.loaderService.toggleLoader(false);
    })
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
    })
  }

  openModal() {
    this.dialog.open(this.template, { width: '250px', disableClose: true });
  }

  closeModal(dialogRef: any) {
    this.updateCurrentInstitute();
    dialogRef.close();
  }

  instituteChange(institute: any) {
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
          let currentAcademicYear: any = {};
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

  academicYearChange(academicYear: any) {
    this.selectedAcademicYear = academicYear;
    this.addorUpdateSelectedAcademicYear(this.selectedAcademicYear.id);
    this.sharedService.changeAcademicYear(academicYear);
    location.reload();
  }

  addorUpdateSelectedAcademicYear(yearId: number) {
    this.loaderService.toggleLoader(true);
    this.appService.addorUpdateSelectedAcademicYear(yearId).then(res => {
      this.loaderService.toggleLoader(false);
    });
  }
}
