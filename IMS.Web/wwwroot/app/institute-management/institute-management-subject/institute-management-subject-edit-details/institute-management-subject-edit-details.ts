import { Component, OnInit } from '@angular/core';
import { SubjectManagementService } from '../institute-management-subject.service';
import { LoaderService } from '../../../../shared/loader-service';
import { Router } from '@angular/router';
import { SnackbarService } from '../../../../shared/snackbar-service';
import { UpdateInstituteSubject, InstituteSubjectResponse, InstituteSubjectResponseType } from '../institute-management-subject.model';

@Component({
  moduleId: module.id,
  templateUrl: 'institute-management-subject-edit-details.html'
})
export class EditDetailsSubjectManagementComponent implements OnInit {
  subjectId: number;
  updateSubject: UpdateInstituteSubject = new UpdateInstituteSubject();
  error: InstituteSubjectResponse = new InstituteSubjectResponse();
  constructor(private subjectManagementService: SubjectManagementService, private loaderService: LoaderService,
    private router: Router, private snackBar: SnackbarService) {
  }

  ngOnInit() {
    var path = location.pathname.split('/');
    this.subjectId = +(path[3]);
    this.getInstituteSubjectDetails();
  }

  getInstituteSubjectDetails() {
    this.loaderService.toggleLoader(true);
    this.subjectManagementService.getInstituteSubjectDetails(this.subjectId).then(res => {
      var response = res.json();
      if (response.message) {
        this.router.navigate(['institute', 'subject', 'list']);
        this.snackBar.showSnackbar(response.message);
      } else {
        this.updateSubject.Code = response.code;
        this.updateSubject.IsGroup = response.isGroup;
        this.updateSubject.Name = response.name;
        this.updateSubject.Description = response.description;
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

  updateInstituteSubject() {
    this.loaderService.toggleLoader(true);
    this.updateSubject.Id = this.subjectId;
    this.subjectManagementService.updateInstituteSubject(this.updateSubject).then(res => {
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
}
