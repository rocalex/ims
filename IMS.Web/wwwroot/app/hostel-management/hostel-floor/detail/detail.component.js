"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@angular/core");
const router_1 = require("@angular/router");
const snackbar_service_1 = require("../../../../shared/snackbar-service");
const loader_service_1 = require("../../../../shared/loader-service");
const hostel_floor_service_1 = require("../hostel-floor.service");
const hostel_floor_model_1 = require("../hostel-floor.model");
const dialog_1 = require("@angular/material/dialog");
let DetailComponent = class DetailComponent {
    constructor(apiService, snackBar, loaderService, router, activatedRoute, dialog) {
        this.apiService = apiService;
        this.snackBar = snackBar;
        this.loaderService = loaderService;
        this.router = router;
        this.activatedRoute = activatedRoute;
        this.dialog = dialog;
        this.roomList = [];
        this.addRoom = new hostel_floor_model_1.HostelFloor();
        this.roomTypeList = [];
        this.bedStatusList = [];
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
        });
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
            data: { addRoom: this.addRoom, roomTypeList: this.roomTypeList, statusList: this.bedStatusList }
        });
        dialogRef.afterClosed().subscribe(result => {
            this.getFloorRoomDetails();
        });
    }
    openEditDialog(room) {
        let editRoom = room;
        const dialogRef = this.dialog.open(EditDialog, {
            width: '800px',
            height: '500px',
            data: { addRoom: editRoom, roomTypeList: this.roomTypeList, statusList: this.bedStatusList }
        });
        dialogRef.afterClosed().subscribe(result => {
            this.getFloorRoomDetails();
        });
    }
};
DetailComponent = __decorate([
    core_1.Component({
        moduleId: module.id,
        templateUrl: './detail.component.html',
        styleUrls: ['./detail.component.css']
    }),
    __metadata("design:paramtypes", [hostel_floor_service_1.FloorRoomService,
        snackbar_service_1.SnackbarService,
        loader_service_1.LoaderService,
        router_1.Router,
        router_1.ActivatedRoute,
        dialog_1.MatDialog])
], DetailComponent);
exports.DetailComponent = DetailComponent;
let DialogOverviewExampleDialog = class DialogOverviewExampleDialog {
    constructor(apiService, snackBar, loaderService, dialogRef, data) {
        this.apiService = apiService;
        this.snackBar = snackBar;
        this.loaderService = loaderService;
        this.dialogRef = dialogRef;
        this.data = data;
        this.roomTypeList = [];
        this.bedList = [];
        this.statusList = [];
        this.isGenerated = false;
        this.roomTypeList = data.roomTypeList;
        this.statusList = data.statusList;
    }
    generate() {
        this.loaderService.toggleLoader(true);
        for (var i = 0; i < this.data.addRoom.bedAmount; i++) {
            let bed = new hostel_floor_model_1.BedModel();
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
    add() {
        this.loaderService.toggleLoader(true);
        this.apiService.addFloorRoom(this.data.addRoom).then(res => {
            let response = res.json();
            if (response.hasError !== null && response.hasError !== undefined && response.hasError) {
                this.snackBar.showSnackbar(response.message);
            }
            else {
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
            }
            else {
                this.dialogRef.close();
            }
            this.loaderService.toggleLoader(false);
        });
    }
    cancel() {
        this.dialogRef.close();
    }
};
DialogOverviewExampleDialog = __decorate([
    core_1.Component({
        selector: 'add-room-dialog',
        templateUrl: 'add-room.dialog.html',
    }),
    __param(4, core_1.Inject(dialog_1.MAT_DIALOG_DATA)),
    __metadata("design:paramtypes", [hostel_floor_service_1.FloorRoomService,
        snackbar_service_1.SnackbarService,
        loader_service_1.LoaderService,
        dialog_1.MatDialogRef, Object])
], DialogOverviewExampleDialog);
exports.DialogOverviewExampleDialog = DialogOverviewExampleDialog;
let EditDialog = class EditDialog {
    constructor(apiService, snackBar, loaderService, dialogRef, data) {
        this.apiService = apiService;
        this.snackBar = snackBar;
        this.loaderService = loaderService;
        this.dialogRef = dialogRef;
        this.data = data;
        this.statusList = [];
        this.bedList = [];
        this.isGenerated = true;
        this.roomTypeList = [];
        this.roomTypeList = data.roomTypeList;
        this.statusList = data.statusList;
    }
    ngOnInit() {
        this.getBedList();
    }
    getBedList() {
        this.loaderService.toggleLoader(true);
        this.apiService.getBedList(this.data.addRoom.id).then(res => {
            let response = res.json();
            if (response.hasError !== null && response.hasError !== undefined && response.hasError) {
                this.snackBar.showSnackbar(response.message);
            }
            else {
                this.bedList = response;
            }
            this.loaderService.toggleLoader(false);
        });
    }
    add() {
        this.loaderService.toggleLoader(true);
        this.apiService.updateFloorRoom(this.data.addRoom).then(res => {
            let response = res.json();
            if (response.hasError !== null && response.hasError !== undefined && response.hasError) {
                this.snackBar.showSnackbar(response.message);
            }
            else {
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
            }
            else {
                this.dialogRef.close();
            }
            this.loaderService.toggleLoader(false);
        });
    }
    changeBedAmount(value) {
        this.isGenerated = false;
    }
    generate() {
        this.bedList = [];
        this.loaderService.toggleLoader(true);
        for (var i = 0; i < this.data.addRoom.bedAmount; i++) {
            let bed = new hostel_floor_model_1.BedModel();
            bed.roomId = this.data.addRoom.id;
            bed.room = this.data.addRoom;
            bed.bedNo = '';
            bed.status = 0;
            this.bedList.push(bed);
        }
        this.loaderService.toggleLoader(false);
        this.isGenerated = true;
    }
    cancel() {
        this.dialogRef.close();
    }
};
EditDialog = __decorate([
    core_1.Component({
        selector: 'edit-room-dialog',
        templateUrl: 'edit-room.dialog.html',
    }),
    __param(4, core_1.Inject(dialog_1.MAT_DIALOG_DATA)),
    __metadata("design:paramtypes", [hostel_floor_service_1.FloorRoomService,
        snackbar_service_1.SnackbarService,
        loader_service_1.LoaderService,
        dialog_1.MatDialogRef, Object])
], EditDialog);
exports.EditDialog = EditDialog;
//# sourceMappingURL=detail.component.js.map