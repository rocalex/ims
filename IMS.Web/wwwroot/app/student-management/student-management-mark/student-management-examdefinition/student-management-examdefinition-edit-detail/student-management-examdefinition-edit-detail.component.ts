import { Component, OnInit } from '@angular/core';
import { LoaderService } from '../../../../../shared/loader-service';
import { StudentManagementExamDefinitionService } from '../student-management-examdefinition.service';
import { BaseModelLookUp, LookUpResponse, LookUpResponseType } from '../../../student-management-lookup/student-management-lookup.model';
import { Router } from '@angular/router';
import { SnackbarService } from '../../../../../shared/snackbar-service';

@Component({
  moduleId: module.id,
  templateUrl: 'student-management-examdefinition-edit-detail.html'
})
export class EditAndDetailStudentManagementExamDefinitionComponent implements OnInit {
  id: number;
  baseModel: BaseModelLookUp = new BaseModelLookUp();
  error: LookUpResponse = new LookUpResponse();
  constructor(private studentManagementExamDefinitionService: StudentManagementExamDefinitionService,
    private loaderService: LoaderService, private router: Router, private snackBar: SnackbarService) {
  }

  ngOnInit() {
    var path = location.pathname.split('/');
    this.id = +(path[4]);
    this.getInstituteExamDefinitionDetail();
  }

  getInstituteExamDefinitionDetail() {
    this.loaderService.toggleLoader(true);
    this.studentManagementExamDefinitionService.getInstituteExamDefinitionDetail(this.id).then(res => {
      var response = res.json();
      if (response.message) {
        this.snackBar.showSnackbar(response.message);
        this.router.navigate(['student', 'mark', 'examdefinition', 'list']);
      } else {
        this.baseModel.Name = response.name;
        this.baseModel.Code = response.code;
        this.baseModel.Description = response.description;
        this.baseModel.Status = response.status;
      }
      this.loaderService.toggleLoader(false);
    })
  }

  updateInstituteGender() {
    this.loaderService.toggleLoader(true);
    var updateData = {
      Name: this.baseModel.Name, Code: this.baseModel.Code, ExamDefinitionId: this.id,
      Description: this.baseModel.Description, Status: this.baseModel.Status
    }
    this.studentManagementExamDefinitionService.updateInstituteExamDefinition(updateData).then(res => {
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
