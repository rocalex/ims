import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

// Import services
import { AcademicYearManagementService } from '../institute-management-academic-year.service';
import { SnackbarService } from '../../../../shared/snackbar-service';
import { LoaderService } from '../../../../shared/loader-service';

// Import models
import { AddAcademicYear } from '../institute-management-academic-year.model';

@Component({
  moduleId: module.id,
  templateUrl: 'institute-management-academic-year-edit-details.html'
})
export class EditDetailsAcademicYearManagementComponent implements OnInit {

  academicYear: AddAcademicYear = new AddAcademicYear();
  academicYearId: number;
  errorMessage: string = '';
  dateExceedError: string = '';

  constructor(private academicYearManagementService: AcademicYearManagementService,
    private snackBar: SnackbarService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private loader: LoaderService) {

    this.activatedRoute.params.subscribe(param => this.academicYearId = param.id);
  }

  ngOnInit() {
    this.getAcademicYearDetails();
  }

  // Method for fetching the details of the selected academic year
  getAcademicYearDetails() {
    this.loader.toggleLoader(true);

    this.academicYearManagementService.getAcademicYearDetails(this.academicYearId)
      .then((res) => {
        let response = res.json();

        if (response.hasError !== null && response.hasError !== undefined && response.hasError) {
          this.snackBar.showSnackbar(response.message);
          this.router.navigate(['institute', 'academicyear', 'list']);
        }

        this.academicYear = response;

        this.loader.toggleLoader(false);
      })
      .catch((err) => {
        console.log(err.json());
        this.loader.toggleLoader(false);
      });
  }

  // Method for updating the details of the academic year
  updateAcademicYear() {
    if (this.academicYear.toDate !== null && this.academicYear.toDate !== undefined && new Date(this.academicYear.fromDate) > new Date(this.academicYear.toDate)) {
      this.dateExceedError = "Ending date of the academic year can not be less than the Starting date of the academic year";
    }
    else {
      this.loader.toggleLoader(true);
      this.academicYear.fromDate = this.convertDateToUtc(this.academicYear.fromDate);
      this.academicYear.toDate = this.convertDateToUtc(this.academicYear.toDate);
      this.academicYearManagementService.updateAcademicYear(this.academicYear)
        .then((res) => {
          let response = res.json();

          if (response.hasError === null || response.hasError === undefined || !response.hasError) {
            this.snackBar.showSnackbar(response.message);
            this.router.navigate(['institute', 'academicyear', 'list']);
          }
          else {
            this.errorMessage = response.message;
          }

          this.loader.toggleLoader(false);
        })
        .catch((err) => {
          this.loader.toggleLoader(false);
        })
    }
  }

  checkWhiteSpace(academicYearCodeModel: any, challanStartingNumberModel: any) {
    academicYearCodeModel.whiteSpaceError = '';
    challanStartingNumberModel.whiteSpaceError = '';

    if (this.academicYear.academicYearCode.trim() === '') {
      academicYearCodeModel.whiteSpaceError = 'Academic year code can\'t be null or empty';
    }
    if (this.academicYear.challanStartingNumber.trim() == '') {
      challanStartingNumberModel.whiteSpaceError = 'Challan starting number can\'t be null or empty';
    }
  }

  resetError(academicYearCodeModel: any, challanStartingNumberModel: any) {

    if (this.dateExceedError !== null && this.dateExceedError !== undefined && this.dateExceedError !== ''
      && this.academicYear.toDate !== null && this.academicYear.toDate !== undefined && new Date(this.academicYear.fromDate) <= new Date(this.academicYear.toDate)) {
      this.dateExceedError = '';
    }

    if (this.academicYear.academicYearCode !== null && this.academicYear.academicYearCode !== undefined && this.academicYear.academicYearCode.trim() !== '') {
      academicYearCodeModel.whiteSpaceError = '';
    }

    if (this.academicYear.challanStartingNumber !== null && this.academicYear.challanStartingNumber !== undefined && this.academicYear.challanStartingNumber.trim() !== '') {
      challanStartingNumberModel.whiteSpaceError = '';
    }

    this.errorMessage = '';
  }

  convertDateToUtc(dateString: any) {
    var date = new Date(dateString);
    return new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()));
  }
}
