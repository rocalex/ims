import { Component, Output, EventEmitter, Renderer2, Input, OnInit } from '@angular/core';
import { Language } from '../language.model';
import { Sidenav } from '../sidenav/sidenav.model';
import { SidenavService } from '../sidenav/sidenav.service';
import { LoaderService } from '../loader-service';
import { SharedService } from '../shared.service';
import { NotificationManagementService } from '../notification.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html'
})
export class HeaderComponent implements OnInit {
  @Input() nav: Sidenav[] = [];
  @Output() toggleSidenav: EventEmitter<boolean> =
    new EventEmitter<boolean>();
  @Output() languageChange: EventEmitter<any> = new EventEmitter<any>();
  @Output() directionChange: EventEmitter<string> = new EventEmitter<string>();
  userInfo: any = {};
  userName: string = '';

  allNotifications: any[] = [];
  unreadNotificationCount: number;

  languages: Language[] = [
    { code: 'en', name: 'English' },
    { code: 'ar', name: 'Arabic', dir: 'rtl' }
  ];
  currentLanguage: Language;

  @Input() institutes: any[] = [];
  @Input() currentInstitute: any;
  @Output() instituteChange: EventEmitter<any> = new EventEmitter<any>();

  @Input() academicYears: any[] = [];
  @Input() selectedAcademicYear: any;
  @Output() academicYearChange: EventEmitter<any> = new EventEmitter<any>();
  @Input() isSuperAdmin: boolean = false;

  constructor(private renderer: Renderer2, private sidenavService: SidenavService, private loaderService: LoaderService,
    private sharedService: SharedService, private notificationManagementService: NotificationManagementService) {
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
    })
  }

  selectLanguage(language: Language) {
    this.currentLanguage = language;
    this.languageChange.emit(language.code);
    this.directionChange.emit(language.dir);
  }
  onToggleSidenav() {
    this.toggleSidenav.emit();
  }
  toggleSubMenu(event: Event) {
    let target = (<HTMLElement>(<HTMLElement>event.target).parentNode);
    const action = target.classList.contains('open') ? 'removeClass' : 'addClass';
    this.renderer[action](target, 'open');
  }

  selectInstitute(institute: any) {
    this.instituteChange.emit(institute);
  }

  selectAcademicYear(academicYear: any) {
    this.academicYearChange.emit(academicYear);
  }

  markNotificationAsRead(notificationId: number) {
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
}
