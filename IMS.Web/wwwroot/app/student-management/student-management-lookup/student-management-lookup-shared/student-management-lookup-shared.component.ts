import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import * as LookupModel from '../student-management-lookup.model';
import { UserGroupFeatureParentEnum, UserGroupFeatureChildEnum } from '../../../../shared/sidenav/sidenav.model';
import { PermissionService } from '../../../../shared/permission.service';

@Component({
    moduleId: module.id,
    selector: 'look-up-shared',
    templateUrl: 'student-management-lookup-shared.html'
})
export class StudentManagementLookUpSharedComponent implements OnInit {
    lookUps: LookupModel.LookUpModel[] = LookupModel.Lookups();
    selected: LookupModel.LookUpModel = new LookupModel.LookUpModel();
    @Input() lookUpData: LookupModel.BaseModelLookUp = new LookupModel.BaseModelLookUp();
    @Output() saveChanges: EventEmitter<any> = new EventEmitter<any>();
  @Input() error: LookupModel.LookUpResponse = new LookupModel.LookUpResponse();
  constructor(private router: Router) {
    }

    ngOnInit() {
        var path = location.pathname.split('/');
        if (path[3]) {
            this.selected = this.lookUps.find(x => x.Url === path[3]);
        }
    }

    checkWhiteSpace(nameModel: any, name: string) {
        if (name) {
            if (name.trim() === '') {
                nameModel.whiteSpaceError = true;
            } else {
                nameModel.whiteSpaceError = false;
            }
        }
    }

    hasError(fieldName: string) {
        var id = LookupModel.LookUpResponseType[fieldName];
        if (this.error.ErrorType === id) {
            return this.error.HasError;
        } else {
            return false;
        }
    }

    resetError(fieldName: string) {
        var id = LookupModel.LookUpResponseType[fieldName];
        if (this.error.ErrorType === id) {
            this.error = new LookupModel.LookUpResponse();
        }
    }

    add() {
        this.saveChanges.emit(this.lookUpData);
  }
}

@Component({
    moduleId: module.id,
    selector: 'look-up-shared-list',
    templateUrl: 'student-management-lookup-shared-list.html'
})
export class StudentManagementLookUpSharedListComponent implements OnInit {
  lookUps: LookupModel.LookUpModel[] = LookupModel.Lookups();
  selected: LookupModel.LookUpModel = new LookupModel.LookUpModel();
  @Input() list: any[] = [];
  constructor(private router: Router, private permissionService: PermissionService) {
  }

  ngOnInit() {
    var path = location.pathname.split('/');
    if (path[3]) {
      this.selected = this.lookUps.find(x => x.Url === path[3]);
    }
  }

  isAllowed(type: string) {
    return this.permissionService.isAllowed(UserGroupFeatureParentEnum.Student, UserGroupFeatureChildEnum.StudentLookUp, 'Edit');
  }
}
