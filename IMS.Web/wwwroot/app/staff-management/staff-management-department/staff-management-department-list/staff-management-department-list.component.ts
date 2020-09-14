import { Component, OnInit } from '@angular/core';
import { StaffDepartmentManagementService } from '../staff-management-department.service';
import { LoaderService } from '../../../../shared/loader-service';
import { UserGroupFeatureParentEnum, UserGroupFeatureChildEnum } from '../../../../shared/sidenav/sidenav.model';
import { PermissionService } from '../../../../shared/permission.service';

@Component({
    moduleId: module.id,
    templateUrl: 'staff-management-department-list.html'
})
export class ListDepartmentManagementComponent implements OnInit {

    departments: any[] = [];

  constructor(private staffDepartmentManagementService: StaffDepartmentManagementService,
    private loaderService: LoaderService, private permissionService: PermissionService) {
    }

    ngOnInit() {
        this.getAllDepartments();
    }

    getAllDepartments() {
        this.loaderService.toggleLoader(true);
        this.staffDepartmentManagementService.getAllDepartments()
            .then((res) => {
                this.departments = res.json();
                this.loaderService.toggleLoader(false);
            })
            .catch((err) => {
                console.log(err.json());
                this.loaderService.toggleLoader(false);
            })
  }

  isAllowed(type: string) {
    return this.permissionService.isAllowed(UserGroupFeatureParentEnum.Staff, UserGroupFeatureChildEnum.StaffDepartment, type);
  }
}
