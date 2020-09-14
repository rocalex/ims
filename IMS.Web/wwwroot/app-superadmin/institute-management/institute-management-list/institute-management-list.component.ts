import { Component, OnInit } from '@angular/core';
import { InstituteManagementService } from '../institute-management.service';
import { LoaderService } from '../../../shared/loader-service';

@Component({
  moduleId: module.id,
  templateUrl: 'institute-management-list.html'
})
export class InstituteManagementListComponent implements OnInit {
  institutes: any[] = [];
  constructor(private instituteManagementService: InstituteManagementService, private loaderService: LoaderService) {
  }

  ngOnInit() {
    this.loaderService.toggleLoader(true);
    this.getAllInstitute();
  }

  getAllInstitute() {
    this.instituteManagementService.getAllInstitute().then(res => {
      this.institutes = res.json();
      this.loaderService.toggleLoader(false);
    })
  }
}
