import { Component, OnInit } from '@angular/core';
import { LoaderService } from '../../../../shared/loader-service';
import { PermissionService } from '../../../../shared/permission.service';
import { UserGroupFeatureParentEnum, UserGroupFeatureChildEnum } from '../../../../shared/sidenav/sidenav.model';
import { BookTypeModel } from '../booktype.model';
import { BookTypeService } from '../booktype.service';

@Component({
  moduleId: module.id,
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {

  list: BookTypeModel[] = [];

  constructor(
    private bookTypeService: BookTypeService,
    private loaderService: LoaderService,
    private permissionService: PermissionService
  ) { }

  ngOnInit() {
    this.getBookTypeData();
  }
  
  getBookTypeData() {
    this.loaderService.toggleLoader(true);
    this.bookTypeService.getBookTypesForLoggedInUser()
      .then(res => {
        this.list = res.json();
        this.loaderService.toggleLoader(false);
      });
  }

  isAllowed(type: string) {
    return this.permissionService.isAllowed(UserGroupFeatureParentEnum.Finance, UserGroupFeatureChildEnum.FinanceBasicReciept, type);
  }
}
