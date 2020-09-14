import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

// Services
import { HolidayOffManagementService } from '../institute-management-holiday-off.service';
import { AcademicYearManagementService } from '../../institute-management-academic-year/institute-management-academic-year.service';
import { LoaderService } from '../../../../shared/loader-service';
import { SnackbarService } from '../../../../shared/snackbar-service';
import { SharedService } from '../../../../shared/shared.service';
import { UserGroupFeatureChildEnum, UserGroupFeatureParentEnum } from '../../../../shared/sidenav/sidenav.model';
import { PermissionService } from '../../../../shared/permission.service';

@Component({
    moduleId: module.id,
    templateUrl: 'institute-management-holiday-off-list.html'
})
export class ListHolidayOffManagementComponent implements OnInit {

    academicYears: any[] = [];
    selectedAcademicYearId: number = 0;
    holidaysList: any[] = [];
    globallySelectedAcademicYear: any = {};
    isEditable: boolean = false;

    constructor(private holidayOffManagementService: HolidayOffManagementService,
        private academicYearManagementService: AcademicYearManagementService,
        private activatedRoute: ActivatedRoute,
        private snackBar: SnackbarService,
        private loaderService: LoaderService,
      private sharedService: SharedService,
      private permissionService: PermissionService) {

        this.activatedRoute.params.subscribe(param => {
            if (param.academicyearid !== null && param.academicyearid !== undefined) {
                this.selectedAcademicYearId = param.academicyearid;
                this.getHolidayssForSelectedAcademicYear();
            }
        });
    }

    ngOnInit() {
        this.sharedService.currentAcademicYear.subscribe(res => {
            setTimeout(() => {
                this.globallySelectedAcademicYear = res;
                if (this.globallySelectedAcademicYear !== null && this.globallySelectedAcademicYear !== undefined) {
                    this.getAcademicYears();
                }
            }, 0);
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

                this.getHolidayssForSelectedAcademicYear();
            })
            .catch((err) => {
                console.log(err.json());
            })
    }

    // Method for fetching the holidays for the selected academic year
    getHolidayssForSelectedAcademicYear() {
        if (this.selectedAcademicYearId !== null && this.selectedAcademicYearId !== undefined && this.selectedAcademicYearId !== 0) {

            this.loaderService.toggleLoader(true);

            this.holidayOffManagementService.getHolidayssForSelectedAcademicYear(this.selectedAcademicYearId)
                .then((res) => {
                    this.holidaysList = res.json();

                    this.loaderService.toggleLoader(false);
                })
                .catch((err) => {
                    console.log(err.json());

                    this.loaderService.toggleLoader(false);
                });
        }
        else {
            this.holidaysList = [];
        }
    }

    // Method for deleting a holiday
    deleteHoliday(holidayId: number) {
        //this.loaderService.toggleLoader(true);
        this.holidayOffManagementService.deleteHoliday(holidayId)
            .then(res => {
                let response = res.json();
                this.loaderService.toggleLoader(false);

                this.snackBar.showSnackbar(response.message);

                this.getHolidayssForSelectedAcademicYear();
            })
            .catch(err => {
                console.log(err.json());
                this.loaderService.toggleLoader(false);
            });
  }

  isAllowed(type: string) {
    return this.permissionService.isAllowed(UserGroupFeatureParentEnum.Administration, UserGroupFeatureChildEnum.InstituteHolidayOff, type);
  }
}
