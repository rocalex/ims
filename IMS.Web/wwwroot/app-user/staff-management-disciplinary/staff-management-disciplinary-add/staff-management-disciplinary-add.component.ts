import { Component, OnInit } from '@angular/core';
import { StaffDisciplinaryManagementService } from '../staff-management-disciplinary.service';
import { LoaderService } from '../../../shared/loader-service';
import { SnackbarService } from '../../../shared/snackbar-service';
import { Router } from '@angular/router';
import { AddDisciplinaryManagementAc } from '../staff-management-disciplinary.model';

@Component({
  moduleId: module.id,
  templateUrl: 'staff-management-disciplinary-add.html'
})
export class AddStaffDisciplinaryManagementComponent implements OnInit {
  initialData: any = {};
  disciplinary: AddDisciplinaryManagementAc = new AddDisciplinaryManagementAc();
  students: any[] = [];
  isStaff: boolean;
  constructor(private staffDisciplinaryManagementService: StaffDisciplinaryManagementService,
    private loaderService: LoaderService, private snackBar: SnackbarService, private router: Router) {
  }

  ngOnInit() {
    this.isLoggedInUserIsStaff();
  }

  isLoggedInUserIsStaff() {
    this.loaderService.toggleLoader(true);
    this.staffDisciplinaryManagementService.isLoggedInUserIsStaff().then(res => {
      var response = res.json();
      this.isStaff = response.isStaff;
      if (this.isStaff) {
        this.getInitialData();
        this.disciplinary.StaffId = +response.staff.id;
      } else {
        this.getInitialData();
      }
      this.loaderService.toggleLoader(false);
    });
  }

  getInitialData() {
    this.loaderService.toggleLoader(true);
    this.staffDisciplinaryManagementService.getInitialData().then(res => {
      this.initialData = res.json();
      this.disciplinary.StatusId = (this.initialData.statuses.find(x => x.code === 'Open')).id;
      this.loaderService.toggleLoader(false);
    });
  }

  isDisabledClass(classId: number): boolean {
    if (this.disciplinary.StaffId) {
      var staffClasses = this.initialData.classSubjectMapping.filter(x => x.facultyId === this.disciplinary.StaffId
        || x.alternateFacultyId === this.disciplinary.StaffId);
      var classForStaff = staffClasses.find(x => x.classId === classId);
      if (classForStaff) {
        return false;
      } else {
        return true;
      }
    } else {
      return true;
    }
  }

  resetStudent() {
    this.students = [];
  }

  searchStudent() {
    this.students = this.initialData.students.filter(x => x.currentClassId === this.disciplinary.ClassId
      && x.sectionId === this.disciplinary.SectionId);
  }

  isRemarkDisbale() {
    if (this.disciplinary.StatusId) {
      var status = this.initialData.statuses.find(x => x.id === this.disciplinary.StatusId);
      if (status.name === 'Open') {
        return true;
      } else {
        return false;
      }
    } else {
      return false;
    }
  }

  addDisciplinary() {
    this.loaderService.toggleLoader(true);
    this.staffDisciplinaryManagementService.addDisciplinary(this.disciplinary).then(res => {
      var response = res.json();
      if (!response.hasError) {
        this.router.navigate(['disciplinary', 'list']);
      }
      this.snackBar.showSnackbar(response.message);
      this.loaderService.toggleLoader(false);
    });
  }
}
