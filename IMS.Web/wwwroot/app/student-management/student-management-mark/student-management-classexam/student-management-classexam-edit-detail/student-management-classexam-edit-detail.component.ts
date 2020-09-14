import { Component, OnInit } from '@angular/core';
import { LoaderService } from '../../../../../shared/loader-service';
import { StudentManagementClassExamService } from '../student-management-classexam.service';
import { Router, ActivatedRoute } from '@angular/router';
import { SnackbarService } from '../../../../../shared/snackbar-service';
import { AddClassExamAc, ClassExamSubjectMappingAc } from '../student-management-classexam.model';
import { MatDialog } from '@angular/material';

@Component({
  moduleId: module.id,
  templateUrl: 'student-management-classexam-edit-detail.html'
})
export class EditAndDetailStudentManagementClassExamComponent implements OnInit {
  initialData: any = {};
  addClassExam: AddClassExamAc = new AddClassExamAc();
  tempClassExamSubjectMapping: ClassExamSubjectMappingAc = new ClassExamSubjectMappingAc();
  id: number = 1;
  subjects: any[] = [];
  classExamId: number;
  constructor(private studentManagementClassExamService: StudentManagementClassExamService, private dialog: MatDialog,
    private loaderService: LoaderService, private router: Router, private snackBar: SnackbarService,
    private activeRoute: ActivatedRoute) {
  }

  ngOnInit() {
    this.activeRoute.params.subscribe(res => this.classExamId = res.id);
    this.getClassExams();
    this.getInititalData();
  }

  getClassExams() {
    this.loaderService.toggleLoader(true);
    this.studentManagementClassExamService.getClassExams(this.classExamId).then(res => {
      var response = res.json();
      if (response.message) {
        this.router.navigate(['student', 'mark', 'classexam', 'list']);
        this.snackBar.showSnackbar(response.message);
      } else {
        this.addClassExam.ClassId = response.classId;
        this.addClassExam.SectionId = response.sectionId;
        this.addClassExam.ExamId = response.examId;
        this.addClassExam.TotalAttendanceDays = response.totalAttendanceDays;
        this.addClassExam.ClassExamSubjectMappings = [];
        for (var i = 0; i < response.classExamSubjectMappings.length; i++) {
          var subject = response.classExamSubjectMappings[i];
          var classExamSubjectMappings = new ClassExamSubjectMappingAc();
          classExamSubjectMappings.Content = subject.content;
          classExamSubjectMappings.DemoId = this.id;
          classExamSubjectMappings.EndTime = subject.endTime;
          classExamSubjectMappings.MaxScore = subject.maxScore;
          classExamSubjectMappings.MinScore = subject.minScore;
          classExamSubjectMappings.Remark = subject.remark;
          classExamSubjectMappings.StartDate = subject.startDate;
          classExamSubjectMappings.StartTime = subject.startTime;
          classExamSubjectMappings.SubjectId = subject.subjectId;
          this.addClassExam.ClassExamSubjectMappings.push(classExamSubjectMappings);
          this.id++;
        }
      }
      this.loaderService.toggleLoader(false);
    });
  }

  getInititalData() {
    this.loaderService.toggleLoader(true);
    this.studentManagementClassExamService.getInititalData().then(res => {
      this.initialData = res.json();
      this.loaderService.toggleLoader(false);
    })
  }

  addList(addSubjectDialogRef) {
    this.assignSubject();
    this.tempClassExamSubjectMapping.DemoId = this.id;
    this.id++;
    this.openModal(addSubjectDialogRef);
  }

  openModal(addSubjectDialogRef) {
    this.dialog.open(addSubjectDialogRef, { width: '1000px' });
  }

  closeModal() {
    this.dialog.closeAll();
  }

  saveModal() {
    var index = this.addClassExam.ClassExamSubjectMappings.findIndex(x => x.DemoId === this.tempClassExamSubjectMapping.DemoId);
    if (index === -1) {
      this.addClassExam.ClassExamSubjectMappings.push(this.tempClassExamSubjectMapping);
    } else {
      this.addClassExam.ClassExamSubjectMappings[index] = this.tempClassExamSubjectMapping;
    }
    this.tempClassExamSubjectMapping = new ClassExamSubjectMappingAc();
    this.closeModal();
  }

  editModal(id: number, addSubjectDialogRef) {
    var index = this.addClassExam.ClassExamSubjectMappings.findIndex(x => x.DemoId === id);
    this.tempClassExamSubjectMapping = this.addClassExam.ClassExamSubjectMappings[index];
    this.openModal(addSubjectDialogRef);
    this.assignSubject();
    var currentSubject = this.initialData.subjects.find(x => x.id === this.tempClassExamSubjectMapping.SubjectId);
    this.subjects.push(currentSubject);
  }

  deleteFromList(id: number) {
    var index = this.addClassExam.ClassExamSubjectMappings.findIndex(x => x.DemoId === id);
    this.addClassExam.ClassExamSubjectMappings.splice(index, 1);
  }

  checkTime(tempData: ClassExamSubjectMappingAc) {
    if (tempData.EndTime < tempData.StartTime) {
      tempData.EndTime = tempData.StartTime;
    }
  }

  assignSubject() {
    this.subjects = [];
    for (var i = 0; i < this.initialData.subjects.length; i++) {
      var subject = this.initialData.subjects[i];
      var index = this.addClassExam.ClassExamSubjectMappings.findIndex(x => x.SubjectId === subject.id);
      if (index === -1) {
        this.subjects.push(subject);
      }
    }
  }

  getSubjectNameById(id: number) {
    if (this.initialData.subjects) {
      var currentSubject = this.initialData.subjects.find(x => x.id === id);
      return currentSubject.name;
    }
  }

  updateClassExam() {
    this.loaderService.toggleLoader(true);
    this.addClassExam.ClassExamId = this.classExamId;
    this.studentManagementClassExamService.updateClassExam(this.addClassExam).then(res => {
      var response = res.json();
      if (!response.hasError) {
        this.router.navigate(['student', 'mark', 'classexam', 'list']);
      }
      this.snackBar.showSnackbar(response.message);
      this.loaderService.toggleLoader(false);
    });
  }
}
