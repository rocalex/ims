import { Injectable } from '@angular/core';
import { HttpService } from '../../../core/http.service';

// Import models
import { AddUserGroup } from './user-group-management.model';

@Injectable()
export class UserGroupManagementService {

    UserGroupManagementUrl = 'api/usergroup';

    constructor(private http: HttpService) { }

    // Method for fetching the list of all user groups
    getAllUserGroups() {
        return this.http.get(this.UserGroupManagementUrl);
    }

    // Method for fetching a particular user by id
    getUserGroupById(id: number) {
        return this.http.get(this.UserGroupManagementUrl + '/' + id);
    }

    // Method for adding new user group
    addUserGroup(userGroup: AddUserGroup) {
        return this.http.post(this.UserGroupManagementUrl, userGroup);
    }

    // Method for updating user group
    updateUserGroup(userGroup: any) {
        return this.http.put(this.UserGroupManagementUrl + '/' + userGroup.id, userGroup);
    }
}
