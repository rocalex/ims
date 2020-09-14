import { Component, OnInit } from '@angular/core';
import { RouteService } from '../transport-management-route.service';
import { LoaderService } from '../../../../shared/loader-service';
import { Router } from '@angular/router';
import { SnackbarService } from '../../../../shared/snackbar-service';
import { RouteManagementResponseType, RouteManagementResponse, AddRouteManagementAc, RouteStageMappingAc } from '../transport-management-route.model';
import { MatDialog } from '@angular/material';

@Component({
  moduleId: module.id,
  templateUrl: 'transport-management-route-add.html'
})
export class AddTransportManagementRouteComponent implements OnInit {
  addRoute: AddRouteManagementAc = new AddRouteManagementAc();
  error: RouteManagementResponse = new RouteManagementResponse();
  initialData: any = {};
  tempData: RouteStageMappingAc = new RouteStageMappingAc();
  fromList: any[] = [];
  toList: any[] = [];
  id: number = 1;
  constructor(private routeService: RouteService, private loaderService: LoaderService,
    private router: Router, private snackBar: SnackbarService, private dialog: MatDialog) {
  }

  ngOnInit() {
    this.getInitialData();
  }

  getInitialData() {
    this.loaderService.toggleLoader(true);
    this.routeService.getInitialData().then(res => {
      this.initialData = res.json();
      this.loaderService.toggleLoader(false);
    })
  }

  addRouteData() {
    this.loaderService.toggleLoader(true);
    this.routeService.addRoute(this.addRoute).then(res => {
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
    var stage = this.initialData.stages.find(x => x.id === id);
    return stage.name;
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
