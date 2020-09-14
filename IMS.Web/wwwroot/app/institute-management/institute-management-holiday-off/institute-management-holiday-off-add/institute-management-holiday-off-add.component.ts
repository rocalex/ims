import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

// Import services
import { HolidayOffManagementService } from '../institute-management-holiday-off.service';
import { SnackbarService } from '../../../../shared/snackbar-service';
import { LoaderService } from '../../../../shared/loader-service';

// Import models
import { AddHoliday } from '../institute-management-holiday-off.model';

@Component({
    moduleId: module.id,
    templateUrl: 'institute-management-holiday-off-add.html'
})
export class AddHolidayOffManagementComponent implements OnInit {

    academicYearId: number;
    occuranceTypesList: any[] = [];
    holiday: AddHoliday = new AddHoliday();
    academicYear: any = {};
    isEditable: boolean = false;
    dateExceedError: string = '';

    constructor(private holidayOffManagementService: HolidayOffManagementService,
        private snackBar: SnackbarService,
        private activatedRoute: ActivatedRoute,
        private router: Router,
        private loader: LoaderService) {

        this.activatedRoute.params.subscribe(param => this.academicYearId = param.academicyearid);
    }

    ngOnInit() {
        if (this.academicYearId == 0) {
            this.snackBar.showSnackbar('Please select academic year');
            this.router.navigate(['institute', 'holiday', 'list']);
        }
        else {
            this.getHolidayOccuranceTypesList();
        }
    }

    // Method for fetching the list of holiday occurance types
    getHolidayOccuranceTypesList() {
        this.holidayOffManagementService.getHolidayOccuranceTypesList(this.academicYearId)
            .then((res) => {
                let response = res.json();
                this.occuranceTypesList = response.occuranceTypesList;
                this.academicYear = response.academicYear;
                this.isEditable = this.academicYear.isActive;
            })
            .catch((err) => {
                console.log(err.json());
            });
    }

    // Method for adding new holiday
    addNewHoliday() {
        if (this.holiday.toDate !== null && this.holiday.toDate !== undefined && new Date(this.holiday.fromDate) > new Date(this.holiday.toDate)) {
            this.dateExceedError = "Ending date of the holiday can not be less than the Starting date of the holiday";
        }
        else {
            this.loader.toggleLoader(true);
            this.holiday.academicYearId = this.academicYearId;

            this.holidayOffManagementService.addHoliday(this.holiday)
                .then((res) => {
                    let response = res.json();

                    this.snackBar.showSnackbar(response.message);
                    if (response.hasError === null || response.hasError === undefined || !response.hasError) {
                        this.router.navigate(['institute', 'holiday', 'list', this.academicYearId]);
                    }

                    this.loader.toggleLoader(false);
                })
                .catch((err) => {
                    this.loader.toggleLoader(false);
                    console.log(err.json());
                });
        }
    }

    // Method for resetting the error messages
    resetError() {
        if (this.dateExceedError !== null && this.dateExceedError !== undefined && this.dateExceedError !== ''
            && new Date(this.holiday.fromDate) <= new Date(this.holiday.toDate)) {
            this.dateExceedError = '';
        }
    }
}
