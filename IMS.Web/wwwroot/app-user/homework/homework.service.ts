import { Injectable } from '@angular/core';
import { HttpService } from '../../core/http.service';

@Injectable()
export class HomeworkService {
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

  isLoggedInUserIsStaff() {
    return this.http.get('api/home/isstaff');
  }

  getStudentHomework(date: Date) {
    return this.http.post(this.HomeworkManagementUrl + '/studenthomework', date);
  }
}
