import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { StaffManagementService } from '../staff-management-information.service';
import { LoaderService } from '../../../../shared/loader-service';
import { MaritalStatusEnum } from '../staff-management-information.model';
import { SnackbarService } from '../../../../shared/snackbar-service';
import { MatDialog } from '@angular/material';
import { UserGroupFeatureParentEnum, UserGroupFeatureChildEnum } from '../../../../shared/sidenav/sidenav.model';
import { PermissionService } from '../../../../shared/permission.service';

@Component({
  moduleId: module.id,
  templateUrl: 'staff-management-information-list.html'
})
export class ListStaffManagementInformationComponent implements OnInit {
  staffs: any[] = [];
  maritalStatusEnum = MaritalStatusEnum;
  @ViewChild('fileInput') fileInput: ElementRef;
  search: string;
  filteredData: any[] = [];
  genderId: number;
  teachingTypeId: number;
  initialData: any = {};
  constructor(private staffManagementService: StaffManagementService, private loaderService: LoaderService,
    private snackBar: SnackbarService, private dialog: MatDialog, private permissionService: PermissionService) {
  }

  ngOnInit() {
    this.getInitialDataForAddOrEditStaff();
    this.getAllStaffByInsituteId();
  }

  getAllStaffByInsituteId() {
    this.loaderService.toggleLoader(true);
    this.staffManagementService.getAllStaffByInsituteId().then(res => {
      this.staffs = res.json();
      this.filterData();
      this.loaderService.toggleLoader(false);
    })
  }

  archiveStaff(staffId: number) {
    this.loaderService.toggleLoader(true);
    this.staffManagementService.archiveStaff(staffId).then(res => {
      this.snackBar.showSnackbar('Staff archived successfully');
      this.ngOnInit();
      this.loaderService.toggleLoader(false);
    })
  }

  importExcel() {
    var files = this.fileInput.nativeElement.files;
    if (files.length !== 0) {
      this.loaderService.toggleLoader(true);
      const formData = new FormData();
      for (const file of files) {
        formData.append(file.name, file);
      }
      this.staffManagementService.importExcelData(formData).then(res => {
        var response = res.json();
        this.snackBar.showSnackbar(response.message);
        this.ngOnInit();
        this.loaderService.toggleLoader(false);
      });
      this.closeImportDialog();
    }
  }

  openImportDialog(staffImport) {
    this.dialog.open(staffImport);
  }

  closeImportDialog() {
    this.dialog.closeAll();
  }

  downloadFile() {
    window.open('/assets/demo-files/StaffImport.xlsx');
  }

  isAllowed(type: string) {
    return this.permissionService.isAllowed(UserGroupFeatureParentEnum.Staff, UserGroupFeatureChildEnum.StaffInfo, type);
  }

  filterData() {
    this.filteredData = this.staffs;
    if (this.genderId) {
      this.filteredData = this.filteredData.filter(x => x.genderId === this.genderId);
    }
    if (this.teachingTypeId) {
      this.filteredData = this.filteredData.filter(x => x.teachingStaffId === this.teachingTypeId);
    }
    this.dialog.closeAll();
  }

  searchStaff() {
    this.filterData();
    this.filteredData = this.filteredData.filter(x => x.firstName.toLowerCase().startsWith(this.search.toLowerCase()) ||
      x.employeeId.toLowerCase().startsWith(this.search.toLowerCase()));
  }

  openFilter(filter) {
    this.dialog.open(filter);
  }

  closeModal() {
    this.genderId = undefined;
    this.teachingTypeId = undefined;
    this.filterData();
  }

  getInitialDataForAddOrEditStaff() {
    this.loaderService.toggleLoader(true);
    this.staffManagementService.getInitialDataForAddOrEditStaff().then(res => {
      this.initialData = res.json();
      this.loaderService.toggleLoader(false);
    })
  }
}
