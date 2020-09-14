import { Component, OnInit, Inject } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { SnackbarService } from '../../../../shared/snackbar-service';
import { LoaderService } from '../../../../shared/loader-service';
import { FloorRoomService } from '../hostel-floor.service';
import { BlockModel, HostelFloor, BedModel } from '../hostel-floor.model';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { RoomTypeModel, BedStatusModel } from '../../lookup/lookup.model';
import { LookupService } from '../../lookup/lookup.service';

export interface DialogData {
  addRoom: HostelFloor,
  roomTypeList: RoomTypeModel[],
  statusList: BedStatusModel[]
}

@Component({
  moduleId: module.id,
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css']
})
export class DetailComponent implements OnInit {

  roomList: HostelFloor[] = [];
  blockId: number;
  floorNo: number;
  addRoom: HostelFloor = new HostelFloor();
  roomTypeList: RoomTypeModel[] = [];
  bedStatusList: BedStatusModel[] = [];
  constructor(
    private apiService: FloorRoomService,
    private snackBar: SnackbarService,
    private loaderService: LoaderService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    public dialog: MatDialog
  ) {
    this.activatedRoute.params.subscribe(param => {
      this.blockId = param.id;
      this.floorNo = param.floor;
      this.addRoom.blockId = param.id;
      this.addRoom.floorNo = param.floor;
    });
  }

  ngOnInit() {
    this.getFloorRoomDetails();
  }

  getFloorRoomDetails() {
    this.loaderService.toggleLoader(true);
    this.apiService.getRoomsForBlockFloor(this.blockId, this.floorNo).then(res => {
      let response = res.json();
      if (response.hasError !== null && response.hasError !== undefined && response.hasError) {
        this.snackBar.showSnackbar(response.message);
        this.router.navigate(['hostel', 'floors']);
        return;
      }
      this.roomList = response;
      this.getRoomTypeList();
    }).catch(error => {
      console.log(error.json());
      this.loaderService.toggleLoader(false);
    });
  }

  getRoomTypeList() {
    this.apiService.getRoomTypeList().then(res => {
      let response = res.json();
      if (response.hasError !== null && response.hasError !== undefined && response.hasError) {
        this.snackBar.showSnackbar(response.message);
        this.router.navigate(['hostel', 'floors']);
        return;
      }
      this.roomTypeList = response;
      this.getBedStatusList();
    }).catch(error => {
      console.log(error.json());
      this.loaderService.toggleLoader(false);
    })
  }

  getBedStatusList() {
    this.apiService.getRoomTypeList().then(res => {
      let response = res.json();
      if (response.hasError !== null && response.hasError !== undefined && response.hasError) {
        this.snackBar.showSnackbar(response.message);
        this.router.navigate(['hostel', 'floors']);
        return;
      }
      this.bedStatusList = response;
      this.loaderService.toggleLoader(false);
    }).catch(error => {
      console.log(error.json());
      this.loaderService.toggleLoader(false);
    });
  }

  openAddDialog() {
    const dialogRef = this.dialog.open(DialogOverviewExampleDialog, {
      width: '800px',
      height: '500px',
      data: {addRoom: this.addRoom, roomTypeList: this.roomTypeList, statusList: this.bedStatusList}
    });

    dialogRef.afterClosed().subscribe(result => {
      this.getFloorRoomDetails();
    });
  }

  openEditDialog(room: HostelFloor) {
    let editRoom = room;
    const dialogRef = this.dialog.open(EditDialog, {
      width: '800px',
      height: '500px',
      data: {addRoom: editRoom, roomTypeList: this.roomTypeList, statusList: this.bedStatusList}
    });

    dialogRef.afterClosed().subscribe(result => {
      this.getFloorRoomDetails();
    });
  }
}

@Component({
  selector: 'add-room-dialog',
  templateUrl: 'add-room.dialog.html',
})
export class DialogOverviewExampleDialog {

  roomTypeList: RoomTypeModel[] = [];
  bedList: BedModel[] = [];
  statusList: BedStatusModel[] = [];
  isGenerated: boolean = false;
  constructor(
    private apiService: FloorRoomService,
    private snackBar: SnackbarService,
    private loaderService: LoaderService,
    public dialogRef: MatDialogRef<DialogOverviewExampleDialog>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) {
      this.roomTypeList = data.roomTypeList;
      this.statusList = data.statusList;
  }

