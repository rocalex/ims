import { Component, OnInit } from '@angular/core';
import { PermissionService } from '../../../shared/permission.service';
import { Router } from '@angular/router';
import { LoaderService } from '../../../shared/loader-service';
import { SnackbarService } from '../../../shared/snackbar-service';
import { BedInfo } from './hostel-beds.model';
import { HostelModel } from '../hostel-management-hostel/hostel-management-hostel.model';
import { BlockModel } from '../hostel-block/hostel-block.model';
import { FloorDisplayModel } from '../hostel-floor/hostel-floor.model';
import { BedService } from './hostel-beds.service';

@Component({
  moduleId: module.id,
  templateUrl: './hostel-beds.component.html',
  styleUrls: ['./hostel-beds.component.css']
})
export class HostelBedsComponent implements OnInit {
  bedInfos: BedInfo[] = [];
  bedInfoByRoom = [];
  hostelList: HostelModel[] = [];
  blockList: BlockModel[] = [];
  floorList: FloorDisplayModel[] = [];
  floorId: number;
  blockId: number;
  hostelId: number;
  
  constructor(
    private loaderService: LoaderService,
    private permissionService: PermissionService,
    private apiService: BedService,
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
    this.blockId = block.id;
    for(var i=0; i<block.floorAmount; i++) {
      let newFloor = new FloorDisplayModel();
      newFloor.blockId = block.id;
      newFloor.blockName = block.name;
      newFloor.floorNo = i + 1;
      newFloor.floorName = `Floor ${i + 1}`;
      this.floorList.push(newFloor);
    }
  }

  search() {
    this.loaderService.toggleLoader(true);
    this.apiService.getRoomByFloor(this.blockId, this.floorId).then(res => {
      let response = res.json();
      if(response.hasError === null || response.hasError === undefined || !response.hasError) {
        this.bedInfos = response;
        this.bedInfoByRoom.push([]);
        var index = 0;
        for(var i=0; i<this.bedInfos.length; i++) {
          this.bedInfoByRoom[index].push(this.bedInfos[i]);
          if(this.bedInfos[i].roomNo != this.bedInfos[i + 1].roomNo) {
            index ++;
            this.bedInfoByRoom.push([]);
          }
        }
      } else {
        this.snackBar.showSnackbar(response.message);
      }
      this.loaderService.toggleLoader(false);
    }).catch(err => {
      this.loaderService.toggleLoader(false);
    });
  }
}