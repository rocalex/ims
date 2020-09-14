import { Component, OnInit } from '@angular/core';

import { StaffNoticeManagementService } from '../staff-management-notice.service';
import { LoaderService } from '../../../../../shared/loader-service';
import { SnackbarService } from '../../../../../shared/snackbar-service';
import { UserGroupFeatureParentEnum, UserGroupFeatureChildEnum } from '../../../../../shared/sidenav/sidenav.model';
import { PermissionService } from '../../../../../shared/permission.service';

@Component({
    moduleId: module.id,
    templateUrl: 'staff-management-notice-list.html'
})
export class ListNoticeManagementComponent implements OnInit {

    noticeList: any[] = [];

    constructor(private noticeManagementService: StaffNoticeManagementService,
        private loaderService: LoaderService,
      private snackbarService: SnackbarService,
      private permissionService: PermissionService) { }

    ngOnInit() {
        this.getNoticeList();
    }

    getNoticeList() {
        this.loaderService.toggleLoader(true);
        this.noticeManagementService.getAllNotices()
            .then(res => {
                this.noticeList = res.json();
                this.loaderService.toggleLoader(false);
            })
            .catch(err => {
                this.loaderService.toggleLoader(false);
            });
    }

    deleteNotice(noticeId: number) {
        this.loaderService.toggleLoader(true);
        this.noticeManagementService.deleteNotice(noticeId)
            .then(res => {

                this.snackbarService.showSnackbar(res.json().message);
                this.ngOnInit();

                this.loaderService.toggleLoader(false);
            })
            .catch(err => {
                this.loaderService.toggleLoader(false);
            });
  }

  isAllowed(type: string) {
    return this.permissionService.isAllowed(UserGroupFeatureParentEnum.Staff, UserGroupFeatureChildEnum.CircularNotice, type);
  }
}
