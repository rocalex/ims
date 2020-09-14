import { Component, OnInit } from '@angular/core';
import { LoaderService } from '../../../shared/loader-service';
import { PermissionService } from '../../../shared/permission.service';
import { UserGroupFeatureParentEnum, UserGroupFeatureChildEnum } from '../../../shared/sidenav/sidenav.model';

@Component({
  selector: 'app-mess-manage',
  templateUrl: './mess-manage.component.html',
  styleUrls: ['./mess-manage.component.css']
})
export class MessManageComponent implements OnInit {

  constructor(private loaderService: LoaderService, private permissionService: PermissionService) { }

  ngOnInit() {
  }

  isAllowed(type: string) {
    return this.permissionService.isAllowed(UserGroupFeatureParentEnum.Finance, UserGroupFeatureChildEnum.FinanceBasicReciept, type);
  }
}
