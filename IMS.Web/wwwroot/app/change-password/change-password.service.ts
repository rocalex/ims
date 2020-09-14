import { Injectable } from '@angular/core';
import { HttpService } from '../../core/http.service';

// Import models
import { ChangePassword } from './change-password.model';

@Injectable()
export class ChangePasswordService {

    PasswordUpdateUrl = 'api/password/update';

    constructor(private http: HttpService) { }

    // Method for updating the password
    changePassword(changePasswordModel: ChangePassword) {
        return this.http.post(this.PasswordUpdateUrl, changePasswordModel);
    }
}
