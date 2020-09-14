import { Component, OnInit } from '@angular/core';

// Services
import { WeekOffManagementService } from '../institute-management-week-off.service';
import { AcademicYearManagementService } from '../../institute-management-academic-year/institute-management-academic-year.service';
import { LoaderService } from '../../../../shared/loader-service';
import { SnackbarService } from '../../../../shared/snackbar-service';
import { SharedService } from '../../../../shared/shared.service';

@Component({
    moduleId: module.id,
    templateUrl: 'institute-management-week-off-list-edit.html'
})
export class ListEditWeekOffManagementComponent implements OnInit {

    academicYears: any[] = [];
    selectedAcademicYearId: number = 0;
    weekOffsList: any[] = [];
    updatedWeekOffList: any[] = [];
    globallySelectedAcademicYear: any = {};
    isEditable: boolean = false;

    constructor(private weekOffManagementService: WeekOffManagementService,
        private academicYearManagementService: AcademicYearManagementService,
        private loaderService: LoaderService,
        private snackBar: SnackbarService,
        private sharedService: SharedService) { }

    ngOnInit() {
        this.sharedService.currentAcademicYear.subscribe(res => {
            this.globallySelectedAcademicYear = res;
            if (this.globallySelectedAcademicYear !== null && this.globallySelectedAcademicYear !== undefined) {
                this.getAcademicYears();
            }
        });
    }

    // Method for fetching the list of all active academic years
    getAcademicYears() {
        this.academicYearManagementService.getInstituteAcademicYearsList()
            .then((res) => {
                this.academicYears = res.json();
                let activeAcademicYear = this.academicYears.filter(x => x.isActive)[0];
                
                if (activeAcademicYear !== null && activeAcademicYear !== undefined && activeAcademicYear.id === this.globallySelectedAcademicYear.id) {
                    this.isEditable = true;
                    this.selectedAcademicYearId = activeAcademicYear.id;
                }
                else {
                    this.isEditable = false;
                    this.selectedAcademicYearId = this.globallySelectedAcademicYear.id;
                }
                
                this.getWeekOffsForSelectedAcademicYear();
            })
            .catch((err) => {
                console.log(err.json());
            })
    }

    // Method for fetching the week offs for the selected academic year
    getWeekOffsForSelectedAcademicYear() {
        if (this.selectedAcademicYearId !== 0) {
            this.updatedWeekOffList = [];
            this.loaderService.toggleLoader(true);

            this.weekOffManagementService.getWeekOffsForSelectedAcademicYear(this.selectedAcademicYearId)
                .then((res) => {
                    let result = res.json();

                    this.weekOffsList = result;

                    this.loaderService.toggleLoader(false);
                })
                .catch((err) => {
                    console.log(err.json());
                    this.loaderService.toggleLoader(false);
                })
        }
        else {
            this.weekOffsList = [];
        }
    }

    // Method for getting the updated entries
    setWeekOff(weekOff: any) {
        weekOff.isUpdated = (weekOff.isUpdated === null || weekOff.isUpdated === undefined) ? true : !weekOff.isUpdated;
        this.updatedWeekOffList.push(weekOff);
        this.updatedWeekOffList = this.updatedWeekOffList.filter(x => x.isUpdated);
    }

    // Method for bulk updating the week offs
    bulkUpdateWeekOffs() {
        this.weekOffManagementService.bulkUpdateWeekOffs(this.updatedWeekOffList)
            .then((res) => {
                this.snackBar.showSnackbar(res.json().message);
                this.getWeekOffsForSelectedAcademicYear();
            })
            .catch((err) => {
                this.getWeekOffsForSelectedAcademicYear();
                console.log(err.json());
            });
    }
}
