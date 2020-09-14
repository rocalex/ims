import { Injectable } from '@angular/core';
import { HttpService } from '../../core/http.service';

// Import models
import { UserProfile } from './user-profile.model';

@Injectable()
export class UserProfileService {

    UserProfileManagementUrl = 'api/usermanagement/profile';

    constructor(private http: HttpService) { }

    // Method for fetching the profile details of the currently logged in user
    getLoggedInUserProfileDetails() {
        return this.http.get(this.UserProfileManagementUrl);
    }

    // Method for updating logged in user's profile details
    updateLoggedInUserProfileDetails(updatedLoggedInUser: UserProfile) {
        return this.http.put(this.UserProfileManagementUrl + '/update', updatedLoggedInUser);
    }
}
