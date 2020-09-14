import { Component, OnInit } from '@angular/core';
import { RoleManagementService } from '../role-management.service';
import { LoaderService } from '../../../shared/loader-service';

@Component({
  moduleId: module.id,
  templateUrl: 'role-management-list.html'
})
export class RoleManagementListComponent implements OnInit {
  roles: any[] = [];
  constructor(private roleManagementService: RoleManagementService, private loaderService: LoaderService) {
  }

  ngOnInit() {
    this.loaderService.toggleLoader(true);
    this.getAllRoles();
  }

  getAllRoles() {
    this.roleManagementService.getAllRoles().then(res => {
      this.roles = res.json();
      this.loaderService.toggleLoader(false);
    })
  }
}
