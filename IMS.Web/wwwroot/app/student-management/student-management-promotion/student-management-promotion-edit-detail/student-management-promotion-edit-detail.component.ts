import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { LoaderService } from '../../../../shared/loader-service';
import { Router, ActivatedRoute } from '@angular/router';
import { SnackbarService } from '../../../../shared/snackbar-service';
import { StudentPromotionManagementService } from '../student-management-promotion.service';

@Component({
  moduleId: module.id,
  templateUrl: 'student-management-promotion-edit-detail.html'
})
export class EditAndDetailStudentPromotionManagementComponent implements OnInit {
  promotionId: number;
  student: any = {};
  initialData: any = {};
  promotionClassesList: any[] = [];
  constructor(private studentManagementService: StudentPromotionManagementService, private loaderService: LoaderService,
    private router: Router, private snackBar: SnackbarService, private activeRoute: ActivatedRoute) {
  }

  ngOnInit() {
    this.activeRoute.params.subscribe(res => this.promotionId = res.id);
    this.getStudentDetail();
  }

  getStudentDetail() {
    this.loaderService.toggleLoader(true);
    this.studentManagementService.getStudentDetail(this.promotionId).then(res => {
      var response = res.json();
      if (response.message) {
        this.snackBar.showSnackbar(response.message);
        this.router.navigate(['student', 'promotion', 'list']);
      } else {
        this.student = response;
        this.getIntialDataForPromotion();
      }
      this.loaderService.toggleLoader(false);
    });
  }

  getIntialDataForPromotion() {
    this.loaderService.toggleLoader(true);
    this.studentManagementService.getIntialDataForPromotion().then(res => {
      this.initialData = res.json();
      this.promotionClasses();
      this.loaderService.toggleLoader(false);
    });
  }

  promotionClasses() {
    this.promotionClassesList = [];
    for (var i = 0; i < this.initialData.classes.length; i++) {
      var data = this.initialData.classes[i];
      if (data.id !== this.student.currentClassId) {
        this.promotionClassesList.push(data);
      }
    }
  }

  updateStudent() {
    this.loaderService.toggleLoader(true);
    this.studentManagementService.updateStudent(this.student).then(res => {
      var response = res.json();
      if (!response.hasError) {
        this.router.navigate(['student', 'promotion', 'list']);
      }
      this.snackBar.showSnackbar(response.message);
      this.loaderService.toggleLoader(false);
    });
  }
}
