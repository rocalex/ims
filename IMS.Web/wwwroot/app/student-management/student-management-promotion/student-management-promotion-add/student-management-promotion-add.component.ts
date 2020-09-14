import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { LoaderService } from '../../../../shared/loader-service';
import { Router } from '@angular/router';
import { SnackbarService } from '../../../../shared/snackbar-service';
import { StudentPromotionManagementService } from '../student-management-promotion.service';
import { AddStudentInformationManagementAc } from '../student-management-promotion.model';

@Component({
  moduleId: module.id,
  templateUrl: 'student-management-promotion-add.html'
})
export class AddStudentPromotionManagementComponent implements OnInit {
  currentSelectedClass: any;
  currentSelectedSection: any;
  promotionSelectedClass: any;
  promotionSelectedSection: any;
  students: any[] = [];
  selectedStudent: any[] = [];
  initialData: any = {};
  promotionClassesList: any[] = [];
  allSelected: boolean = false;
  indeterminate: boolean = false;
  constructor(private studentManagementService: StudentPromotionManagementService, private loaderService: LoaderService,
    private router: Router, private snackBar: SnackbarService) {
  }

  ngOnInit() {
    this.getIntialDataForPromotion();
  }

  getIntialDataForPromotion() {
    this.loaderService.toggleLoader(true);
    this.studentManagementService.getIntialDataForPromotion().then(res => {
      this.initialData = res.json();
      this.loaderService.toggleLoader(false);
    });
  }

  promotionClasses() {
    this.promotionClassesList = [];
    for (var i = 0; i < this.initialData.classes.length; i++) {
      var data = this.initialData.classes[i];
      if (data.id !== this.currentSelectedClass.id) {
        this.promotionClassesList.push(data);
      }
    }
  }

  getStudentByClassId() {
    this.loaderService.toggleLoader(true);
    this.studentManagementService.getStudentByClassId(this.currentSelectedClass.id, this.currentSelectedSection.id).then(res => {
      this.students = res.json();
      if (this.students.length === 0) {
        this.snackBar.showSnackbar('No student found for the selected class and section');
      }
      this.loaderService.toggleLoader(false);
    })
  }

  addStudentDetail() {
    this.loaderService.toggleLoader(true);
    var list: AddStudentInformationManagementAc[] = [];
    var studentSelected = this.students.filter(x => x.isSelected === true);
    for (var i = 0; i < studentSelected.length; i++) {
      var data: AddStudentInformationManagementAc = new AddStudentInformationManagementAc();
      data.CurrentClassId = this.currentSelectedClass.id;
      data.CurrentSectionId = this.currentSelectedSection.id;
      data.PromotedToClassId = this.promotionSelectedClass.id;
      data.PromotedToSectionId = this.promotionSelectedSection.id;
      data.Remark = studentSelected[i].remark;
      data.StudentId = studentSelected[i].id;
      list.push(data);
    }
    this.studentManagementService.addStudentDetail(list).then(res => {
      var response = res.json();
      if (!response.hasError) {
        this.router.navigate(['student', 'promotion', 'list']);
      }
      this.snackBar.showSnackbar(response.message);
      this.loaderService.toggleLoader(false);
    });
  }

  checkboxChange() {
    var selected = this.students.filter(x => x.isSelected === true);
    if (selected.length) {
      this.indeterminate = (selected.length !== this.students.length);
      this.allSelected = !this.indeterminate;
    } else {
      this.indeterminate = false;
      this.allSelected = false;
    }
  }

  selectAll() {
    this.indeterminate = false;
    for (var i = 0; i < this.students.length; i++) {
      this.students[i].isSelected = this.allSelected;
    }
  }

  isAllowedToSave() {
    var count = this.students.filter(x => x.isSelected === true);
    return (count.length !== 0);
  }
}
