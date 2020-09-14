import { Component, OnInit } from '@angular/core';
import { BloodGroupManagementService } from '../student-management-blood-group.service';
import { LoaderService } from '../../../../../shared/loader-service';
import { Router } from '@angular/router';
import { SnackbarService } from '../../../../../shared/snackbar-service';
import { BaseModelLookUp, LookUpResponse } from '../../student-management-lookup.model';

@Component({
  moduleId: module.id,
  templateUrl: 'student-management-blood-group-add.html'
})
export class AddBloodGroupManagementComponent implements OnInit {
  baseModel: BaseModelLookUp = new BaseModelLookUp();
  error: LookUpResponse = new LookUpResponse();
  constructor(private bloodGroupManagementService: BloodGroupManagementService, private loaderService: LoaderService,
    private router: Router, private snackBar: SnackbarService) {
  }

  ngOnInit() {
  }

  addInstituteBloodGroup(addBloodGroup: BaseModelLookUp) {
    this.loaderService.toggleLoader(true);
    this.bloodGroupManagementService.addInstituteBloodGroup(addBloodGroup).then(res => {
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