  generate(): void {
    this.loaderService.toggleLoader(true);
    for(var i=0; i<this.data.addRoom.bedAmount; i++) {
      let bed = new BedModel();
      bed.roomId = this.data.addRoom.id;
      bed.room = this.data.addRoom;
      bed.bedNo = '';
      bed.status = 0;
      this.bedList.push(bed);
    }
    this.loaderService.toggleLoader(false);
    this.isGenerated = true;
  }

  changeBedAmount(value) {
    this.isGenerated = false;
  }

  changeRoomNo(value) {
    this.bedList = this.bedList.map(bed => {
      bed.room.roomNo = value;
      return bed;
    });
  }

  add(): void {
    this.loaderService.toggleLoader(true);
    this.apiService.addFloorRoom(this.data.addRoom).then(res => {
      let response = res.json();
      if (response.hasError !== null && response.hasError !== undefined && response.hasError) {
        this.snackBar.showSnackbar(response.message);
      } else {
        this.data.addRoom.id = response.id;
        this.bedList = this.bedList.map(bed => {
          bed.roomId = response.id;
          return bed;
        });
        this.addBedList();
      }
      this.loaderService.toggleLoader(false);
    });
  }

  addBedList() {
    this.apiService.addBeds(this.bedList).then(res => {
      let response = res.json();
      if (response.hasError !== null && response.hasError !== undefined && response.hasError) {
        this.snackBar.showSnackbar(response.message);
      } else {
        this.dialogRef.close();
      }
      this.loaderService.toggleLoader(false);
    });
  }

  cancel(): void {
    this.dialogRef.close();
  }
}

@Component({
  selector: 'edit-room-dialog',
  templateUrl: 'edit-room.dialog.html',
})
export class EditDialog implements OnInit {

  statusList: BedStatusModel[] = [];
  bedList: BedModel[] = [];
  isGenerated: boolean = true;
  roomTypeList: RoomTypeModel[] = [];
  constructor(
    private apiService: FloorRoomService,
    private snackBar: SnackbarService,
    private loaderService: LoaderService,
    public dialogRef: MatDialogRef<EditDialog>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) {
      this.roomTypeList = data.roomTypeList;
      this.statusList = data.statusList;
    }
  ngOnInit(): void {
    this.getBedList();
  }

  getBedList() {
    this.loaderService.toggleLoader(true);
    this.apiService.getBedList(this.data.addRoom.id).then(res => {
      let response = res.json();
      if (response.hasError !== null && response.hasError !== undefined && response.hasError) {
        this.snackBar.showSnackbar(response.message);
      } else {
        this.bedList = response;
      }
      this.loaderService.toggleLoader(false);
    });
  }

  add(): void {
    this.loaderService.toggleLoader(true);
    this.apiService.updateFloorRoom(this.data.addRoom).then(res => {
      let response = res.json();
      if (response.hasError !== null && response.hasError !== undefined && response.hasError) {
        this.snackBar.showSnackbar(response.message);
      } else {
        this.dialogRef.close();
      }
      this.loaderService.toggleLoader(false);
    });
  }

  updateBedList() {
    this.apiService.updateBed(this.bedList).then(res => {
      let response = res.json();
      if (response.hasError !== null && response.hasError !== undefined && response.hasError) {
        this.snackBar.showSnackbar(response.message);
      } else {
        this.dialogRef.close();
      }
      this.loaderService.toggleLoader(false);
    });
  }

  changeBedAmount(value) {
    this.isGenerated = false;
  }

  generate(): void {
    this.bedList = [];
    this.loaderService.toggleLoader(true);
    for(var i=0; i<this.data.addRoom.bedAmount; i++) {
      let bed = new BedModel();
      bed.roomId = this.data.addRoom.id;
      bed.room = this.data.addRoom;
      bed.bedNo = '';
      bed.status = 0;
      this.bedList.push(bed);
    }
    this.loaderService.toggleLoader(false);
    this.isGenerated = true;
  }

  cancel(): void {
    this.dialogRef.close();
  }
}