import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { StaffDisciplinaryManagementService } from '../staff-management-disciplinary.service';
import { LoaderService } from '../../../shared/loader-service';
import { SnackbarService } from '../../../shared/snackbar-service';
import { UpdateDisciplinaryManagementAc } from '../staff-management-disciplinary.model';

@Component({
  moduleId: module.id,
  templateUrl: 'staff-management-disciplinary-edit-detail.html'
})
export class EditAndDetailStaffDisciplinaryManagementComponent implements OnInit {
  initialData: any = {};
  disciplinary: UpdateDisciplinaryManagementAc = new UpdateDisciplinaryManagementAc();
  constructor(private staffDisciplinaryManagementService: StaffDisciplinaryManagementService,
    private loaderService: LoaderService, private snackBar: SnackbarService, private router: Router,
    private activeRoute: ActivatedRoute) {
  }

  ngOnInit() {
    this.getInitialData();
    this.activeRoute.params.subscribe(res => this.disciplinary.Id = +res.id);
    this.getDisciplinary();
  }

  getInitialData() {
    this.loaderService.toggleLoader(true);
    this.staffDisciplinaryManagementService.getInitialData().then(res => {
      this.initialData = res.json();
      this.loaderService.toggleLoader(false);
    });
  }

  getDisciplinary() {
    this.loaderService.toggleLoader(true);
    this.staffDisciplinaryManagementService.getDisciplinary(this.disciplinary.Id).then(res => {
      var response = res.json();
      if (response) {
        this.disciplinary.Date = response.date;
        this.disciplinary.Description = response.description;
        this.disciplinary.Remarks = response.remarks;
        this.disciplinary.StatusId = response.statusId;
        this.disciplinary.Subject = response.subject;
        this.disciplinary.StudentId = response.studentId;
      } else {
        this.snackBar.showSnackbar('Disciplinary not found');
        this.router.navigate(['disciplinary', 'list']);
      }
      this.loaderService.toggleLoader(false);
    })
  }

  isRemarkDisbale() {
    if (this.disciplinary.StatusId) {
      if (this.initialData.statuses) {
        var status = this.initialData.statuses.find(x => x.id === this.disciplinary.StatusId);
        if (status.name === 'Open') {
          return true;
        } else {
          return false;
        }
      } else {
        return false;
      }
    } else {
      return false;
    }
  }

  updateDisciplinary() {
    this.loaderService.toggleLoader(true);
    this.staffDisciplinaryManagementService.updateDisciplinary(this.disciplinary).then(res => {
      var response = res.json();
      if (!response.hasError) {
        this.router.navigate(['disciplinary', 'list']);
      }
      this.snackBar.showSnackbar(response.message);
      this.loaderService.toggleLoader(false);
    });
  }
}
