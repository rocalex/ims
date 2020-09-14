"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@angular/core");
const user_group_feature_management_service_1 = require("../user-group-feature-management.service");
const loader_service_1 = require("../../../../shared/loader-service");
const router_1 = require("@angular/router");
const snackbar_service_1 = require("../../../../shared/snackbar-service");
const user_group_feature_management_model_1 = require("../user-group-feature-management.model");
let EditAndDetailUserGroupFeatureManagementComponent = class EditAndDetailUserGroupFeatureManagementComponent {
    constructor(userGroupFeatureManagementService, loaderService, router, snackBar) {
        this.userGroupFeatureManagementService = userGroupFeatureManagementService;
        this.loaderService = loaderService;
        this.router = router;
        this.snackBar = snackBar;
        this.userGroupFeatures = [];
        this.features = [];
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
            }
            else {
                this.userGroupFeatures = response;
                for (const parent in user_group_feature_management_model_1.UserGroupFeatureParentEnum) {
                    var parentData = new user_group_feature_management_model_1.UserGroupFeature();
                    parentData.Name = parent;
                    var childrens = this.userGroupFeatures.filter(x => x.userGroupFeatureParentDescription === parent);
                    for (var j = 0; j < childrens.length; j++) {
                        var childData = new user_group_feature_management_model_1.UserGroupFeatureChild();
                        childData.Name = childrens[j].userGroupFeatureChildDescription;
                        childData.Actions = new user_group_feature_management_model_1.Actions();
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
        });
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
        });
    }
};
EditAndDetailUserGroupFeatureManagementComponent = __decorate([
    core_1.Component({
        moduleId: module.id,
        templateUrl: 'user-group-feature-management-edit-detail.html'
    }),
    __metadata("design:paramtypes", [user_group_feature_management_service_1.UserGroupFeatureManagementService, loader_service_1.LoaderService,
        router_1.Router, snackbar_service_1.SnackbarService])
], EditAndDetailUserGroupFeatureManagementComponent);
exports.EditAndDetailUserGroupFeatureManagementComponent = EditAndDetailUserGroupFeatureManagementComponent;
//# sourceMappingURL=user-group-feature-management-edit-detail.component.js.map