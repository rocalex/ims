import { Component, OnInit } from '@angular/core';
import { LanguageManagementService } from '../student-management-language.service';
import { LoaderService } from '../../../../../shared/loader-service';
import { Router } from '@angular/router';
import { SnackbarService } from '../../../../../shared/snackbar-service';
import { BaseModelLookUp, LookUpResponse } from '../../student-management-lookup.model';

@Component({
  moduleId: module.id,
  templateUrl: 'student-management-language-edit-detail.html'
})
export class EditAndDetailLanguageManagementComponent implements OnInit {
  languageId: number;
  language: BaseModelLookUp = new BaseModelLookUp();
  error: LookUpResponse = new LookUpResponse();
  constructor(private languageManagementService: LanguageManagementService, private loaderService: LoaderService,
    private router: Router, private snackBar: SnackbarService) {
  }

  ngOnInit() {
    var path = location.pathname.split('/');
    this.languageId = +(path[4]);
    this.getInstituteLanguageDetail();
  }

  getInstituteLanguageDetail() {
    this.loaderService.toggleLoader(true);
    this.languageManagementService.getInstituteLanguageDetail(this.languageId).then(res => {
      var response = res.json();
      if (response.message) {
        this.snackBar.showSnackbar(response.message);
        this.router.navigate(['student', 'lookup', 'language', 'list']);
      } else {
        this.language.Code = response.code;
        this.language.Name = response.name;
        this.language.Description = response.description;
        this.language.Status = response.status;
      }
      this.loaderService.toggleLoader(false);
    })
  }

  updateInstituteLanguage(updateLanguage: BaseModelLookUp) {
    this.loaderService.toggleLoader(true);
    var updateData = {
      Name: updateLanguage.Name, Code: updateLanguage.Code, Id: this.languageId,
      Description: updateLanguage.Description, Status: updateLanguage.Status
    }
    this.languageManagementService.updateInstituteLanguage(updateData).then(res => {
      var response = res.json();
      if (!response.hasError) {
        this.router.navigate(['student', 'lookup', 'language', 'list']);
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
