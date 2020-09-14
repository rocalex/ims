import { Injectable } from '@angular/core';
import { HttpService } from '../../../core/http.service';

@Injectable()
export class StaffManagementService {
  StaffManagementUrl = 'api/staffmanagement';
  constructor(private http: HttpService) { }

  addStaffDetail(designation: any) {
    return this.http.post(this.StaffManagementUrl, designation);
  }

  getAllStaffByInsituteId() {
    return this.http.get(this.StaffManagementUrl);
  }

  getStaffDetail(staffId: number) {
    return this.http.get(this.StaffManagementUrl + '/' + staffId);
  }

  getInitialDataForAddOrEditStaff() {
    return this.http.get(this.StaffManagementUrl + '/bundle');
  }

  updateStaff(designation: any) {
    return this.http.put(this.StaffManagementUrl, designation);
  }

  addOrUpdateStaffImage(staffId: number, formData: FormData) {
    return this.http.postForFormData(this.StaffManagementUrl + '/image/' + staffId, formData);
  }

  archiveStaff(staffId: number) {
    return this.http.delete(this.StaffManagementUrl + '/' + staffId);
  }

  addOrUpdateStaffGallery(staffId: number, formData: FormData) {
    return this.http.postForFormData(this.StaffManagementUrl + '/gallery/' + staffId, formData);
  }

  getAutoSequenceNumberByTypeAndInstituteId() {
    return this.http.get('api/autosequencegeneratormanagement/generator/Employee Id');
  }

  importExcelData(formData: FormData) {
    return this.http.postForFormData(this.StaffManagementUrl + '/import', formData);
  }

  addOrUpdateStaffDocument(staffId: number, formData: FormData) {
    return this.http.postForFormData(this.StaffManagementUrl + '/document/' + staffId, formData);
  }

  updateDocumentData(updateDocumentData: any[], staffId: number) {
    return this.http.put(this.StaffManagementUrl + '/documentdata/' + staffId, updateDocumentData);
  }
}
