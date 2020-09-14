import { Component, OnInit } from '@angular/core';
import { TemplateManagementService } from './template-management.service';
import { LoaderService } from '../../../shared/loader-service';
import { SnackbarService } from '../../../shared/snackbar-service';
import { GetTemplate, AddTemplate } from './template-management.model';

@Component({
  moduleId: module.id,
  templateUrl: 'template-management.html'
})
export class TemplateManagementComponent implements OnInit {
  initialData: any = {};
  getTemplate: GetTemplate = new GetTemplate();
  addTemplate: AddTemplate = new AddTemplate();
  showData: boolean = false;
  toList: string[] = [];
  formatSearchList: string[] = [];
  constructor(private templateManagementService: TemplateManagementService, private loaderService: LoaderService,
    private snackBar: SnackbarService) {
  }

  ngOnInit() {
    this.showData = false;
    this.getTemplate = new GetTemplate();
    this.addTemplate = new AddTemplate();
    this.getInitialData();
  }

  getInitialData() {
    this.loaderService.toggleLoader(true);
    this.templateManagementService.getInitialData().then(res => {
      this.initialData = res.json();
      this.loaderService.toggleLoader(false);
    })
  }

  getTemplateQuery() {
    this.loaderService.toggleLoader(true);
    this.templateManagementService.getTemplate(this.getTemplate).then(res => {
      var response = res.json();
      this.showData = true;
      if (response) {
        this.addTemplate.EmailBcc = response.emailBcc;
        this.addTemplate.EmailSubject = response.emailSubject;
        this.addTemplate.Format = response.format;
        this.addTemplate.Name = response.name;
        this.addTemplate.TemplateFeatureType = response.templateFeatureType;
        this.addTemplate.TemplateFormat = response.templateFormat;
        this.addTemplate.TemplateType = response.templateType;
        this.addTemplate.To = response.to;
      }
      this.loaderService.toggleLoader(false);
    })
  }

  addOrUpdateTemplate() {
    this.loaderService.toggleLoader(true);
    this.addTemplate.TemplateFeatureType = this.getTemplate.TemplateFeatureType;
    this.addTemplate.TemplateFormat = this.getTemplate.TemplateFormat;
    this.addTemplate.TemplateType = this.getTemplate.TemplateType;
    this.templateManagementService.addOrUpdateTemplate(this.addTemplate).then(res => {
      var response = res.json();
      if (!response.hasError) {
        this.ngOnInit();
      }
      this.snackBar.showSnackbar(response.message);
      this.loaderService.toggleLoader(false);
    })
  }

  isAllowedType(name: string) {
    switch (this.getTemplate.TemplateFeatureType) {
      case 'Student': {
        if (name === 'Student Add' || name === 'Student Edit' || name === 'Student Delete') {
          return true;
        } else {
          return false;
        }
      }
      case 'Staff': {
        if (name === 'Staff Add' || name === 'Staff Edit' || name === 'Staff Delete') {
          return true;
        } else {
          return false;
        }
      }
      case 'All': {
        if (name === 'Change Password' || name === 'Forgot Password') {
          return true;
        } else {
          return false;
        }
      }
      case 'Time Table': {
        if (name === 'Time Table') {
          return true;
        } else {
          return false;
        }
      }
      case 'Homework': {
        if (name === 'Homework Add' || name === 'Homework Edit') {
          return true;
        } else {
          return false;
        }
      }
      case 'Notice': {
        if (name === 'Notice Add' || name === 'Notice Edit') {
          return true;
        } else {
          return false;
        }
      }
      case 'Event': {
        if (name === 'Event Add' || name === 'Event Edit') {
          return true;
        } else {
          return false;
        }
      }
      case 'Fee': {
        if (name === 'Fee Payment Add' || name === 'Fee Payment Reminder') {
          return true;
        } else {
          return false;
        }
      }
      case 'Leave': {
        if (name === 'Staff Leave Add' || name === 'Staff Leave Edit' || name === 'Student Leave Add' || name === 'Student Leave Edit'
          || name === 'Student Leave Approve Reject' || name === 'Staff Leave Approve Reject') {
          return true;
        } else {
          return false;
        }
      }
      default: {
        return false;
      }
    }
  }

