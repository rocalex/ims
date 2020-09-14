import { Component, OnInit } from '@angular/core';
import { DisciplinaryStatusManagementService } from '../student-management-disciplinarystatus.service';
import { LoaderService } from '../../../../../shared/loader-service';
import { Router } from '@angular/router';
import { SnackbarService } from '../../../../../shared/snackbar-service';
import { BaseModelLookUp, LookUpResponse } from '../../student-management-lookup.model';

@Component({
  moduleId: module.id,
  templateUrl: 'student-management-disciplinarystatus-edit-detail.html'
})
export class EditAndDetailDisciplinaryStatusManagementComponent implements OnInit {
  DisciplinaryStatusId: number;
  baseModel: BaseModelLookUp = new BaseModelLookUp();
  error: LookUpResponse = new LookUpResponse();
  constructor(private DisciplinaryStatusManagementService: DisciplinaryStatusManagementService, private loaderService: LoaderService,
    private router: Router, private snackBar: SnackbarService) {
  }

  ngOnInit() {
    var path = location.pathname.split('/');
    this.DisciplinaryStatusId = +(path[4]);
    this.getInstituteDisciplinaryStatusDetail();
  }

  getInstituteDisciplinaryStatusDetail() {
    this.loaderService.toggleLoader(true);
    this.DisciplinaryStatusManagementService.getInstituteDisciplinaryStatusDetail(this.DisciplinaryStatusId).then(res => {
      var response = res.json();
      if (response.message) {
        this.snackBar.showSnackbar(response.message);
        this.router.navigate(['student', 'lookup', 'disciplinarystatus', 'list']);
      } else {
        this.baseModel.Name = response.name;
        this.baseModel.Code = response.code;
        this.baseModel.Description = response.description;
        this.baseModel.Status = response.status;
      }
      this.loaderService.toggleLoader(false);
    })
  }

  updateInstituteDisciplinaryStatus(updateDisciplinaryStatus: BaseModelLookUp) {
    this.loaderService.toggleLoader(true);
    var updateData = {
      Name: updateDisciplinaryStatus.Name, Code: updateDisciplinaryStatus.Code, Id: this.DisciplinaryStatusId,
      Description: updateDisciplinaryStatus.Description, Status: updateDisciplinaryStatus.Status
    }
    this.DisciplinaryStatusManagementService.updateInstituteDisciplinaryStatus(updateData).then(res => {
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
