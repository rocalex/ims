import { Component, OnInit } from '@angular/core';
import { TeachingStaffManagementService } from '../student-management-teachingstaff.service';
import { LoaderService } from '../../../../../shared/loader-service';
import { Router } from '@angular/router';
import { SnackbarService } from '../../../../../shared/snackbar-service';
import { BaseModelLookUp, LookUpResponse } from '../../student-management-lookup.model';

@Component({
  moduleId: module.id,
  templateUrl: 'student-management-teachingstaff-add.html'
})
export class AddTeachingStaffManagementComponent implements OnInit {
  baseModel: BaseModelLookUp = new BaseModelLookUp();
  error: LookUpResponse = new LookUpResponse();
  constructor(private teachingStaffManagementService: TeachingStaffManagementService, private loaderService: LoaderService,
    private router: Router, private snackBar: SnackbarService) {
  }

  ngOnInit() {
  }

  addInstituteTeachingStaff(addTeachingStaff: BaseModelLookUp) {
    this.loaderService.toggleLoader(true);
    this.teachingStaffManagementService.addInstituteTeachingStaff(addTeachingStaff).then(res => {
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
