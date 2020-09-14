import { Component, OnInit } from '@angular/core';
import { LoaderService } from '../../../../../shared/loader-service';
import { StudentManagementExamDefinitionService } from '../student-management-examdefinition.service';
import { BaseModelLookUp, LookUpResponse, LookUpResponseType } from '../../../student-management-lookup/student-management-lookup.model';
import { Router } from '@angular/router';
import { SnackbarService } from '../../../../../shared/snackbar-service';

@Component({
  moduleId: module.id,
  templateUrl: 'student-management-examdefinition-add.html'
})
export class AddStudentManagementExamDefinitionComponent implements OnInit {
  baseModel: BaseModelLookUp = new BaseModelLookUp();
  error: LookUpResponse = new LookUpResponse();
  constructor(private studentManagementExamDefinitionService: StudentManagementExamDefinitionService,
    private loaderService: LoaderService, private router: Router, private snackBar: SnackbarService) {
  }

  ngOnInit() {

  }

  addInstituteExamDefinition() {
    this.loaderService.toggleLoader(true);
    this.studentManagementExamDefinitionService.addInstituteExamDefinition(this.baseModel).then(res => {
      var response = res.json();
      if (!response.hasError) {
        this.router.navigate(['student', 'mark', 'examdefinition', 'list']);
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

  hasError(fieldName: string) {
    var id = LookUpResponseType[fieldName];
    if (this.error.ErrorType === id) {
      return this.error.HasError;
    } else {
      return false;
    }
  }

  resetError(fieldName: string) {
    var id = LookUpResponseType[fieldName];
    if (this.error.ErrorType === id) {
      this.error = new LookUpResponse();
    }
  }
}
