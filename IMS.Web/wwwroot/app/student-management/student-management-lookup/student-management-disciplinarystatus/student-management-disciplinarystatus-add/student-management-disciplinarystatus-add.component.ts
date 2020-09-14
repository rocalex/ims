import { Component, OnInit } from '@angular/core';
import { DisciplinaryStatusManagementService } from '../student-management-disciplinarystatus.service';
import { LoaderService } from '../../../../../shared/loader-service';
import { Router } from '@angular/router';
import { SnackbarService } from '../../../../../shared/snackbar-service';
import { BaseModelLookUp, LookUpResponse } from '../../student-management-lookup.model';

@Component({
  moduleId: module.id,
  templateUrl: 'student-management-disciplinarystatus-add.html'
})
export class AddDisciplinaryStatusManagementComponent implements OnInit {
  baseModel: BaseModelLookUp = new BaseModelLookUp();
  error: LookUpResponse = new LookUpResponse();
  constructor(private DisciplinaryStatusManagementService: DisciplinaryStatusManagementService, private loaderService: LoaderService,
    private router: Router, private snackBar: SnackbarService) {
  }

  ngOnInit() {
  }

  addInstituteDisciplinaryStatus(addDisciplinaryStatus: BaseModelLookUp) {
    this.loaderService.toggleLoader(true);
    this.DisciplinaryStatusManagementService.addInstituteDisciplinaryStatus(addDisciplinaryStatus).then(res => {
      var response = res.json();
      if (!response.hasError) {
        this.router.navigate(['student', 'lookup', 'disciplinarystatus', 'list']);
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
