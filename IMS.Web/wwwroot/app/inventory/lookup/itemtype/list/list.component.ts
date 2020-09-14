import { Component, OnInit } from '@angular/core';
import { LoaderService } from '../../../../../shared/loader-service';
import { SnackbarService } from '../../../../../shared/snackbar-service';
import { PermissionService } from '../../../../../shared/permission.service';
import { UserGroupFeatureParentEnum, UserGroupFeatureChildEnum } from '../../../../../shared/sidenav/sidenav.model';
import { ItemTypeModel } from '../itemtype.model';
import { ItemTypeService } from '../itemtype.service';

@Component({
    moduleId: module.id,
    templateUrl: './list.component.html'
})
export class ListComponent implements OnInit {

    list: ItemTypeModel[] = [];
    constructor(
        private loaderService: LoaderService,
        private snackbar: SnackbarService,
        private permissionService: PermissionService,
        private apiService: ItemTypeService
    ) { }

    ngOnInit() {
        this.getIssueBookList();
    }

    getIssueBookList() {
        this.loaderService.toggleLoader(true);
        this.apiService.getIssueBooksForLoggedInUser().then(res => {
            let response = res.json();
            if (response.hasError === null || response.hasError === undefined || !response.hasError) {
                this.list = response;
            }
            else {
                this.snackbar.showSnackbar(response.message);
            }
            this.loaderService.toggleLoader(false);
        }).catch(error => {
            this.snackbar.showSnackbar(error.message);
            this.loaderService.toggleLoader(false);
        });
    }

    fullName(staff) {
        return staff.firstName + ' ' + (staff.middleName ? staff.middleName : '') + ' ' + staff.lastName;
    }

    isAllowed(type: string) {
        return this.permissionService.isAllowed(UserGroupFeatureParentEnum.Finance, UserGroupFeatureChildEnum.FinanceBasicReciept, type);
    }
}
