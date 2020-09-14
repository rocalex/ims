import { Component, OnInit } from '@angular/core';
import { EmailConfigurationManagementService } from '../administration-email-configuration.service';
import { LoaderService } from '../../../../shared/loader-service';
import { PermissionService } from '../../../../shared/permission.service';
import { UserGroupFeatureParentEnum, UserGroupFeatureChildEnum } from '../../../../shared/sidenav/sidenav.model';

@Component({
  moduleId: module.id,
  templateUrl: 'administration-email-configuration-list.html'
})
export class ListEmailConfigurationManagementComponent implements OnInit {

  emailConfigurations: any[] = [];

  constructor(private emailConfigurationManagementService: EmailConfigurationManagementService,
    private loaderService: LoaderService, private permissionService: PermissionService) {
  }

  ngOnInit() {
    this.getAllEmailConfigurations();
  }

  getAllEmailConfigurations() {
    this.loaderService.toggleLoader(true);
    this.emailConfigurationManagementService.getAllEmailConfigurations()
      .then((res) => {
        this.emailConfigurations = res.json();
        this.loaderService.toggleLoader(false);
      })
      .catch((err) => {
        console.log(err.json());
        this.loaderService.toggleLoader(false);
      })
  }

  isAllowed(type: string) {
    return this.permissionService.isAllowed(UserGroupFeatureParentEnum.Administration, UserGroupFeatureChildEnum.AcademicEmail, type);
  }
}
