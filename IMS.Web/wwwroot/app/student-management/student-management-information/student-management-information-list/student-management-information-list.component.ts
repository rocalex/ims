import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { LoaderService } from '../../../../shared/loader-service';
import { SnackbarService } from '../../../../shared/snackbar-service';
import { StudentManagementService } from '../student-management-information.service';
import { MatDialog } from '@angular/material';
import { UserGroupFeatureParentEnum, UserGroupFeatureChildEnum } from '../../../../shared/sidenav/sidenav.model';
import { PermissionService } from '../../../../shared/permission.service';

@Component({
  moduleId: module.id,
  templateUrl: 'student-management-information-list.html'
})
export class ListStudentInformationManagementComponent implements OnInit {
  students: any[] = [];
  initialData: any = {};
  selectedClass: any = {};
  section: any = {};
  filteredData: any[] = [];
  search: string = '';
  classId: number;
  @ViewChild('fileInput') fileInput: ElementRef;
  constructor(private studentManagementService: StudentManagementService,
    private location: Location,
    private router: Router, private activatedRoute: ActivatedRoute,
    private loaderService: LoaderService, private permissionService: PermissionService,
    private snackbarService: SnackbarService, private dialog: MatDialog) {
      this.activatedRoute.params.subscribe(param => this.classId = param.id);
  }

  ngOnInit() {
    this.getInititalData();
    this.getAllStudentByInsituteId();
  }

  getAllStudentByInsituteId() {
    this.loaderService.toggleLoader(true);
    this.studentManagementService.getAllStudentByInsituteId(this.classId).then(res => {
      this.students = res.json();
      this.filterData();
      this.loaderService.toggleLoader(false);
    })
  }

  backPage() {
    this.location.back();
  }

  archiveStudent(studentId: number) {
    this.loaderService.toggleLoader(true);
    this.studentManagementService.archiveStudent(studentId)
      .then(res => {
        this.snackbarService.showSnackbar(res.json().message);
        this.loaderService.toggleLoader(false);
        this.ngOnInit();
      })
      .catch(err => {
        this.loaderService.toggleLoader(false);
      });
  }

  markActiveAndInActiveStudent(studentId: number) {
    this.loaderService.toggleLoader(true);
    this.studentManagementService.markActiveAndInActiveStudent(studentId).then(res => {
      this.ngOnInit();
      this.loaderService.toggleLoader(false);
    })
  }

  getInititalData() {
    this.loaderService.toggleLoader(true);
    this.studentManagementService.getInititalData().then(res => {
      this.initialData = res.json();
      this.loaderService.toggleLoader(false);
    })
  }

  openFilter(filterStudent) {
    this.dialog.open(filterStudent);
  }

  closeModal() {
    this.selectedClass = {};
    this.section = {};
    this.filterData();
  }

  filterData() {
    this.filteredData = this.students;
    if (this.selectedClass.id) {
      this.filteredData = this.filteredData.filter(x => x.currentClassId === this.selectedClass.id);
    }
    if (this.section.id) {
      this.filteredData = this.filteredData.filter(x => x.sectionId === this.section.id);
    }
    this.dialog.closeAll();
  }

  searchStudent() {
    this.filterData();
    this.filteredData = this.filteredData.filter(x => x.firstName.toLowerCase().startsWith(this.search.toLowerCase()) ||
      x.rollNumber.toLowerCase().startsWith(this.search.toLowerCase()));
  }

  importExcel() {
    var files = this.fileInput.nativeElement.files;
    if (files.length !== 0) {
      this.loaderService.toggleLoader(true);
      const formData = new FormData();
      for (const file of files) {
        formData.append(file.name, file);
      }
      this.studentManagementService.importExcelData(formData).then(res => {
        var response = res.json();
        this.snackbarService.showSnackbar(response.message);
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
    window.open('/assets/demo-files/StudentImport.xlsx');
  }

  isAllowed(type: string) {
    return this.permissionService.isAllowed(UserGroupFeatureParentEnum.Student, UserGroupFeatureChildEnum.StudentInfo, type);
  }
}
