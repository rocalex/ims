import { Component, OnInit, Inject } from '@angular/core';
import { HostelSwapModel, Allocation } from './hostel-swap.model';
import { HostelModel } from '../hostel-management-hostel/hostel-management-hostel.model';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { BlockModel } from '../hostel-block/hostel-block.model';
import { FloorDisplayModel, HostelFloor, BedModel } from '../hostel-floor/hostel-floor.model';
import { LoaderService } from '../../../shared/loader-service';
import { PermissionService } from '../../../shared/permission.service';
import { SnackbarService } from '../../../shared/snackbar-service';
import { Router } from '@angular/router';
import { SwapService } from './hostel-swap.service';

@Component({
  moduleId: module.id,
  templateUrl: './hostel-swap.component.html',
  styleUrls: ['./hostel-swap.component.css']
})
export class HostelSwapComponent implements OnInit {
  swapRoom: HostelSwapModel = new HostelSwapModel();
  hostelList: HostelModel[] = [];
  blockList: BlockModel[] = [];
  floorList: FloorDisplayModel[] = [];
  roomList: HostelFloor[] = [];
  floorId: number;
  blockId: any;
  hostelId: number;
  roomId: number;
  allocationList: Allocation[] = [];

  constructor(
    private loaderService: LoaderService,
    private permissionService: PermissionService,
    private apiService: SwapService,
    private snackBar: SnackbarService,
    private router: Router,
    public dialog: MatDialog
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

  getRoom(floor: FloorDisplayModel) {
    this.apiService.getRoomByFloor(floor.blockId, floor.floorNo).then(res => {
      let response = res.json();
      console.log(response);
      if(response.hasError === null || response.hasError === undefined || !response.hasError) {
        this.roomList = response;
      } else {
        this.snackBar.showSnackbar(response.message);
      }
      this.loaderService.toggleLoader(false);
    }).catch(err => {
      this.loaderService.toggleLoader(false);
    })
  }

  search() {
    this.loaderService.toggleLoader(true);
    this.apiService.getAllocations(this.blockId.id, this.floorId, this.roomId).then(res => {
      let response = res.json();
      if(response.hasError === null || response.hasError === undefined || !response.hasError) {
        this.allocationList = response;
        console.log(this.allocationList);
      } else {
        this.snackBar.showSnackbar(response.message);
      }
      this.loaderService.toggleLoader(false);
    }).catch(err => {
      this.loaderService.toggleLoader(false);
    })
  }

  vacant(allocation: Allocation) {
    this.loaderService.toggleLoader(true);
    this.apiService.removeAllocation(allocation).then(res => {
      let response = res.json();
      if(response.hasError === null || response.hasError === undefined || !response.hasError) {
        this.allocationList = [];
      } else {
        this.snackBar.showSnackbar(response.message);
      }
      this.loaderService.toggleLoader(false);
    }).catch(err => {
      this.loaderService.toggleLoader(false);
    })
  }

  openSwap(allocation: Allocation) {
    var selectedHostel = new HostelModel();
    this.hostelList.map(hostel => {
      if(hostel.id == this.hostelId) {
        selectedHostel = hostel;
      }
      return hostel;
    });
    const dialogRef = this.dialog.open(DialogOverviewExampleDialog, {
      width: '800px',
      height: '500px',
      data: { allocation: allocation, hostel: selectedHostel, blockList: this.blockList }
    });

    dialogRef.afterClosed().subscribe(result => {
        this.allocationList = [];
    });
  }
  
  fullName(staff) {
    return staff.firstName + ' ' + (staff.middleName?staff.middleName:'') + ' ' + staff.lastName;
  }
}

export interface DialogData {
  allocation: Allocation,
  hostel: HostelModel,
  blockList: BlockModel[]
}

@Component({
  selector: 'swap-room-dialog',
  templateUrl: 'swap-room.dialog.html',
})
export class DialogOverviewExampleDialog {

  hostelList: HostelModel[] = [];
  blockList: BlockModel[] = [];
  floorList: FloorDisplayModel[] = [];
  roomList: HostelFloor[] = [];
  bedList: BedModel[] = [];
  operatorList: string[] = ['+', '-'];
  hostelId: number;
  blockId: number;
  floorId: number;
  roomId: number;
  swapModel: Allocation = new Allocation();
  constructor(
      private apiService: SwapService,
      private snackBar: SnackbarService,
      private loaderService: LoaderService,
      public dialogRef: MatDialogRef<DialogOverviewExampleDialog>,
      @Inject(MAT_DIALOG_DATA) public data: DialogData) {
        this.hostelList = [];
        this.hostelList.push(data.hostel);
        this.swapModel.studentId = data.allocation.studentId;
        this.swapModel.id = data.allocation.id;
        this.swapModel.status = data.allocation.status;
        this.blockList = data.blockList;
        this.hostelId = data.hostel.id;
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

  getRoom(floor: FloorDisplayModel) {
    this.apiService.getRoomByFloor(floor.blockId, floor.floorNo).then(res => {
      let response = res.json();
      if(response.hasError === null || response.hasError === undefined || !response.hasError) {
        this.roomList = response;
      } else {
        this.snackBar.showSnackbar(response.message);
      }
      this.loaderService.toggleLoader(false);
    }).catch(err => {
      this.loaderService.toggleLoader(false);
    })
  }

  getBeds(id: number) {
    this.apiService.getBedsByFloor(id).then(res => {
      let response = res.json();
      if(response.hasError === null || response.hasError === undefined || !response.hasError) {
        this.bedList = response;
      } else {
        this.snackBar.showSnackbar(response.message);
      }
      this.loaderService.toggleLoader(false);
    }).catch(err => {
      this.loaderService.toggleLoader(false);
    })
  }

  add(): void {
      this.loaderService.toggleLoader(true);
      this.apiService.updateAllocation(this.swapModel).then(res => {
          let response = res.json();
          if (response.hasError !== null && response.hasError !== undefined && response.hasError) {
              this.snackBar.showSnackbar(response.message);
          } else {
              this.snackBar.showSnackbar(response.message);
              this.dialogRef.close();
          }
          this.loaderService.toggleLoader(false);
      });
  }

  cancel(): void {
      this.dialogRef.close();
  }
}
