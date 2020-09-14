import { Component, OnInit } from '@angular/core';
import { UserGroupFeatureManagementService } from '../user-group-feature-management.service';
import { LoaderService } from '../../../../shared/loader-service';
import { Router } from '@angular/router';
import { SnackbarService } from '../../../../shared/snackbar-service';
import { UserGroupFeature, UserGroupFeatureParentEnum, UserGroupFeatureChild, Actions } from '../user-group-feature-management.model';

@Component({
  moduleId: module.id,
  templateUrl: 'user-group-feature-management-edit-detail.html'
})
export class EditAndDetailUserGroupFeatureManagementComponent implements OnInit {
  userGroupId: number;
  userGroupFeatures: any[] = [];
  features: UserGroupFeature[] = [];
  constructor(private userGroupFeatureManagementService: UserGroupFeatureManagementService, private loaderService: LoaderService,
    private router: Router, private snackBar: SnackbarService) {
  }

  ngOnInit() {
    var path = location.pathname.split('/');
    this.userGroupId = +(path[3]);
    this.getUserGroupFeaturesByUserGroupId();
  }

  getUserGroupFeaturesByUserGroupId() {
    this.loaderService.toggleLoader(true);
    this.userGroupFeatureManagementService.getUserGroupFeaturesByUserGroupId(this.userGroupId).then(res => {
      var response = res.json();
      if (response.message) {
        this.router.navigate(['usermanagement', 'permission', 'list']);
        this.snackBar.showSnackbar(response.message);
      } else {
        this.userGroupFeatures = response;
        for (const parent in UserGroupFeatureParentEnum) {
          var parentData: UserGroupFeature = new UserGroupFeature();
          parentData.Name = parent;
          var childrens = this.userGroupFeatures.filter(x => x.userGroupFeatureParentDescription === parent);
          for (var j = 0; j < childrens.length; j++) {
            var childData: UserGroupFeatureChild = new UserGroupFeatureChild();
            childData.Name = childrens[j].userGroupFeatureChildDescription;
            childData.Actions = new Actions();
            childData.Actions.CanAdd = childrens[j].canAdd;
            childData.Actions.CanDelete = childrens[j].canDelete;
            childData.Actions.CanEdit = childrens[j].canEdit;
            childData.Actions.CanView = childrens[j].canView;
            parentData.Child.push(childData);
          }
          this.features.push(parentData);
        }
      }
      this.loaderService.toggleLoader(false);
    })
  }

  bulkUpdateUserGroupFeature() {
    this.loaderService.toggleLoader(true);
    for (var i = 0; i < this.features.length; i++) {
      var childrens = this.features[i].Child;
      for (var j = 0; j < childrens.length; j++) {
        var child = this.userGroupFeatures.find(x => x.userGroupFeatureParentDescription === this.features[i].Name
          && x.userGroupFeatureChildDescription === childrens[j].Name);
        child.canAdd = childrens[j].Actions.CanAdd;
        child.canEdit = childrens[j].Actions.CanEdit;
        child.canView = childrens[j].Actions.CanView;
        child.canDelete = childrens[j].Actions.CanDelete;
      }
    }
    this.userGroupFeatureManagementService.bulkUpdateUserGroupFeature(this.userGroupFeatures).then(res => {
      this.router.navigate(['usermanagement', 'permission', 'list']);
      this.snackBar.showSnackbar('Updated Successfully');
      this.loaderService.toggleLoader(false);
    })
  }
}
