import { Component, OnInit } from '@angular/core';
import { AddInstituteClass, InstituteClassDurationUnitEnum, InstituteClassResponse, InstituteClassResponseType } from '../institute-management-class.model';
import { ClassManagementService } from '../institute-management-class.service';
import { LoaderService } from '../../../../shared/loader-service';
import { Router } from '@angular/router';
import { SnackbarService } from '../../../../shared/snackbar-service';

@Component({
  moduleId: module.id,
  templateUrl: 'institute-management-class-add.html'
})
export class AddClassManagementComponent implements OnInit {
  addClass: AddInstituteClass = new AddInstituteClass();
  durationUnitList: string[] = [InstituteClassDurationUnitEnum[InstituteClassDurationUnitEnum.Days], InstituteClassDurationUnitEnum[InstituteClassDurationUnitEnum.Months],
  InstituteClassDurationUnitEnum[InstituteClassDurationUnitEnum.Weeks], InstituteClassDurationUnitEnum[InstituteClassDurationUnitEnum.Years]];
  selectedDurationUnit: string = '';
  error: InstituteClassResponse = new InstituteClassResponse();
  initialdata: any = {};
  constructor(private classManagementService: ClassManagementService, private loaderService: LoaderService,
    private router: Router, private snackBar: SnackbarService) { }

  ngOnInit() {
    this.getInitialData();
  }

  getInitialData() {
    this.loaderService.toggleLoader(true);
    this.classManagementService.getInitialData().then(res => {
      this.initialdata = res.json();
      this.loaderService.toggleLoader(false);
    });
  }

  addInstituteClass() {
    this.loaderService.toggleLoader(true);
    this.addClass.DurationUnit = InstituteClassDurationUnitEnum[this.selectedDurationUnit];
    this.classManagementService.addInstituteClass(this.addClass).then(res => {
      var response = res.json();
      if (!response.hasError) {
        this.router.navigate(['institute', 'class', 'list']);
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
    var id = InstituteClassResponseType[fieldName];
    if (this.error.ErrorType === id) {
      return this.error.HasError;
    } else {
      return false;
    }
  }

  resetError(fieldName: string) {
    var id = InstituteClassResponseType[fieldName];
    if (this.error.ErrorType === id) {
      this.error = new InstituteClassResponse();
    }
  }
}
