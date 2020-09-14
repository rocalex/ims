import { Component, OnInit } from '@angular/core';
import { PermissionService } from '../../../../shared/permission.service';
import { Router } from '@angular/router';
import { LoaderService } from '../../../../shared/loader-service';
import { SnackbarService } from '../../../../shared/snackbar-service';
import { HostelModel } from '../../hostel-management-hostel/hostel-management-hostel.model';
import { BlockModel } from '../../hostel-block/hostel-block.model';
import { FloorDisplayModel, HostelFloor, BedModel } from '../../hostel-floor/hostel-floor.model';
import { AllocateService } from '../../hostel-allocate/hostel-allocate.service';
import { ReportService } from '../report.service';

@Component({
  moduleId: module.id,
  templateUrl: './allocate.component.html'
})
export class AllocateComponent implements OnInit {
  hostelList: HostelModel[] = [];
  blockList: BlockModel[] = [];
  floorList: FloorDisplayModel[] = [];
  floorId: number;
  blockId: any;
  hostelId: number;
  results: any[] = [];
  
  statusList: any[] = [
    {id: 0, name: "Pending"},
    {id: 1, name: "Approved"}
  ];
  roomList: HostelFloor[] = [];
  bedList: BedModel[] = [];
  bedLists: any[] = [];

  constructor(
    private loaderService: LoaderService,
    private permissionService: PermissionService,
    private apiService: AllocateService,
    private reportService: ReportService,
    private snackBar: SnackbarService,
    private router: Router,
  ) { }

  ngOnInit() {
    this.getHostelList();
  }

  getHostelList() {
    this.loaderService.toggleLoader(true);
    this.apiService.getHostelForLoggedInUser().then(res => {
      let response = res.json();
      if(response.hasError === null || response.hasError === undefined || !response.hasError) {
        this.hostelList = response;
      } else {
        this.snackBar.showSnackbar(response.message);
      }
      this.loaderService.toggleLoader(false);
    }).catch(err => {
      this.loaderService.toggleLoader(false);
    });
  }

  getBlockListByHostelId(id) {
    this.loaderService.toggleLoader(true);
    this.apiService.getBlockByHostelId(id).then(res => {
      let response = res.json();
      if(response.hasError === null || response.hasError === undefined || !response.hasError) {
        this.blockList = response;
      } else {
        this.snackBar.showSnackbar(response.message);
      }
      this.loaderService.toggleLoader(false);
    }).catch(err => {
      this.loaderService.toggleLoader(false);
    });
  }

  generateFloor(block: BlockModel) {
    this.floorList = [];
    for(var i=0; i<block.floorAmount; i++) {
      let newFloor = new FloorDisplayModel();
      newFloor.blockId = block.id;
      newFloor.blockName = block.name;
      newFloor.floorNo = i + 1;
      newFloor.floorName = `Floor ${i + 1}`;
      this.floorList.push(newFloor);
    }
  }

  getRoomBed(id: number) {
    this.loaderService.toggleLoader(true);
    this.apiService.getRoomList(this.blockId.id, this.floorId).then(res => {
      let response = res.json();
      if(response.hasError === null || response.hasError === undefined || !response.hasError) {
        this.roomList = response;
        this.apiService.getBedList(this.blockId.id, this.floorId).then(res1 => {
          let response1 = res1.json();
          if(response1.hasError === null || response.hasError === undefined || !response.hasError) {
            this.bedList = response1;
          } else {
            this.snackBar.showSnackbar(response1.message);
          }
          this.loaderService.toggleLoader(false);
        }).catch(err => {
          this.loaderService.toggleLoader(false);
        })
      } else {
        this.snackBar.showSnackbar(response.message);
        this.loaderService.toggleLoader(false);
      }
    }).catch(err => {
      this.loaderService.toggleLoader(false);
    });
  }
  
  fullName(staff) {
    return staff.firstName + ' ' + (staff.middleName?staff.middleName:'') + ' ' + staff.lastName;
  }

  search() {
    this.loaderService.toggleLoader(true);
    this.reportService.getAllocationSummary(this.blockId.id, this.floorId).then(res => {
      let response = res.json();
      if(response.hasError === null || response.hasError === undefined || !response.hasError) {
        this.results = response;
      } else {
        this.snackBar.showSnackbar(response.message);
      }
      this.loaderService.toggleLoader(false);
    }).catch(err => {
      this.loaderService.toggleLoader(false);
    });
  }
}
