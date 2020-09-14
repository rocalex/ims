import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { LoaderService } from '../../../../shared/loader-service';
import { PermissionService } from '../../../../shared/permission.service';
import { SnackbarService } from '../../../../shared/snackbar-service';
import { UserGroupFeatureParentEnum, UserGroupFeatureChildEnum } from '../../../../shared/sidenav/sidenav.model';
import { GroupModel } from '../componentgroup.model';
import { ComponentGroupService } from '../componentgroup.service';

@Component({
  moduleId: module.id,
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {
  errorMessage: string = '';
  addGroup: GroupModel = new GroupModel();
  groupId: number;
  constructor(private loaderService: LoaderService,
    private permissionService: PermissionService,
    private groupService: ComponentGroupService,
    private snackBar: SnackbarService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    ) { 
      this.activatedRoute.params.subscribe(param => this.groupId = param.id);
    }

  ngOnInit() {
    this.getGroupDetail();
  }

  getGroupDetail() {
    this.loaderService.toggleLoader(true);
    this.groupService.getComponentGroupById(this.groupId).then(res => {
      let response = res.json();
      if (response.hasError !== null && response.hasError !== undefined && response.hasError) {
        this.snackBar.showSnackbar(response.message);
        this.router.navigate(['payroll', 'componentgroup']);
      }
      this.addGroup = response;
      this.loaderService.toggleLoader(false);
    }).catch(error => {
      console.log(error.json());
      this.loaderService.toggleLoader(false);
    });
  }

  isAllowed(type: string) {
    return this.permissionService.isAllowed(UserGroupFeatureParentEnum.Finance, UserGroupFeatureChildEnum.FinanceBasicReciept, type);
  }

  add() {
    this.loaderService.toggleLoader(true);
    this.groupService.updateComponentGroup(this.addGroup).then(res => {
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
