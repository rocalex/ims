import { Component, OnInit } from '@angular/core';
import { RelationshipManagementService } from '../student-management-relationship.service';
import { LoaderService } from '../../../../../shared/loader-service';
import { Router } from '@angular/router';
import { SnackbarService } from '../../../../../shared/snackbar-service';
import { BaseModelLookUp, LookUpResponse } from '../../student-management-lookup.model';

@Component({
  moduleId: module.id,
  templateUrl: 'student-management-relationship-edit-detail.html'
})
export class EditAndDetailRelationshipManagementComponent implements OnInit {
  relationshipId: number;
  baseModel: BaseModelLookUp = new BaseModelLookUp();
  error: LookUpResponse = new LookUpResponse();
  constructor(private relationshipManagementService: RelationshipManagementService, private loaderService: LoaderService,
    private router: Router, private snackBar: SnackbarService) {
  }

  ngOnInit() {
    var path = location.pathname.split('/');
    this.relationshipId = +(path[4]);
    this.getInstituteRelationshipDetail();
  }

  getInstituteRelationshipDetail() {
    this.loaderService.toggleLoader(true);
    this.relationshipManagementService.getInstituteRelationshipDetail(this.relationshipId).then(res => {
      var response = res.json();
      if (response.message) {
        this.snackBar.showSnackbar(response.message);
        this.router.navigate(['student', 'lookup', 'relationship', 'list']);
      } else {
        this.baseModel.Name = response.name;
        this.baseModel.Code = response.code;
        this.baseModel.Description = response.description;
        this.baseModel.Status = response.status;
      }
      this.loaderService.toggleLoader(false);
    })
  }

  updateInstituteRelationship(updateRelationship: BaseModelLookUp) {
    this.loaderService.toggleLoader(true);
    var updateData = {
      Name: updateRelationship.Name, Code: updateRelationship.Code, RelationshipId: this.relationshipId,
      Description: updateRelationship.Description, Status: updateRelationship.Status
    }
    this.relationshipManagementService.updateInstituteRelationship(updateData).then(res => {
      var response = res.json();
      if (!response.hasError) {
        this.router.navigate(['student', 'lookup', 'relationship', 'list']);
        this.snackBar.showSnackbar(response.message);
      } else {
        this.error = new LookUpResponse();
        this.error.ErrorType = response.errorType;
        this.error.HasError = response.hasError;
        this.error.Message = response.message;
      }
      this.loaderService.toggleLoader(false);
    })
  }
}
