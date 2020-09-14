import { Injectable } from '@angular/core';
import { HttpService } from '../../../core/http.service';

@Injectable()
export class EmailConfigurationManagementService {

    EmailConfigurationManagementUrl = 'api/emailconfigurationmanagement';

    constructor(private http: HttpService) { }

    addEmailConfiguration(department: any) {
        return this.http.post(this.EmailConfigurationManagementUrl, department);
    }

    getAllEmailConfigurations() {
        return this.http.get(this.EmailConfigurationManagementUrl);
    }

    getEmailConfigurationDetail(emailConfigurationId: number) {
        return this.http.get(this.EmailConfigurationManagementUrl + '/' + emailConfigurationId);
    }

    updateEmailConfiguration(emailConfiguration: any) {
        return this.http.put(this.EmailConfigurationManagementUrl + '/' + emailConfiguration.id, emailConfiguration);
    }
}
