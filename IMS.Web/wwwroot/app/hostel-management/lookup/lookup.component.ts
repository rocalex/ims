import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PermissionService } from '../../../shared/permission.service';
import { UserGroupFeatureParentEnum, UserGroupFeatureChildEnum } from '../../../shared/sidenav/sidenav.model';

@Component({
  selector: 'app-lookup',
  templateUrl: './lookup.component.html'
})
export class LookupComponent implements OnInit {

  lookupTypes: string[] = ["Room Types", "Bed Status"];
  lookupType: string = "";
  constructor(
    private permissionService: PermissionService,
    private router: Router,
    ) { }

  ngOnInit() {
  }

  redirect(value) {
    if(value == this.lookupTypes[0]) {
      this.router.navigate(['hostel', 'lookup', 'roomtype']);
    } else {
      this.router.navigate(['hostel', 'lookup', 'bedstatus']);
    }
  }

  isAllowed(type: string) {
    return this.permissionService.isAllowed(UserGroupFeatureParentEnum.Finance, UserGroupFeatureChildEnum.FinanceBasicReciept, type);
  }
}
