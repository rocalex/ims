import { Component, OnInit } from '@angular/core';
import { StudentManagementExamScoreEntryService } from './student-management-mark-examscoreentry.service';
import { LoaderService } from '../../../../shared/loader-service';
import { Router } from '@angular/router';
import { SnackbarService } from '../../../../shared/snackbar-service';

@Component({
  moduleId: module.id,
  templateUrl: 'student-management-mark-examscoreentry.html'
})
export class StudentManagementExamScoreEntryComponent implements OnInit {
  initialData: any = {};
  classExams: any[] = [];
  class: any = {};
  section: any = {};
  exam: any = {};
  scores: any[] = [];
  students: any[] = [];
  tempData: any[] = [];
  grades: any[] = [
    { name: 'F', minScore: 0, maxScore: 10 }, { name: 'D', minScore: 11, maxScore: 20 }, { name: 'C', minScore: 21, maxScore: 30 },
    { name: 'C+', minScore: 31, maxScore: 40 }, { name: 'B', minScore: 41, maxScore: 50 }, { name: 'B+', minScore: 51, maxScore: 60 },
    { name: 'B++', minScore: 61, maxScore: 70 }, { name: 'A', minScore: 71, maxScore: 80 }, { name: 'A+', minScore: 81, maxScore: 90 },
    { name: 'A++', minScore: 91, maxScore: 100 }
  ];
  reportTypes: string[] = ['Marks', 'Letter'];
  selectedType: string = this.reportTypes[0];
  constructor(private studentManagementExamScoreEntryService: StudentManagementExamScoreEntryService,
    private loaderService: LoaderService, private router: Router, private snackBar: SnackbarService) {
  }

  ngOnInit() {
    this.class = {};
    this.section = {};
    this.exam = {};
    this.classExams = [];
    this.getInititalData();
  }

  getInititalData() {
    this.loaderService.toggleLoader(true);
    this.studentManagementExamScoreEntryService.getInititalData().then(res => {
      this.initialData = res.json();
      this.loaderService.toggleLoader(false);
    });
  }

  getClassExamByClassAndSectionId() {
    this.loaderService.toggleLoader(true);
    this.studentManagementExamScoreEntryService.getClassExamByClassAndSectionId(this.class.id, this.section.id).then(res => {
      this.classExams = res.json();
      if (!this.classExams.length) {
        this.snackBar.showSnackbar('No exam record found for selected class and section');
      }
      this.loaderService.toggleLoader(false);
    });
    this.getStudentByClassAndSectionId();
  }

  getExamScoreEntries() {
    this.loaderService.toggleLoader(true);
    this.studentManagementExamScoreEntryService.getExamScoreEntries(this.exam.id).then(res => {
      this.scores = res.json();
      for (var i = 0; i < this.scores.length; i++) {
        var score = this.scores[i];
        var data = this.tempData.find(x => x.Student.id === score.studentId);
        data[score.subjectId] = score.mark;
      }
      this.loaderService.toggleLoader(false);
    });
  }

  resetExam() {
    this.classExams = [];
  }

  getStudentByClassAndSectionId() {
    this.tempData = [];
    this.loaderService.toggleLoader(true);
    this.studentManagementExamScoreEntryService.getStudentByClassAndSectionId(this.class.id, this.section.id).then(res => {
      this.students = res.json();
      for (var i = 0; i < this.students.length; i++) {
        var data = { Student: this.students[i] };
        for (var j = 0; j < this.initialData.subjects.length; j++) {
          data[this.initialData.subjects[j].id] = 0;
        }
        this.tempData.push(data);
      }
      this.loaderService.toggleLoader(false);
    });
  }

  addOrUpdateExamScoreEntry() {
    this.loaderService.toggleLoader(true);
    var list: any[] = [];
    for (var j = 0; j < this.students.length; j++) {
      for (var i = 0; i < this.initialData.subjects.length; i++) {
        var mark = this.tempData.find(x => x.Student.id === this.students[j].id);
        var data = { SubjectId: this.initialData.subjects[i].id, ExamId: this.exam.id, StudentId: this.students[j].id, Mark: 0 };
        data.Mark = mark[this.initialData.subjects[i].id];
        list.push(data);
      }
    }
    this.studentManagementExamScoreEntryService.addOrUpdateExamScoreEntry(list).then(res => {
      var response = res.json();
      if (!response.hasError) {
        this.router.navigate(['student', 'mark', 'examscoreentry']);
      }
      this.snackBar.showSnackbar(response.message);
      this.ngOnInit();
      this.loaderService.toggleLoader(false);
    });
  }

  getTotal(data: any) {
    var total = 0;
    for (var i = 0; i < this.initialData.subjects.length; i++) {
      var value: number = data[this.initialData.subjects[i].id];
      if (!isNaN(value)) {
        total += value;
      }
    }
    return total;
  }

  getGradeByMark(mark: number): string {
    mark = Math.ceil(mark);
    var grade = this.grades.find(x => x.minScore <= mark && x.maxScore >= mark);
    if (grade) {
      return grade.name;
    } else {
      return '';
    }
  }

  assignValueByGrade(studentData: any, subjectId: number, gradeName: string) {
    var grade = this.grades.find(x => x.name === gradeName);
    var sum = grade.minScore + grade.maxScore;
    sum = sum / 2;
    studentData[subjectId] = Math.ceil(sum);
  }
}
