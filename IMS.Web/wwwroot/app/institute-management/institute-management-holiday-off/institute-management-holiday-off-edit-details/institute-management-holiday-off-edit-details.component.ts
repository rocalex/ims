import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

// Import services
import { HolidayOffManagementService } from '../institute-management-holiday-off.service';
import { SnackbarService } from '../../../../shared/snackbar-service';
import { LoaderService } from '../../../../shared/loader-service';

// Import models
import { AddHoliday } from '../institute-management-holiday-off.model';

@Component({
    moduleId: module.id,
    templateUrl: 'institute-management-holiday-off-edit-details.html'
})
export class EditDetailsHolidayOffManagementComponent implements OnInit {

    holidayId: number;
    occuranceTypesList: any[] = [];
    holiday: AddHoliday = new AddHoliday();
    academicYear: any = {};
    isEditable: boolean = false;
    dateExceedError: string = '';
    
    constructor(private holidayOffManagementService: HolidayOffManagementService,
        private snackBar: SnackbarService,
        private router: Router,
        private activatedRoute: ActivatedRoute,
        private loader: LoaderService) {

        this.activatedRoute.params.subscribe(param => this.holidayId = param.id);
    }

    ngOnInit() {
        this.getHolidayDetails();
    }

    // Method for fetching the details of the holiday
    getHolidayDetails() {

        this.loader.toggleLoader(true);
        this.holidayOffManagementService.getHolidayDetails(this.holidayId)
            .then((res) => {
                let response = res.json();
                this.holiday = response.holiday;
                this.occuranceTypesList = response.occuranceTypesList;
                this.academicYear = response.academicYear;
                this.isEditable = this.academicYear.isActive;
                this.loader.toggleLoader(false);
            })
            .catch((err) => {
                console.log(err.json());
                this.loader.toggleLoader(false);
            })
    }

    // Method for updating holiday
    updateHoliday() {
        if (this.holiday.toDate !== null && this.holiday.toDate !== undefined && new Date(this.holiday.fromDate) > new Date(this.holiday.toDate)) {
            this.dateExceedError = "Ending date of the holiday can not be less than the Starting date of the holiday";
        }
        else {
            this.loader.toggleLoader(true);
            this.holidayOffManagementService.updateHoliday(this.holiday)
                .then((res) => {
                    let response = res.json();

                    this.snackBar.showSnackbar(response.message);
                    if (response.hasError === null || response.hasError === undefined || !response.hasError) {
                        this.router.navigate(['institute', 'holiday', 'list', this.holiday.academicYearId]);
                    }

                    this.loader.toggleLoader(false);
                })
                .catch((err) => {
                    console.log(err.json());
                    this.loader.toggleLoader(false);
                });
        }
    }

    // Method for resetting the error messages
    resetError() {
        if (this.dateExceedError !== null && this.dateExceedError !== undefined && this.dateExceedError !== ''
            && this.holiday.toDate !== null && this.holiday.toDate !== undefined
            && new Date(this.holiday.fromDate) <= new Date(this.holiday.toDate)) {
            this.dateExceedError = '';
        }
    }
}
