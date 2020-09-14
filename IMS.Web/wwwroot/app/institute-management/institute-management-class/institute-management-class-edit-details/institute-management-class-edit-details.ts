import { Component, OnInit } from '@angular/core';
import { ClassManagementService } from '../institute-management-class.service';
import { LoaderService } from '../../../../shared/loader-service';
import { Router } from '@angular/router';
import { SnackbarService } from '../../../../shared/snackbar-service';
import { UpdateInstituteClass, InstituteClassDurationUnitEnum, InstituteClassResponse, InstituteClassResponseType } from '../institute-management-class.model';

@Component({
  moduleId: module.id,
  templateUrl: 'institute-management-class-edit-details.html'
})
export class EditDetailsClassManagementComponent implements OnInit {
  classId: number;
  updateClass: UpdateInstituteClass = new UpdateInstituteClass();
  selectedDurationUnit: string;
  durationUnitList: string[] = [InstituteClassDurationUnitEnum[InstituteClassDurationUnitEnum.Days], InstituteClassDurationUnitEnum[InstituteClassDurationUnitEnum.Months],
    InstituteClassDurationUnitEnum[InstituteClassDurationUnitEnum.Weeks], InstituteClassDurationUnitEnum[InstituteClassDurationUnitEnum.Years]];
  error: InstituteClassResponse = new InstituteClassResponse();
  initialdata: any = {};
  constructor(private classManagementService: ClassManagementService, private loaderService: LoaderService,
    private router: Router, private snackBar: SnackbarService) {
  }

  ngOnInit() {
    this.getInitialData();
    var path = location.pathname.split('/');
    this.classId = +(path[3]);
    this.getInstituteClassDetails();
  }

  getInitialData() {
    this.loaderService.toggleLoader(true);
    this.classManagementService.getInitialData().then(res => {
      this.initialdata = res.json();
      this.loaderService.toggleLoader(false);
    });
  }

  getInstituteClassDetails() {
    this.loaderService.toggleLoader(true);
    this.classManagementService.getInstituteClassDetails(this.classId).then(res => {
      var response = res.json();
      if (response.message) {
        this.router.navigate(['institute', 'class', 'list']);
        this.snackBar.showSnackbar(response.message);
      } else {
        this.updateClass.ClassOrder = response.classOrder;
        this.updateClass.Duration = response.duration;
        this.updateClass.DurationUnit = response.durationUnit;
        this.updateClass.GroupCode = response.groupCode;
        this.updateClass.IsGroup = response.isGroup;
        this.updateClass.Name = response.name;
        this.updateClass.NumberOfFeeTerms = response.numberOfFeeTerms;
        this.updateClass.ClassTeacherId = response.classTeacherId;
        this.selectedDurationUnit = InstituteClassDurationUnitEnum[this.updateClass.DurationUnit];
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

  updateInstituteClass() {
    this.loaderService.toggleLoader(true);
    this.updateClass.Id = this.classId;
    this.updateClass.DurationUnit = InstituteClassDurationUnitEnum[this.selectedDurationUnit];
    this.classManagementService.updateInstituteClass(this.updateClass).then(res => {
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
}
