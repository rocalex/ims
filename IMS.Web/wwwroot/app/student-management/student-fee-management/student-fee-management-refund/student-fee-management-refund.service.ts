import { Injectable } from '@angular/core';
import { HttpService } from '../../../../core/http.service';

@Injectable()
export class StudentFeeManagementRefundService {
  FeeRefundManagementUrl = 'api/feerefundmanagement';
  constructor(private http: HttpService) { }

  addFeeRefund(refund: any) {
    return this.http.post(this.FeeRefundManagementUrl, refund);
  }

  getAllFeeRefunds() {
    return this.http.get(this.FeeRefundManagementUrl);
  }

  getFeeRefundById(refundId: number) {
    return this.http.get(this.FeeRefundManagementUrl + '/' + refundId);
  }

  updateFeeRefund(refund: any) {
    return this.http.put(this.FeeRefundManagementUrl, refund);
  }

  getAutoSequenceNumberByTypeAndInstituteId() {
    return this.http.get('api/autosequencegeneratormanagement/generator/Refund Number');
  }

  getInitialData() {
    return this.http.get(this.FeeRefundManagementUrl + '/intitaldata');
  }

  getStudentByClassAndSectionId(classId: number, sectionId: number) {
    return this.http.get(this.FeeRefundManagementUrl + '/searchstudent/' + classId + '/' + sectionId);
  }
}
