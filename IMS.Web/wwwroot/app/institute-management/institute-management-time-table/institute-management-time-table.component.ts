import { Component, OnInit } from '@angular/core';

import { LoaderService } from '../../../shared/loader-service';
import { TimeTableManagementService } from './institute-management-time-table.service';

@Component({
    moduleId: module.id,
    templateUrl: 'institute-management-time-table.html'
})
export class TimeTableManagementComponent implements OnInit {

    classSectionsList: any[] = [];

    constructor(private loaderService: LoaderService,
        private timeTableManagementService: TimeTableManagementService) { }

    ngOnInit() {
        this.getClassList();
    }

    // Method for fetching the classes list
    getClassList() {
        this.loaderService.toggleLoader(true);
        this.timeTableManagementService.getClassSectionsList()
            .then(res => {
                this.classSectionsList = res.json();
                
                this.loaderService.toggleLoader(false);
            })
            .catch(err => {
                this.loaderService.toggleLoader(false);
            });
    }
}
