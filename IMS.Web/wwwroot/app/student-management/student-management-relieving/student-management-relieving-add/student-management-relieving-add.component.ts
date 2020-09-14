import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { LoaderService } from '../../../../shared/loader-service';
import { Router } from '@angular/router';
import { SnackbarService } from '../../../../shared/snackbar-service';
import { StudentRelievingManagementService } from '../student-management-relieving.service';
import { AddStudentInformationManagementAc } from '../student-management-relieving.model';

@Component({
  moduleId: module.id,
  templateUrl: 'student-management-relieving-add.html'
})
export class AddStudentRelievingManagementComponent implements OnInit {
  classes: any[] = [];
  selectedClass: any = {};
  students: any[] = [];
  reason: string = '';
  relievingDate: Date;
  relievingTypes: string[] = ['Passed Out', 'Transfer', 'Termination'];
  selectedRelievingType: string;
  selectedStudent: any[] = [];
  constructor(private studentManagementService: StudentRelievingManagementService, private loaderService: LoaderService,
    private router: Router, private snackBar: SnackbarService) {
  }

  ngOnInit() {
    this.getAllClasses();
  }

  getAllClasses() {
    this.loaderService.toggleLoader(true);
    this.studentManagementService.getAllClasses().then(res => {
      this.classes = res.json();
      this.loaderService.toggleLoader(false);
    });
  }

  getStudentByClassId() {
    this.loaderService.toggleLoader(true);
    this.studentManagementService.getStudentByClassId(this.selectedClass.id).then(res => {
      this.students = res.json();
      this.loaderService.toggleLoader(false);
    })
  }

  addStudentDetail() {
    this.loaderService.toggleLoader(true);
    var list: AddStudentInformationManagementAc[] = [];
    for (var i = 0; i < this.selectedStudent.length; i++) {
      var data: AddStudentInformationManagementAc = new AddStudentInformationManagementAc();
      data.Reason = this.reason;
      data.RelievingDate = this.convertDateToUtc(this.relievingDate);
      data.StudentId = this.selectedStudent[i];
      data.StudentRelieving = this.selectedRelievingType;
      list.push(data);
    }
    this.studentManagementService.addStudentDetail(list).then(res => {
      var response = res.json();
      if (!response.hasError) {
        this.router.navigate(['student', 'relieving', 'list']);
      }
      this.snackBar.showSnackbar(response.message);
      this.loaderService.toggleLoader(false);
    });
  }

  convertDateToUtc(dateString: any) {
    var date = new Date(dateString);
    return new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()));
  }
}
