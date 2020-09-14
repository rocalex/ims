import { Injectable } from '@angular/core';
import { HttpService } from '../../../../core/http.service';

@Injectable()
export class StaffManagementHomeworkService {
    HomeworkManagementUrl = 'api/homeworkmanagement';
    constructor(private http: HttpService) { }

    addOrUpdateHomework(homeWork: any) {
        return this.http.post(this.HomeworkManagementUrl, homeWork);
    }

    getHomework(getHomework: any) {
        return this.http.post(this.HomeworkManagementUrl + '/search', getHomework);
    }

    getInitialData() {
        return this.http.get(this.HomeworkManagementUrl + '/initialdata');
    }

    sendMessage(homeWorkMessage: any) {
        return this.http.post(this.HomeworkManagementUrl + '/message', homeWorkMessage);
    }

    sendMail(homeworkMail: any) {
        return this.http.post(this.HomeworkManagementUrl + '/mail', homeworkMail);
    }

    getAllHomeworks() {
        return this.http.get(this.HomeworkManagementUrl + '/all');
    }
}
