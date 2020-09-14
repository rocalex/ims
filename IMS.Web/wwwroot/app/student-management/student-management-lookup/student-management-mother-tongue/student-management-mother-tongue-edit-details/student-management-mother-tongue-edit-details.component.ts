import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { MotherTongueManagementService } from '../student-management-mother-tongue.service';
import { LoaderService } from '../../../../../shared/loader-service';
import { SnackbarService } from '../../../../../shared/snackbar-service';

import { BaseModelLookUp, LookUpResponse } from '../../student-management-lookup.model';

@Component({
  moduleId: module.id,
  templateUrl: 'student-management-mother-tongue-edit-details.html'
})
export class EditDetailsMotherTongueManagementComponent implements OnInit {

  motherTongueId: number;
  motherTongue: BaseModelLookUp = new BaseModelLookUp();
  error: LookUpResponse = new LookUpResponse();

  constructor(private motherTongueManagementService: MotherTongueManagementService,
    private loader: LoaderService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private snackBar: SnackbarService) {

    this.activatedRoute.params.subscribe(param => this.motherTongueId = param.id);
  }

  ngOnInit() {
    this.getMotherTongue();
  }

  getMotherTongue() {
    this.loader.toggleLoader(true);

    this.motherTongueManagementService.getMotherTongueDetail(this.motherTongueId)
      .then(res => {
        let response = res.json();

        this.motherTongue.Code = response.code;
        this.motherTongue.Name = response.name;
        this.motherTongue.Description = response.description;
        this.motherTongue.Status = response.status;

        this.loader.toggleLoader(false);
      })
      .catch(err => {
        this.loader.toggleLoader(false);
        console.log(err.json());
      });
  }

  updateMotherTongue(updatedMotherTongue: BaseModelLookUp) {
    let updatedData = {
      Name: updatedMotherTongue.Name, Code: updatedMotherTongue.Code, Id: this.motherTongueId,
      Description: updatedMotherTongue.Description, Status: updatedMotherTongue.Status
    }

    this.loader.toggleLoader(true);
    this.motherTongueManagementService.updateMotherTongue(updatedData)
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

        this.loader.toggleLoader(false);
      })
      .catch(err => {
        this.loader.toggleLoader(false);
        console.log(err.json());
      });
  }
}
