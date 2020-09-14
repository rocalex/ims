import { Component, OnInit } from '@angular/core';

import { LoaderService } from '../../../../../shared/loader-service';
import { FeeComponentManagementService } from '../student-management-fee-component.service';
import { FeeComponentTypeEnum, FeeComponent } from '../../student-fee-management.model';
import { UserGroupFeatureParentEnum, UserGroupFeatureChildEnum } from '../../../../../shared/sidenav/sidenav.model';
import { PermissionService } from '../../../../../shared/permission.service';

@Component({
    moduleId: module.id,
    templateUrl: 'student-management-fee-component-list.html'
})
export class ListFeeComponentManagementComponent implements OnInit {

    feeComponentsList: FeeComponent[] = [];
    feeComponentTypeEnumDetails: any[] = [
        { key: FeeComponentTypeEnum.ApplicableToAll, value: 'Applicable To All' },
        { key: FeeComponentTypeEnum.Deduction, value: 'Deduction' },
        { key: FeeComponentTypeEnum.Individual, value: 'Individual' },
        { key: FeeComponentTypeEnum.SpecialFee, value: 'Special Fee' }
    ];

  constructor(private loaderService: LoaderService, private permissionService: PermissionService,
        private feeComponentManagementService: FeeComponentManagementService) { }

    ngOnInit() {
        this.getAllFeeComponentsList();
    }

    getAllFeeComponentsList() {
        this.loaderService.toggleLoader(true);
        this.feeComponentManagementService.getAllFeeComponents()
            .then(res => {
                this.feeComponentsList = res.json();
                this.feeComponentsList.forEach(feeComponent => {
                    feeComponent.feeComponentTypeString = this.feeComponentTypeEnumDetails.filter(x => x.key == feeComponent.feeComponentType)[0].value;
                });

                this.loaderService.toggleLoader(false);
            })
            .catch(err => {
                this.loaderService.toggleLoader(false);
            });
  }

  isAllowed(type: string) {
    return this.permissionService.isAllowed(UserGroupFeatureParentEnum.Student, UserGroupFeatureChildEnum.StudentFeeComponent, type);
  }
}
