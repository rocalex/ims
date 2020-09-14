"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@angular/core");
const student_management_mark_examscoreentry_service_1 = require("./student-management-mark-examscoreentry.service");
const loader_service_1 = require("../../../../shared/loader-service");
const router_1 = require("@angular/router");
const snackbar_service_1 = require("../../../../shared/snackbar-service");
let StudentManagementExamScoreEntryComponent = class StudentManagementExamScoreEntryComponent {
    constructor(studentManagementExamScoreEntryService, loaderService, router, snackBar) {
        this.studentManagementExamScoreEntryService = studentManagementExamScoreEntryService;
        this.loaderService = loaderService;
        this.router = router;
        this.snackBar = snackBar;
        this.initialData = {};
        this.classExams = [];
        this.class = {};
        this.section = {};
        this.exam = {};
        this.scores = [];
        this.students = [];
        this.tempData = [];
        this.grades = [
            { name: 'F', minScore: 0, maxScore: 10 }, { name: 'D', minScore: 11, maxScore: 20 }, { name: 'C', minScore: 21, maxScore: 30 },
            { name: 'C+', minScore: 31, maxScore: 40 }, { name: 'B', minScore: 41, maxScore: 50 }, { name: 'B+', minScore: 51, maxScore: 60 },
            { name: 'B++', minScore: 61, maxScore: 70 }, { name: 'A', minScore: 71, maxScore: 80 }, { name: 'A+', minScore: 81, maxScore: 90 },
            { name: 'A++', minScore: 91, maxScore: 100 }
        ];
        this.reportTypes = ['Marks', 'Letter'];
        this.selectedType = this.reportTypes[0];
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
        var list = [];
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
    getTotal(data) {
        var total = 0;
        for (var i = 0; i < this.initialData.subjects.length; i++) {
            var value = data[this.initialData.subjects[i].id];
            if (!isNaN(value)) {
                total += value;
            }
        }
        return total;
    }
    getGradeByMark(mark) {
        mark = Math.ceil(mark);
        var grade = this.grades.find(x => x.minScore <= mark && x.maxScore >= mark);
        if (grade) {
            return grade.name;
        }
        else {
            return '';
        }
    }
    assignValueByGrade(studentData, subjectId, gradeName) {
        var grade = this.grades.find(x => x.name === gradeName);
        var sum = grade.minScore + grade.maxScore;
        sum = sum / 2;
        studentData[subjectId] = Math.ceil(sum);
    }
};
StudentManagementExamScoreEntryComponent = __decorate([
    core_1.Component({
        moduleId: module.id,
        templateUrl: 'student-management-mark-examscoreentry.html'
    }),
    __metadata("design:paramtypes", [student_management_mark_examscoreentry_service_1.StudentManagementExamScoreEntryService,
        loader_service_1.LoaderService, router_1.Router, snackbar_service_1.SnackbarService])
], StudentManagementExamScoreEntryComponent);
exports.StudentManagementExamScoreEntryComponent = StudentManagementExamScoreEntryComponent;
//# sourceMappingURL=student-management-mark-examscoreentry.component.js.map