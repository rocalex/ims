import { Injectable } from '@angular/core';
import { HttpService } from '../../../core/http.service';

@Injectable()
export class UserGroupFeatureManagementService {
  UserGroupManagementUrl = 'api/usergroup/feature';
  constructor(private http: HttpService) { }

  getAllUserGroups() {
    return this.http.get('api/usergroup');
  }

  getUserGroupFeaturesByUserGroupId(userGroupId: number) {
    return this.http.get(this.UserGroupManagementUrl + '/' + userGroupId);
  }

  bulkUpdateUserGroupFeature(userGroupFeatures: any[]) {
    return this.http.put(this.UserGroupManagementUrl, userGroupFeatures);
  }
}
