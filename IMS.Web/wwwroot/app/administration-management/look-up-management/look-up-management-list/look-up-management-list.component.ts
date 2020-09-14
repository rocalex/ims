import { Component, OnInit } from '@angular/core';
import { LookUpManagementService } from '../look-up-management.service';
import { LoaderService } from '../../../../shared/loader-service';

@Component({
    moduleId: module.id,
    templateUrl: 'look-up-management-list.html'
})
export class ListLookUpManagementComponent implements OnInit {
    lookUps: any[] = [];
    constructor(private lookUpManagementService: LookUpManagementService, private loaderService: LoaderService) {
    }

    ngOnInit() {
        this.getAllLookUpMapping();
    }

    getAllLookUpMapping() {
        this.loaderService.toggleLoader(true);
        this.lookUpManagementService.getAllLookUpMapping().then(res => {
            this.lookUps = res.json();
            this.loaderService.toggleLoader(false);
        })
    }
}
