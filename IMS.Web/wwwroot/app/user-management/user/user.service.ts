import { Injectable } from '@angular/core';
import { HttpService } from '../../../core/http.service';

// Import models
import { AddUser } from './user.model';

@Injectable()
export class UserService {

    UserUrl = 'api/usermanagement';

    constructor(private http: HttpService) { }

    // Method for fetching the list of all user groups
    getAllUsers() {
        return this.http.get(this.UserUrl);
    }

    // Method for fetching the list of all institutes and user groups
    getInstitutesAndUserGroupsList() {
        return this.http.get(this.UserUrl + '/institutes/usergroups/all');
    }

    // Method for fetching a particular user by id
    getUserById(userId: string) {
        return this.http.get(this.UserUrl + "/" + userId);
    }

    // Method for adding new user group
    addUser(user: AddUser) {
        return this.http.post(this.UserUrl, user);
    }

    // Method for updating user group
    updateUser(user) {
        return this.http.put(this.UserUrl + '/' + user.id, user);
    }
}
