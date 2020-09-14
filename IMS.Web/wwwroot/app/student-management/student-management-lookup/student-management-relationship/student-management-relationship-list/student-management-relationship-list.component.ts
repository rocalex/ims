import { Component, OnInit } from '@angular/core';
import { RelationshipManagementService } from '../student-management-relationship.service';
import { LoaderService } from '../../../../../shared/loader-service';
import { UserGroupFeatureParentEnum, UserGroupFeatureChildEnum } from '../../../../../shared/sidenav/sidenav.model';
import { PermissionService } from '../../../../../shared/permission.service';

@Component({
  moduleId: module.id,
  templateUrl: 'student-management-relationship-list.html'
})
export class ListRelationshipManagementComponent implements OnInit {
  relationships: any[] = [];
  constructor(private relationshipManagementService: RelationshipManagementService, private loaderService: LoaderService,
    private permissionService: PermissionService) {
  }

  ngOnInit() {
    this.getAllInstituteRelationship();
  }

  getAllInstituteRelationship() {
    this.loaderService.toggleLoader(true);
    this.relationshipManagementService.getAllInstituteRelationship().then(res => {
      this.relationships = res.json();
      this.loaderService.toggleLoader(false);
    })
  }

  isAllowed(type: string) {
    return this.permissionService.isAllowed(UserGroupFeatureParentEnum.Student, UserGroupFeatureChildEnum.StudentLookUp, type);
  }
}
