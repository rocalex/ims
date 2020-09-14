import { Component, OnInit } from '@angular/core';
import { BloodGroupManagementService } from '../student-management-blood-group.service';
import { LoaderService } from '../../../../../shared/loader-service';
import { Router } from '@angular/router';
import { SnackbarService } from '../../../../../shared/snackbar-service';
import { BaseModelLookUp, LookUpResponse } from '../../student-management-lookup.model';

@Component({
  moduleId: module.id,
  templateUrl: 'student-management-blood-group-edit-detail.html'
})
export class EditAndDetailBloodGroupManagementComponent implements OnInit {
  bloodGroupId: number;
  bloodGroup: BaseModelLookUp = new BaseModelLookUp();
  error: LookUpResponse = new LookUpResponse();
  constructor(private bloodGroupManagementService: BloodGroupManagementService, private loaderService: LoaderService,
    private router: Router, private snackBar: SnackbarService) {
  }

  ngOnInit() {
    var path = location.pathname.split('/');
    this.bloodGroupId = +(path[4]);
    this.getInstituteBloodGroupDetail();
  }

  getInstituteBloodGroupDetail() {
    this.loaderService.toggleLoader(true);
    this.bloodGroupManagementService.getInstituteBloodGroupDetail(this.bloodGroupId).then(res => {
      var response = res.json();
      if (response.message) {
        this.snackBar.showSnackbar(response.message);
        this.router.navigate(['student', 'lookup', 'bloodgroup', 'list']);
      } else {
        this.bloodGroup.Code = response.code;
        this.bloodGroup.Name = response.name;
        this.bloodGroup.Description = response.description;
        this.bloodGroup.Status = response.status;
      }
      this.loaderService.toggleLoader(false);
    })
  }

  updateInstituteBloodGroup(updateBloodGroup: BaseModelLookUp) {
    this.loaderService.toggleLoader(true);
    var updateData = {
      Name: updateBloodGroup.Name, Code: updateBloodGroup.Code, BloodGroupId: this.bloodGroupId,
      Description: updateBloodGroup.Description, Status: updateBloodGroup.Status
    }
    this.bloodGroupManagementService.updateInstituteBloodGroup(updateData).then(res => {
      var response = res.json();
      if (!response.hasError) {
        this.router.navigate(['student', 'lookup', 'bloodgroup', 'list']);
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
