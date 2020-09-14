import { Component, OnInit } from '@angular/core';
import { SlabManagementService } from '../student-management-slab.service';
import { LoaderService } from '../../../../../shared/loader-service';
import { UserGroupFeatureParentEnum, UserGroupFeatureChildEnum } from '../../../../../shared/sidenav/sidenav.model';
import { PermissionService } from '../../../../../shared/permission.service';

@Component({
  moduleId: module.id,
  templateUrl: 'student-management-slab-list.html'
})
export class ListSlabManagementComponent implements OnInit {
  slabs: any[] = [];
  constructor(private slabManagementService: SlabManagementService, private loaderService: LoaderService,
    private permissionService: PermissionService) {
  }

  ngOnInit() {
    this.getAllInstituteSlab();
  }

  getAllInstituteSlab() {
    this.loaderService.toggleLoader(true);
    this.slabManagementService.getAllInstituteSlab().then(res => {
      this.slabs = res.json();
      this.loaderService.toggleLoader(false);
    })
  }

  isAllowed(type: string) {
    return this.permissionService.isAllowed(UserGroupFeatureParentEnum.Student, UserGroupFeatureChildEnum.StudentLookUp, type);
  }
}