  reset() {
    this.showData = false;
    this.addTemplate = new AddTemplate();
    this.setDataForAutoComplete();
  }

  setDataForAutoComplete() {
    this.toList = [];
    this.formatSearchList = [];
    switch (this.getTemplate.TemplateType) {
      case 'Student Add': {
        this.formatSearchList = ['RollNumber', 'AdmissionDate', 'AdmissionNumber', 'AdmissionClass', 'Password',
          'CurrentClass', 'Section', 'CurrentAcademicYear', 'FirstLanguage', 'SecondLanguage', 'FirstName', 'LastName',
          'DateOfBirth', 'Gender', 'FeeChallanNumber', 'FamilyRelationName', 'FamilyRelationMobileNumber',
          'PermanentAddress', 'PermanentCity', 'MobileNumber', 'PresentAddress', 'PresentCity', 'Institute'];
        if (this.getTemplate.TemplateFormat === 'Email') {
          this.toList.push('StudentEmail');
        } else {
          this.toList.push('StudentMobileNumber');
        }
      } break;
      case 'Student Edit': {
        this.formatSearchList = ['RollNumber', 'AdmissionDate', 'AdmissionNumber', 'AdmissionClass', 'CurrentClass', 'Section',
          'CurrentAcademicYear', 'FirstLanguage', 'SecondLanguage', 'FirstName', 'LastName', 'DateOfBirth', 'Gender',
          'FeeChallanNumber', 'FamilyRelationName', 'FamilyRelationMobileNumber', 'PermanentAddress', 'PermanentCity',
          'MobileNumber', 'PresentAddress', 'PresentCity'];
        if (this.getTemplate.TemplateFormat === 'Email') {
          this.toList.push('StudentEmail');
        } else {
          this.toList.push('StudentMobileNumber');
        }
      } break;
      case 'Student Delete': {
        this.formatSearchList = ['RollNumber', 'AdmissionDate', 'AdmissionNumber', 'AdmissionClass',
          'CurrentClass', 'Section', 'CurrentAcademicYear', 'FirstLanguage', 'SecondLanguage', 'FirstName', 'LastName',
          'DateOfBirth', 'Gender', 'FeeChallanNumber', 'FamilyRelationName', 'FamilyRelationMobileNumber',
          'PermanentAddress', 'PermanentCity', 'MobileNumber', 'PresentAddress', 'PresentCity', 'Institute'];
        if (this.getTemplate.TemplateFormat === 'Email') {
          this.toList.push('StudentEmail');
        } else {
          this.toList.push('StudentMobileNumber');
        }
      } break;
      case 'Staff Add': {
        this.formatSearchList = ['EmployeeId', 'FirstName', 'LastName', 'DateOfBirth', 'Gender', 'DateOfJoining','Institute',
          'PermanentAddress', 'PermanentCity', 'MobileNumber', 'PresentAddress', 'PresentCity', 'Email', 'Password'];
        if (this.getTemplate.TemplateFormat === 'Email') {
          this.toList.push('StaffEmail');
        } else {
          this.toList.push('StaffMobileNumber');
        }
      } break;
      case 'Staff Edit': {
        this.formatSearchList = ['EmployeeId', 'FirstName', 'LastName', 'DateOfBirth', 'Gender', 'DateOfJoining',
          'PermanentAddress', 'PermanentCity', 'MobileNumber', 'PresentAddress', 'PresentCity'];
        if (this.getTemplate.TemplateFormat === 'Email') {
          this.toList.push('StaffEmail');
        } else {
          this.toList.push('StaffMobileNumber');
        }
      } break;
      case 'Staff Delete': {
        this.formatSearchList = ['EmployeeId', 'FirstName', 'LastName', 'DateOfBirth', 'Gender', 'DateOfJoining', 'Institute',
          'PermanentAddress', 'PermanentCity', 'MobileNumber', 'PresentAddress', 'PresentCity', 'Email'];
        if (this.getTemplate.TemplateFormat === 'Email') {
          this.toList.push('StaffEmail');
        } else {
          this.toList.push('StaffMobileNumber');
        }
      } break;
      case 'Change Password': {
        this.formatSearchList = ['Name', 'Password'];
        if (this.getTemplate.TemplateFormat === 'Email') {
          this.toList.push('Email');
        } else {
          this.toList.push('MobileNumber');
        }
      } break;
      case 'Forgot Password': {
        this.formatSearchList = ['Name', 'Password'];
        if (this.getTemplate.TemplateFormat === 'Email') {
          this.toList.push('Email');
        } else {
          this.toList.push('MobileNumber');
        }
      } break;
      case 'Time Table': {
        this.formatSearchList = ['Class', 'Section', 'AcademicYear', 'PeriodCount', 'PeriodDuration', 'PeriodStartTime',
          'BreaksCount'];
        if (this.getTemplate.TemplateFormat === 'Email') {
          this.toList = ['StaffEmail', 'StudentEmail'];
        } else {
          this.toList = ['StaffMobileNumber', 'StudentMobileNumber'];
        }
      } break;
      case 'Fee Payment Add': {
        this.formatSearchList = ['ReceiptNumber', 'ReceiptDate', 'Student', 'ReceiptType', 'ChallanNumber',
          'Amount', 'LateFee', 'Total', 'Term'];
        if (this.getTemplate.TemplateFormat === 'Email') {
          this.toList.push('StudentEmail');
        } else {
          this.toList.push('StudentMobileNumber');
        }
      } break;
      case 'Fee Payment Reminder': {
        this.formatSearchList = ['ReceiptNumber', 'ReceiptDate', 'Student', 'ReceiptType', 'ChallanNumber',
          'Amount', 'LateFee', 'Total', 'Term'];
        if (this.getTemplate.TemplateFormat === 'Email') {
          this.toList.push('StudentEmail');
        } else {
          this.toList.push('StudentMobileNumber');
        }
      } break;
      case 'Staff Leave Add': {
        this.formatSearchList = ['Staff', 'FromDate', 'EndDate', 'LeaveType', 'Reason', 'LeaveStatus'];
        if (this.getTemplate.TemplateFormat === 'Email') {
          this.toList.push('AdminEmail');
        } else {
          this.toList.push('AdminMobileNumber');
        }
      } break;
      case 'Staff Leave Edit': {
        this.formatSearchList = ['Staff', 'FromDate', 'EndDate', 'LeaveType', 'Reason', 'LeaveStatus'];
        if (this.getTemplate.TemplateFormat === 'Email') {
          this.toList.push('AdminEmail');
        } else {
          this.toList.push('AdminMobileNumber');
        }
      } break;
      case 'Student Leave Add': {
        this.formatSearchList = ['Student', 'FromDate', 'EndDate', 'LeaveType', 'Reason', 'LeaveStatus'];
        if (this.getTemplate.TemplateFormat === 'Email') {
          this.toList.push('StaffEmail');
        } else {
          this.toList.push('StaffMobileNumber');
        }
      } break;
      case 'Student Leave Edit': {
        this.formatSearchList = ['Student', 'FromDate', 'EndDate', 'LeaveType', 'Reason', 'LeaveStatus'];
        if (this.getTemplate.TemplateFormat === 'Email') {
          this.toList.push('StaffEmail');
        } else {
          this.toList.push('StaffMobileNumber');
        }
      } break;
      case 'Student Leave Approve Reject': {
        this.formatSearchList = ['Student', 'FromDate', 'EndDate', 'LeaveType', 'Reason', 'LeaveStatus', 'ApproveOrRejectedBy'];
        if (this.getTemplate.TemplateFormat === 'Email') {
          this.toList.push('StudentEmail');
        } else {
          this.toList.push('StudentMobileNumber');
        }
      } break;
      case 'Staff Leave Approve Reject': {
        this.formatSearchList = ['Staff', 'FromDate', 'EndDate', 'LeaveType', 'Reason', 'LeaveStatus', 'ApproveOrRejectedBy'];
        if (this.getTemplate.TemplateFormat === 'Email') {
          this.toList.push('StaffEmail');
        } else {
          this.toList.push('StaffMobileNumber');
        }
      } break;
      default: {
        this.formatSearchList = [];
      } break;
    }
  }
}