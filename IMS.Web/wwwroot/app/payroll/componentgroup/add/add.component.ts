import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoaderService } from '../../../../shared/loader-service';
import { PermissionService } from '../../../../shared/permission.service';
import { SnackbarService } from '../../../../shared/snackbar-service';
import { UserGroupFeatureParentEnum, UserGroupFeatureChildEnum } from '../../../../shared/sidenav/sidenav.model';
import { GroupModel } from '../componentgroup.model';
import { ComponentGroupService } from '../componentgroup.service';

@Component({
  moduleId: module.id,
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css']
})
export class AddComponent implements OnInit {
  errorMessage: string = '';
  addGroup: GroupModel = new GroupModel();

  constructor(private loaderService: LoaderService,
    private permissionService: PermissionService,
    private groupService: ComponentGroupService,
    private snackBar: SnackbarService,
    private router: Router,
    ) { }

  ngOnInit() {
  }

  isAllowed(type: string) {
    return this.permissionService.isAllowed(UserGroupFeatureParentEnum.Finance, UserGroupFeatureChildEnum.FinanceBasicReciept, type);
  }

  add() {
    this.loaderService.toggleLoader(true);
    this.groupService.addComponentGroup(this.addGroup).then(res => {
      let response = res.json();
      if(response.hasError === null || response.hasError === undefined || !response.hasError) {
        this.snackBar.showSnackbar(response.message);
        this.router.navigate(['payroll', 'componentgroup']);
      } else {
        this.errorMessage = response.message;
      }
      this.loaderService.toggleLoader(false);
    }).catch(err => {
      this.loaderService.toggleLoader(false);
    });
  }
}
