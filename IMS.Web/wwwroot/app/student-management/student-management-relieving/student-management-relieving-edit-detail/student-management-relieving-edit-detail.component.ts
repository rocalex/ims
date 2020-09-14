import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { LoaderService } from '../../../../shared/loader-service';
import { Router, ActivatedRoute } from '@angular/router';
import { SnackbarService } from '../../../../shared/snackbar-service';
import { StudentRelievingManagementService } from '../student-management-relieving.service';
import { UpdateStudentInformationManagementAc } from '../student-management-relieving.model';

@Component({
  moduleId: module.id,
  templateUrl: 'student-management-relieving-edit-detail.html'
})
export class EditAndDetailStudentRelievingManagementComponent implements OnInit {
  relievingId: number;
  student: any = {};
  relievingTypes: string[] = ['Passed Out', 'Transfer', 'Termination'];
  constructor(private studentManagementService: StudentRelievingManagementService, private loaderService: LoaderService,
    private router: Router, private snackBar: SnackbarService, private activeRoute: ActivatedRoute) {
  }

  ngOnInit() {
    this.activeRoute.params.subscribe(res => this.relievingId = +(res.id));
    this.getStudentDetail();
  }

  getStudentDetail() {
    this.loaderService.toggleLoader(true);
    this.studentManagementService.getStudentDetail(this.relievingId).then(res => {
      this.student = res.json();
      this.loaderService.toggleLoader(false);
    });
  }

  updateStudent() {
    this.loaderService.toggleLoader(true);
    var studentDetail: UpdateStudentInformationManagementAc = new UpdateStudentInformationManagementAc();
    studentDetail.Id = this.relievingId;
    studentDetail.Reason = this.student.reason;
    studentDetail.RelievingDate = this.convertDateToUtc(this.student.relievingDate);
    studentDetail.StudentId = this.student.studentId;
    studentDetail.StudentRelieving = this.student.studentRelievingDescription;
    this.studentManagementService.updateStudent(studentDetail).then(res => {
      var response = res.json();
      if (!response.hasError) {
        this.router.navigate(['student', 'relieving', 'list']);
      }
      this.snackBar.showSnackbar(response.message);
      this.loaderService.toggleLoader(false);
    })
  }

  convertDateToUtc(dateString: any) {
    var date = new Date(dateString);
    return new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()));
  }
}
