import { Component, OnInit } from '@angular/core';
import { StaffManagementHomeworkService } from './staff-management-homework.service';
import { LoaderService } from '../../../../shared/loader-service';
import { SnackbarService } from '../../../../shared/snackbar-service';
import { AddHomeworkManagementAc, AddHomeworkSubjectMappingAc, HomeworkMailMapping, HomeworkMessageMapping } from './staff-management-homework.model';
import { MatDialog } from '@angular/material';

@Component({
  moduleId: module.id,
  templateUrl: 'staff-management-homework.html'
})
export class StaffManagementHomeworkComponent implements OnInit {
  initialData: any = {};
  homeWork: AddHomeworkManagementAc = new AddHomeworkManagementAc();
  sendOption: string[] = ['Message', 'Mail'];
  selectedOption: string;
  mail: HomeworkMailMapping = new HomeworkMailMapping();
  message: HomeworkMessageMapping = new HomeworkMessageMapping();
  students: any[] = [];
  otherNumber: string;
  homeWorkId: number;
  constructor(private staffManagementHomeworkService: StaffManagementHomeworkService, private loaderService: LoaderService,
    private snackBar: SnackbarService, private dialog: MatDialog) {
  }

  ngOnInit() {
    this.getInitialData();
  }

  getInitialData() {
    this.loaderService.toggleLoader(true);
    this.staffManagementHomeworkService.getInitialData().then(res => {
      this.initialData = res.json();
      this.loaderService.toggleLoader(false);
    })
  }

  getHomework() {
    this.loaderService.toggleLoader(true);
    var getHomework = {
      StaffId: this.homeWork.StaffId, ClassId: this.homeWork.ClassId,
      Date: this.convertDateToUtc(this.homeWork.HomeworkDate), SectionId: this.homeWork.SectionId
    };
    this.staffManagementHomeworkService.getHomework(getHomework).then(res => {
      var response = res.json();
      var staffClasses = this.initialData.classSubjectMapping.filter(x => x.facultyId === this.homeWork.StaffId
        || x.alternateFacultyId === this.homeWork.StaffId);
      var subjects = staffClasses.map(x => x.subjectId);
      subjects = this.distinct(subjects);
      this.homeWork.HomeworkSubjectMappings = [];
      for (var i = 0; i < subjects.length; i++) {
        var subjectHomeWork: AddHomeworkSubjectMappingAc = new AddHomeworkSubjectMappingAc();
        subjectHomeWork.IsSelected = false;
        subjectHomeWork.SubjectId = subjects[i];
        subjectHomeWork.Subject = this.initialData.subjects.find(x => x.id === subjects[i]);
        this.homeWork.HomeworkSubjectMappings.push(subjectHomeWork);
      }
      this.students = this.initialData.students.filter(x => x.currentClassId === this.homeWork.ClassId &&
        x.sectionId === this.homeWork.SectionId);
      if (response) {
        this.homeWorkId = response.id;
        for (var i = 0; i < response.homeworkSubjectMappings.length; i++) {
          var data = response.homeworkSubjectMappings[i];
          var subject = this.homeWork.HomeworkSubjectMappings.find(x => x.SubjectId === data.subjectId);
          if (subject) {
            subject.HomeworkData = data.homeworkData;
          }
        }
      }
      this.loaderService.toggleLoader(false);
    })
  }

  distinct(arr: any[]) {
    var unique = arr.filter(function (elem, index, self) {
      return index === self.indexOf(elem);
    })
    return unique;
  }

  addOrUpdateHomework() {
    this.loaderService.toggleLoader(true);
    this.homeWork.HomeworkDate = this.convertDateToUtc(this.homeWork.HomeworkDate);
    this.homeWork.HomeworkSubjectMappings = this.homeWork.HomeworkSubjectMappings.filter(x => x.IsSelected == true);
    this.staffManagementHomeworkService.addOrUpdateHomework(this.homeWork).then(res => {
      var response = res.json();
      if (response.hasError) {
        this.snackBar.showSnackbar(response.message);
      } else {
        this.homeWorkId = response.data.id;
        this.mail.HomeworkId = response.data.id;
        this.message.HomeworkId = response.data.id;
        this.snackBar.showSnackbar(response.message);
      }
      this.loaderService.toggleLoader(false);
    })
  }

  isDisabledClass(classId: number): boolean {
    if (this.homeWork.StaffId) {
      var staffClasses = this.initialData.classSubjectMapping.filter(x => x.facultyId === this.homeWork.StaffId
        || x.alternateFacultyId === this.homeWork.StaffId);
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

  closePop() {
    this.dialog.closeAll();
  }

  openSendOptionPopup(element) {
    this.selectedOption = this.sendOption[0];
    this.message.Message = this.generateMessage();
    this.mail.Message = this.generateMessage();
    this.mail.Subject = 'Homework - ' + (this.homeWork.HomeworkDate).toDateString();
    this.dialog.open(element);
  }

  generateMessage() {
    var messageData = '';
    var selected = this.homeWork.HomeworkSubjectMappings.filter(x => x.IsSelected === true);
    for (var i = 0; i < selected.length; i++) {
      messageData += selected[i].HomeworkData;
      if (i !== (selected.length - 1)) {
        messageData += ','
      } else {
        messageData += '.'
      }
    }
    return messageData;
  }

  resetHomework() {
    this.homeWork.HomeworkSubjectMappings = [];
  }

  isAllowedToSave(): boolean {
    var isAllowed = true;
    var selected = this.homeWork.HomeworkSubjectMappings.filter(x => x.IsSelected === true);
    if (selected.length) {      
      for (var i = 0; i < selected.length; i++) {
        if (isAllowed) {
          if (selected[i].HomeworkData) {
            var data = selected[i].HomeworkData.trim();
            if (data !== '') {
              isAllowed = true;
            } else {
              isAllowed = false;
            }
          } else {
            isAllowed = false;
          }
        }
      }
    } else {
      isAllowed = false;
    }
    return isAllowed;
  }

  isAllowedToSend(): boolean {
    var isAllowed = true;
    if (!this.homeWorkId) {
      isAllowed = false;
    }
    if (isAllowed) {
      isAllowed = this.isAllowedToSave();
    }
    return isAllowed;
  }

  sendMessage() {
    this.loaderService.toggleLoader(true);
    this.message.HomeworkId = this.homeWorkId;
    this.message.Students = this.students.filter(x => x.isSelected === true);
    this.staffManagementHomeworkService.sendMessage(this.message).then(res => {
      this.snackBar.showSnackbar((res.json()).message);
      this.loaderService.toggleLoader(false);
      this.closePop();
    })
  }

  sendMail() {
    this.loaderService.toggleLoader(true);
    this.mail.HomeworkId = this.homeWorkId;
    this.mail.Students = this.students.filter(x => x.isSelected === true);
    this.staffManagementHomeworkService.sendMail(this.mail).then(res => {
      this.snackBar.showSnackbar((res.json()).message);
      this.loaderService.toggleLoader(false);
      this.closePop();
    })
  }

  isAllowedToSendForSelectedStudent() {
    var students = this.students.filter(x => x.isSelected === true);
    return (students.length !== 0);
  }

  convertDateToUtc(dateString: any) {
    var date = new Date(dateString);
    return new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()));
  }
}
