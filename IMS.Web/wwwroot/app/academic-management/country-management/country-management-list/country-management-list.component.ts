import { Component, OnInit } from '@angular/core';
import { CountryManagementService } from '../country-management.service';
import { LoaderService } from '../../../../shared/loader-service';
import { PermissionService } from '../../../../shared/permission.service';
import { UserGroupFeatureParentEnum, UserGroupFeatureChildEnum } from '../../../../shared/sidenav/sidenav.model';

@Component({
  moduleId: module.id,
  templateUrl: 'country-management-list.html'
})
export class ListCountryManagementComponent implements OnInit {
  countries: any[] = [];
  constructor(private countryManagementService: CountryManagementService, private loaderService: LoaderService,
    private permissionService: PermissionService) {
  }

  ngOnInit() {
    this.loaderService.toggleLoader(true);
    this.getAllCountries();
  }

  getAllCountries() {
    this.countryManagementService.getAllCountries().then(res => {
      this.countries = res.json();
      this.loaderService.toggleLoader(false);
    });
  }

  isAllowed(type: string) {
    return this.permissionService.isAllowed(UserGroupFeatureParentEnum.Administration, UserGroupFeatureChildEnum.AcademicCountry, type);
  }
}
