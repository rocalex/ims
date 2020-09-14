import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { LoaderService } from '../../../../../shared/loader-service';
import { PermissionService } from '../../../../../shared/permission.service';
import { SnackbarService } from '../../../../../shared/snackbar-service';
import { UserGroupFeatureParentEnum, UserGroupFeatureChildEnum } from '../../../../../shared/sidenav/sidenav.model';
import { BedStatusModel } from '../../lookup.model';
import { LookupService } from '../../lookup.service';

@Component({
    moduleId: module.id,
    templateUrl: './edit.component.html'
})
export class BedStatusEditComponent implements OnInit {
    errorMessage: string = '';
    addGroup: BedStatusModel = new BedStatusModel();
    id: number;
    constructor(private loaderService: LoaderService,
        private permissionService: PermissionService,
        private groupService: LookupService,
        private snackBar: SnackbarService,
        private router: Router,
        private activatedRoute: ActivatedRoute
    ) { 
        this.activatedRoute.params.subscribe(param => { this.id = param.id; });
    }

    ngOnInit() {
        this.getBedStatusById();
    }

    getBedStatusById() {
        this.loaderService.toggleLoader(true);
        this.groupService.getBedStatusById(this.id).then(res => {
            let response = res.json();
            if (response.hasError === null || response.hasError === undefined || !response.hasError) {
                this.addGroup = response;
            } else {
                this.snackBar.showSnackbar(response.message);
                this.router.navigate(['hostel', 'lookup', 'bedstatus']);
            }
            this.loaderService.toggleLoader(false);
        }).catch(err => {
            this.loaderService.toggleLoader(false);
        });
    }

    isAllowed(type: string) {
        return this.permissionService.isAllowed(UserGroupFeatureParentEnum.Finance, UserGroupFeatureChildEnum.FinanceBasicReciept, type);
    }

    add() {
        this.loaderService.toggleLoader(true);
        this.groupService.updateBedStatus(this.addGroup).then(res => {
            let response = res.json();
            if (response.hasError === null || response.hasError === undefined || !response.hasError) {
                this.snackBar.showSnackbar(response.message);
                this.router.navigate(['hostel', 'lookup', 'bedstatus']);
            } else {
                this.errorMessage = response.message;
            }
            this.loaderService.toggleLoader(false);
        }).catch(err => {
            this.loaderService.toggleLoader(false);
        });
    }
}
