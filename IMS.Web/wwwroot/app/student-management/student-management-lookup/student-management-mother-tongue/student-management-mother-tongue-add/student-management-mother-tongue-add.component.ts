import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { MotherTongueManagementService } from '../student-management-mother-tongue.service';
import { LoaderService } from '../../../../../shared/loader-service';
import { SnackbarService } from '../../../../../shared/snackbar-service';

import { BaseModelLookUp, LookUpResponse } from '../../student-management-lookup.model';

@Component({
  moduleId: module.id,
  templateUrl: 'student-management-mother-tongue-add.html'
})
export class AddMotherTongueManagementComponent implements OnInit {

  baseModel: BaseModelLookUp = new BaseModelLookUp();
  error: LookUpResponse = new LookUpResponse();

  constructor(private motherTongueManagementService: MotherTongueManagementService,
    private loaderService: LoaderService,
    private router: Router,
    private snackBar: SnackbarService) { }

  ngOnInit() { }

  addMotherTongue(addMotherTongue: BaseModelLookUp) {
    this.loaderService.toggleLoader(true);
    this.motherTongueManagementService.addMotherTongue(addMotherTongue)
      .then(res => {
        let response = res.json();

        if (response.hasError === null || response.hasError === undefined || !response.hasError) {
          this.snackBar.showSnackbar(response.message);
          this.router.navigate(['student', 'lookup', 'mothertongue', 'list']);
        }
        else {
          this.error = new LookUpResponse();
          this.error.ErrorType = response.errorType;
          this.error.HasError = response.hasError;
          this.error.Message = response.message;
        }

        this.loaderService.toggleLoader(false);
      })
      .catch(err => {
        this.loaderService.toggleLoader(false);
        console.log(err.json());
      });
  }
}
