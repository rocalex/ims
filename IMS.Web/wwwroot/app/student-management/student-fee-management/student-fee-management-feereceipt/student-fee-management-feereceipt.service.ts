import { Injectable } from '@angular/core';
import { HttpService } from '../../../../core/http.service';

@Injectable()
export class StudentFeeManagementFeeReceiptService {
  FeeReceiptManagementUrl = 'api/feereceiptmanagement';
  constructor(private http: HttpService) { }

  getInitialData() {
    return this.http.get(this.FeeReceiptManagementUrl + '/initialdata');
  }

  getStudentByClassReligionAndSectionId(classId: number, sectionId: number, religionId?: number) {
    return this.http.get(this.FeeReceiptManagementUrl + '/searchstudent/' + classId + '/' + sectionId + '/' + religionId);
  }

  getFeeComponent(classId: number, religionId?: number) {
    return this.http.get(this.FeeReceiptManagementUrl + '/searchcomponent/' + classId + '/' + religionId);
  }

  getStudentFees(studentIds: number[]) {
    return this.http.post(this.FeeReceiptManagementUrl + '/studentfeecomponent', studentIds);
  }

  addFeeReceipt(receipts: any[]) {
    return this.http.post(this.FeeReceiptManagementUrl, receipts);
  }

  getAllFeeReceipts() {
    return this.http.get(this.FeeReceiptManagementUrl);
  }

  getFeeReceiptsById(receiptId: number) {
    return this.http.get(this.FeeReceiptManagementUrl + '/' + receiptId);
  }

  getAutoSequenceNumberByTypeAndInstituteId(count: number) {
    return this.http.get(this.FeeReceiptManagementUrl + '/generator/' + count);
  }

  updateFeeReceipt(receipts: any) {
    return this.http.put(this.FeeReceiptManagementUrl, receipts);
  }
}
