import { Component, OnInit } from '@angular/core';
import { LevelManagementService } from '../student-management-level.service';
import { LoaderService } from '../../../../../shared/loader-service';
import { Router } from '@angular/router';
import { SnackbarService } from '../../../../../shared/snackbar-service';
import { BaseModelLookUp, LookUpResponse } from '../../student-management-lookup.model';

@Component({
  moduleId: module.id,
  templateUrl: 'student-management-level-edit-detail.html'
})
export class EditAndDetailLevelManagementComponent implements OnInit {
  levelId: number;
  baseModel: BaseModelLookUp = new BaseModelLookUp();
  error: LookUpResponse = new LookUpResponse();
  constructor(private levelManagementService: LevelManagementService, private loaderService: LoaderService,
    private router: Router, private snackBar: SnackbarService) {
  }

  ngOnInit() {
    var path = location.pathname.split('/');
    this.levelId = +(path[4]);
    this.getInstituteLevelDetail();
  }

  getInstituteLevelDetail() {
    this.loaderService.toggleLoader(true);
    this.levelManagementService.getInstituteLevelDetail(this.levelId).then(res => {
      var response = res.json();
      if (response.message) {
        this.snackBar.showSnackbar(response.message);
        this.router.navigate(['student', 'lookup', 'level', 'list']);
      } else {
        this.baseModel.Name = response.name;
        this.baseModel.Code = response.code;
        this.baseModel.Description = response.description;
        this.baseModel.Status = response.status;
      }
      this.loaderService.toggleLoader(false);
    })
  }

  updateInstituteLevel(updateLevel: BaseModelLookUp) {
    this.loaderService.toggleLoader(true);
    var updateData = {
      Name: updateLevel.Name, Code: updateLevel.Code, LevelId: this.levelId,
      Description: updateLevel.Description, Status: updateLevel.Status
    }
    this.levelManagementService.updateInstituteLevel(updateData).then(res => {
      var response = res.json();
      if (!response.hasError) {
        this.router.navigate(['student', 'lookup', 'level', 'list']);
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
