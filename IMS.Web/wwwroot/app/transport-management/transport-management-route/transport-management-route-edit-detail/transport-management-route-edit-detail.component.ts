import { Component, OnInit } from '@angular/core';
import { RouteService } from '../transport-management-route.service';
import { LoaderService } from '../../../../shared/loader-service';
import { Router, ActivatedRoute } from '@angular/router';
import { SnackbarService } from '../../../../shared/snackbar-service';
import { RouteManagementResponse, RouteManagementResponseType, UpdateRouteManagementAc, RouteStageMappingAc } from '../transport-management-route.model';
import { MatDialog } from '@angular/material';

@Component({
  moduleId: module.id,
  templateUrl: 'transport-management-route-edit-detail.html'
})
export class EditAndDetailTransportManagementRouteComponent implements OnInit {
  addRoute: UpdateRouteManagementAc = new UpdateRouteManagementAc();
  error: RouteManagementResponse = new RouteManagementResponse();
  initialData: any = {};
  tempData: RouteStageMappingAc = new RouteStageMappingAc();
  fromList: any[] = [];
  toList: any[] = [];
  id: number = 1;
  constructor(private routeService: RouteService, private loaderService: LoaderService, private dialog: MatDialog,
    private router: Router, private snackBar: SnackbarService, private activeRoute: ActivatedRoute) {
  }

  ngOnInit() {
    this.activeRoute.params.subscribe(res => this.addRoute.Id = res.id);
    this.getRoute();
    this.getInitialData();
  }

  getInitialData() {
    this.loaderService.toggleLoader(true);
    this.routeService.getInitialData().then(res => {
      this.initialData = res.json();
      this.loaderService.toggleLoader(false);
    })
  }

  getRoute() {
    this.loaderService.toggleLoader(true);
    this.routeService.getRoute(this.addRoute.Id).then(res => {
      var response = res.json();
      if (response.message) {
        this.snackBar.showSnackbar(response.message);
        this.router.navigate(['transportmanagement', 'route', 'list']);
      } else {
        this.addRoute.StartDate = response.startDate;
        this.addRoute.Code = response.code;
        this.addRoute.Name = response.name;
        for (var i = 0; i < response.routeStageMappings.length; i++) {
          var stageRoute = response.routeStageMappings[i];
          var temp: RouteStageMappingAc = new RouteStageMappingAc();
          temp.DemoId = this.id;
          this.id++;
          temp.Distance = stageRoute.distance;
          temp.FromPlaceId = stageRoute.fromPlaceId;
          temp.ToPlaceId = stageRoute.toPlaceId;
          this.addRoute.RouteStageMappings.push(temp);
        }
      }
      this.loaderService.toggleLoader(false);
    });
  }

  updateRoute() {
    this.loaderService.toggleLoader(true);
    this.routeService.updateRoute(this.addRoute).then(res => {
      var response = res.json();
      if (!response.hasError) {
        this.snackBar.showSnackbar(response.message);
        this.router.navigate(['transportmanagement', 'route', 'list']);
      } else {
        this.error.ErrorType = response.errorType;
        this.error.HasError = response.hasError;
        this.error.Message = response.message;
      }
      this.loaderService.toggleLoader(false);
    })
  }

  hasError(fieldName: string) {
    var id = RouteManagementResponseType[fieldName];
    if (this.error.ErrorType === id) {
      return this.error.HasError;
    } else {
      return false;
    }
  }

  resetError(fieldName: string) {
    var id = RouteManagementResponseType[fieldName];
    if (this.error.ErrorType === id) {
      this.error = new RouteManagementResponse();
    }
  }

  addList(addSubjectDialogRef) {
    this.tempData.DemoId = this.id;
    this.id++;
    this.openModal(addSubjectDialogRef);
  }

  openModal(addSubjectDialogRef) {
    this.dialog.open(addSubjectDialogRef, { width: '1000px' });
    this.assignStage();
  }

  closeModal() {
    this.tempData = new RouteStageMappingAc();
    this.dialog.closeAll();
  }

  saveModal() {
    var index = this.addRoute.RouteStageMappings.findIndex(x => x.DemoId === this.tempData.DemoId);
    if (index === -1) {
      this.addRoute.RouteStageMappings.push(this.tempData);
    } else {
      this.addRoute.RouteStageMappings[index] = this.tempData;
    }
    this.tempData = new RouteStageMappingAc();
    this.closeModal();
  }

  editModal(id: number, addSubjectDialogRef) {
    var index = this.addRoute.RouteStageMappings.findIndex(x => x.DemoId === id);
    this.tempData = this.addRoute.RouteStageMappings[index];
    this.openModal(addSubjectDialogRef);
  }

  deleteFromList(id: number) {
    var index = this.addRoute.RouteStageMappings.findIndex(x => x.DemoId === id);
    this.addRoute.RouteStageMappings.splice(index, 1);
  }

  getStageName(id: number) {
    if (this.initialData.stages) {
      var stage = this.initialData.stages.find(x => x.id === id);
      return stage.name;
    }
  }

  assignStage() {
    this.fromList = JSON.parse(JSON.stringify(this.initialData.stages));
    this.toList = JSON.parse(JSON.stringify(this.initialData.stages));
    if (this.tempData.FromPlaceId) {
      var from = this.toList.findIndex(x => x.id === this.tempData.FromPlaceId);
      this.toList.splice(from, 1);
    }
    if (this.tempData.ToPlaceId) {
      var to = this.fromList.findIndex(x => x.id === this.tempData.ToPlaceId);
      this.fromList.splice(to, 1);
    }
  }

  getTotalKm() {
    var kms = this.addRoute.RouteStageMappings.map(x => x.Distance);
    var total = 0;
    for (var i = 0; i < kms.length; i++) {
      total += kms[i];
    }
    return total;
  }

  getFromPlace() {
    if (this.addRoute.RouteStageMappings.length) {
      return this.getStageName(this.addRoute.RouteStageMappings[0].FromPlaceId);
    } else {
      return '';
    }
  }

  getToPlace() {
    if (this.addRoute.RouteStageMappings.length) {
      return this.getStageName(this.addRoute.RouteStageMappings[(this.addRoute.RouteStageMappings.length - 1)].ToPlaceId);
    } else {
      return '';
    }
  }
}
