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
const loader_service_1 = require("../../../../../shared/loader-service");
const student_management_classexam_service_1 = require("../student-management-classexam.service");
const router_1 = require("@angular/router");
const snackbar_service_1 = require("../../../../../shared/snackbar-service");
const student_management_classexam_model_1 = require("../student-management-classexam.model");
const material_1 = require("@angular/material");
let AddStudentManagementClassExamComponent = class AddStudentManagementClassExamComponent {
    constructor(studentManagementClassExamService, dialog, loaderService, router, snackBar) {
        this.studentManagementClassExamService = studentManagementClassExamService;
        this.dialog = dialog;
        this.loaderService = loaderService;
        this.router = router;
        this.snackBar = snackBar;
        this.initialData = {};
        this.addClassExam = new student_management_classexam_model_1.AddClassExamAc();
        this.tempClassExamSubjectMapping = new student_management_classexam_model_1.ClassExamSubjectMappingAc();
        this.id = 1;
        this.subjects = [];
    }
    ngOnInit() {
        this.getInititalData();
    }
    getInititalData() {
        this.loaderService.toggleLoader(true);
        this.studentManagementClassExamService.getInititalData().then(res => {
            this.initialData = res.json();
            this.loaderService.toggleLoader(false);
        });
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
        this.tempClassExamSubjectMapping = new student_management_classexam_model_1.ClassExamSubjectMappingAc();
        this.dialog.closeAll();
    }
    saveModal() {
        var index = this.addClassExam.ClassExamSubjectMappings.findIndex(x => x.DemoId === this.tempClassExamSubjectMapping.DemoId);
        if (index === -1) {
            this.addClassExam.ClassExamSubjectMappings.push(this.tempClassExamSubjectMapping);
        }
        else {
            this.addClassExam.ClassExamSubjectMappings[index] = this.tempClassExamSubjectMapping;
        }
        this.tempClassExamSubjectMapping = new student_management_classexam_model_1.ClassExamSubjectMappingAc();
        this.closeModal();
    }
    editModal(id, addSubjectDialogRef) {
        var index = this.addClassExam.ClassExamSubjectMappings.findIndex(x => x.DemoId === id);
        this.tempClassExamSubjectMapping = this.addClassExam.ClassExamSubjectMappings[index];
        this.openModal(addSubjectDialogRef);
        this.assignSubject();
        var currentSubject = this.initialData.subjects.find(x => x.id === this.tempClassExamSubjectMapping.SubjectId);
        this.subjects.push(currentSubject);
    }
    deleteFromList(id) {
        var index = this.addClassExam.ClassExamSubjectMappings.findIndex(x => x.DemoId === id);
        this.addClassExam.ClassExamSubjectMappings.splice(index, 1);
    }
    checkTime(tempData) {
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
    getSubjectNameById(id) {
        var currentSubject = this.initialData.subjects.find(x => x.id === id);
        return currentSubject.name;
    }
    addDataClassExam() {
        this.loaderService.toggleLoader(true);
        this.studentManagementClassExamService.addClassExam(this.addClassExam).then(res => {
            var response = res.json();
            if (!response.hasError) {
                this.router.navigate(['student', 'mark', 'classexam', 'list']);
            }
            this.snackBar.showSnackbar(response.message);
            this.loaderService.toggleLoader(false);
        });
    }
};
AddStudentManagementClassExamComponent = __decorate([
    core_1.Component({
        moduleId: module.id,
        templateUrl: 'student-management-classexam-add.html'
    }),
    __metadata("design:paramtypes", [student_management_classexam_service_1.StudentManagementClassExamService, material_1.MatDialog,
        loader_service_1.LoaderService, router_1.Router, snackbar_service_1.SnackbarService])
], AddStudentManagementClassExamComponent);
exports.AddStudentManagementClassExamComponent = AddStudentManagementClassExamComponent;
//# sourceMappingURL=student-management-classexam-add.component.js.map