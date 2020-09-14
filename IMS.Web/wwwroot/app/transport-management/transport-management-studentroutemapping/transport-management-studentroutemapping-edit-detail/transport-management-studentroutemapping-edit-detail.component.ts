import { Component, OnInit } from '@angular/core';
import { StudentRouteMappingService } from '../transport-management-studentroutemapping.service';
import { LoaderService } from '../../../../shared/loader-service';
import { Router, ActivatedRoute } from '@angular/router';
import { SnackbarService } from '../../../../shared/snackbar-service';

@Component({
  moduleId: module.id,
  templateUrl: 'transport-management-studentroutemapping-edit-detail.html'
})
export class EditAndDetailTransportManagementStudentRouteMappingComponent implements OnInit {
  routeId: number;
  selectedStudents: number[] = [];
  students: any[] = [];
  routes: any[] = [];
  constructor(private studentRouteMappingService: StudentRouteMappingService, private loaderService: LoaderService,
    private router: Router, private snackBar: SnackbarService, private activeRoute: ActivatedRoute) {
  }

  ngOnInit() {
    this.activeRoute.params.subscribe(res => this.routeId = +res.id);
    this.getAllStudentByInsituteId();
    this.getStudentByRouteId();
    this.getRoutes();
  }

  getStudentByRouteId() {
    this.loaderService.toggleLoader(true);
    this.studentRouteMappingService.getStudentByRouteId(this.routeId).then(res => {
      this.selectedStudents = res.json();
      this.loaderService.toggleLoader(false);
    });
  }

  getAllStudentByInsituteId() {
    this.loaderService.toggleLoader(true);
    this.studentRouteMappingService.getAllStudentByInsituteId().then(res => {
      this.students = res.json();
      this.loaderService.toggleLoader(false);
    });
  }

  getRoutes() {
    this.loaderService.toggleLoader(true);
    this.studentRouteMappingService.getRoutes().then(res => {
      this.routes = res.json();
      this.loaderService.toggleLoader(false);
    });
  }

  addOrUpdateStudentRouteMapping() {
    this.loaderService.toggleLoader(true);
    var data = { RouteId: this.routeId, StudentIds: this.selectedStudents };
    this.studentRouteMappingService.addOrUpdateStudentRouteMapping(data).then(res => {
      var response = res.json();
      if (!response.hasError) {
        this.router.navigate(['transportmanagement', 'studentroutemapping', 'list']);
      }
      this.snackBar.showSnackbar(response.message);
      this.loaderService.toggleLoader(false);
    });
  }
}
