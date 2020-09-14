import { Injectable } from '@angular/core';
import { HttpService } from '../../../../core/http.service';

@Injectable()
export class StudentFeeManagementReportService {
  StudentManagementUrl = 'api/feereceiptmanagement';
  constructor(private http: HttpService) { }

  getInitialDataForReports() {
    return this.http.get(this.StudentManagementUrl + '/initialdata/report');
  }
}
