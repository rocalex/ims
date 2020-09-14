import { Component, OnInit } from '@angular/core';
import { AddInstituteSubject, InstituteSubjectResponse, InstituteSubjectResponseType } from '../institute-management-subject.model';
import { SubjectManagementService } from '../institute-management-subject.service';
import { LoaderService } from '../../../../shared/loader-service';
import { Router } from '@angular/router';
import { SnackbarService } from '../../../../shared/snackbar-service';

@Component({
  moduleId: module.id,
  templateUrl: 'institute-management-subject-add.html'
})
export class AddSubjectManagementComponent implements OnInit {
  addSubject: AddInstituteSubject = new AddInstituteSubject();
  error: InstituteSubjectResponse = new InstituteSubjectResponse();
  constructor(private subjectManagementService: SubjectManagementService, private loaderService: LoaderService,
    private router: Router, private snackBar: SnackbarService) { }

  ngOnInit() {

  }

  addInstituteSubject() {
    this.loaderService.toggleLoader(true);
    this.subjectManagementService.addInstituteSubject(this.addSubject).then(res => {
      var response = res.json();
      if (!response.hasError) {
        this.router.navigate(['institute', 'subject', 'list']);
        this.snackBar.showSnackbar(response.message);
      } else {
        this.error.ErrorType = response.errorType;
        this.error.HasError = response.hasError;
        this.error.Message = response.message;
      }
      this.loaderService.toggleLoader(false);
    })
  }

  hasError(fieldName: string) {
    var id = InstituteSubjectResponseType[fieldName];
    if (this.error.ErrorType === id) {
      return this.error.HasError;
    } else {
      return false;
    }
  }

  resetError(fieldName: string) {
    var id = InstituteSubjectResponseType[fieldName];
    if (this.error.ErrorType === id) {
      this.error = new InstituteSubjectResponse();
    }
  }
}
