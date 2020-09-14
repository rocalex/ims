import { Component, OnInit } from '@angular/core';
import { LoaderService } from '../../../shared/loader-service';
import { StudentManagementInActiveService } from './student-management-inactive.service';

@Component({
  moduleId: module.id,
  templateUrl: 'student-management-inactive.html'
})
export class StudentManagementInActiveComponent implements OnInit {
  students: any[] = [];
  constructor(private studentManagementService: StudentManagementInActiveService, private loaderService: LoaderService) {
  }

  ngOnInit() {
    this.getAllStudentByInsituteId();
  }

  getAllStudentByInsituteId() {
    this.loaderService.toggleLoader(true);
    this.studentManagementService.getAllInActiveStudentByInsituteId().then(res => {
      this.students = res.json();
      this.loaderService.toggleLoader(false);
    })
  }

  markActiveAndInActiveStudent(studentId: number) {
    this.loaderService.toggleLoader(true);
    this.studentManagementService.markActiveAndInActiveStudent(studentId).then(res => {
      this.ngOnInit();
      this.loaderService.toggleLoader(false);
    })
  }
}
