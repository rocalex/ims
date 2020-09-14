import { Injectable } from '@angular/core';
import { HttpService } from '../../../core/http.service';

import { StudentNotification } from './student-management-notification.model';

@Injectable()
export class StudentManagementNotificationService {

    StudentManagementUrl = 'api/studentmanagement';

    constructor(private http: HttpService) { }

    getStudentDetails(studentId: number) {
        return this.http.get(this.StudentManagementUrl + '/user/' + studentId);
    }

    sendNotification(studentNotificationDetails: StudentNotification) {
        return this.http.post(this.StudentManagementUrl + '/notification/send', studentNotificationDetails);
    }
}
