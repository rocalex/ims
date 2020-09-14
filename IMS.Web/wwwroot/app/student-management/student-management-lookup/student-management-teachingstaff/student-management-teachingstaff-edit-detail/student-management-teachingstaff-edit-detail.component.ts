import { Component, OnInit } from '@angular/core';
import { TeachingStaffManagementService } from '../student-management-teachingstaff.service';
import { LoaderService } from '../../../../../shared/loader-service';
import { Router } from '@angular/router';
import { SnackbarService } from '../../../../../shared/snackbar-service';
import { BaseModelLookUp, LookUpResponse } from '../../student-management-lookup.model';

@Component({
  moduleId: module.id,
  templateUrl: 'student-management-teachingstaff-edit-detail.html'
})
export class EditAndDetailTeachingStaffManagementComponent implements OnInit {
  teachingStaffId: number;
  baseModel: BaseModelLookUp = new BaseModelLookUp();
  error: LookUpResponse = new LookUpResponse();
  constructor(private teachingStaffManagementService: TeachingStaffManagementService, private loaderService: LoaderService,
    private router: Router, private snackBar: SnackbarService) {
  }

  ngOnInit() {
    var path = location.pathname.split('/');
    this.teachingStaffId = +(path[4]);
    this.getInstituteTeachingStaffDetail();
  }

  getInstituteTeachingStaffDetail() {
    this.loaderService.toggleLoader(true);
    this.teachingStaffManagementService.getInstituteTeachingStaffDetail(this.teachingStaffId).then(res => {
      var response = res.json();
      if (response.message) {
        this.snackBar.showSnackbar(response.message);
        this.router.navigate(['student', 'lookup', 'teachingstaff', 'list']);
      } else {
        this.baseModel.Name = response.name;
        this.baseModel.Code = response.code;
        this.baseModel.Description = response.description;
        this.baseModel.Status = response.status;
      }
      this.loaderService.toggleLoader(false);
    })
  }

  updateInstituteTeachingStaff(updateTeachingStaff: BaseModelLookUp) {
    this.loaderService.toggleLoader(true);
    var updateData = {
      Name: updateTeachingStaff.Name, Code: updateTeachingStaff.Code, TeachingStaffId: this.teachingStaffId,
      Description: updateTeachingStaff.Description, Status: updateTeachingStaff.Status
    }
    this.teachingStaffManagementService.updateInstituteTeachingStaff(updateData).then(res => {
      var response = res.json();
      if (!response.hasError) {
        this.router.navigate(['student', 'lookup', 'teachingstaff', 'list']);
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
