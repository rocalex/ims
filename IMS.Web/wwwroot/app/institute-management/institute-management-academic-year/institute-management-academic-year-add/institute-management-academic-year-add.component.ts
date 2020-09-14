import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

// Import services
import { AcademicYearManagementService } from '../institute-management-academic-year.service';
import { SnackbarService } from '../../../../shared/snackbar-service';
import { LoaderService } from '../../../../shared/loader-service';

// Import models
import { AddAcademicYear } from '../institute-management-academic-year.model';

@Component({
    moduleId: module.id,
    templateUrl: 'institute-management-academic-year-add.html'
})
export class AddAcademicYearManagementComponent implements OnInit {

    academicYear: AddAcademicYear = new AddAcademicYear();
    errorMessage: string = '';
    dateExceedError: string = '';

    constructor(private academicYearManagementService: AcademicYearManagementService,
        private snackBar: SnackbarService,
        private router: Router,
        private loader: LoaderService) { }

    ngOnInit() { }

    // Method for adding new academic year
    addAcademicYear() {
        if (this.academicYear.toDate !== null && this.academicYear.toDate !== undefined && this.academicYear.fromDate > this.academicYear.toDate) {
            this.dateExceedError = "Ending date of the academic year can not be less than the Starting date of the academic year";
        }
        else {
          this.loader.toggleLoader(true);
          this.academicYear.fromDate = this.convertDateToUtc(this.academicYear.fromDate);
          this.academicYear.toDate = this.convertDateToUtc(this.academicYear.toDate);
            this.academicYearManagementService.addAcademicYear(this.academicYear)
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
                    console.log(err.json());
                    this.loader.toggleLoader(false);
                });
        }
    }

    checkWhiteSpace(academicYearCodeModel: any, challanStartingNumberModel: any) {
        academicYearCodeModel.whiteSpaceError = '';
        challanStartingNumberModel.whiteSpaceError = '';

        if (this.academicYear.academicYearCode !== null && this.academicYear.academicYearCode !== undefined && this.academicYear.academicYearCode.trim() === '') {
            academicYearCodeModel.whiteSpaceError = 'Academic year code can\'t be null or empty';
        }
        if (this.academicYear.challanStartingNumber !== null && this.academicYear.challanStartingNumber !== undefined && this.academicYear.challanStartingNumber.trim() == '') {
            challanStartingNumberModel.whiteSpaceError = 'Challan starting number can\'t be null or empty';
        }
    }

    resetError(academicYearCodeModel: any, challanStartingNumberModel: any) {

        if (this.dateExceedError !== null && this.dateExceedError !== undefined && this.dateExceedError !== ''
            && this.academicYear.toDate !== null && this.academicYear.toDate !== undefined && this.academicYear.fromDate <= this.academicYear.toDate) {
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
