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
const hostel_swap_model_1 = require("./hostel-swap.model");
const hostel_management_hostel_model_1 = require("../hostel-management-hostel/hostel-management-hostel.model");
const dialog_1 = require("@angular/material/dialog");
const hostel_floor_model_1 = require("../hostel-floor/hostel-floor.model");
const loader_service_1 = require("../../../shared/loader-service");
const permission_service_1 = require("../../../shared/permission.service");
const snackbar_service_1 = require("../../../shared/snackbar-service");
const router_1 = require("@angular/router");
const hostel_swap_service_1 = require("./hostel-swap.service");
let HostelSwapComponent = class HostelSwapComponent {
    constructor(loaderService, permissionService, apiService, snackBar, router, dialog) {
        this.loaderService = loaderService;
        this.permissionService = permissionService;
        this.apiService = apiService;
        this.snackBar = snackBar;
        this.router = router;
        this.dialog = dialog;
        this.swapRoom = new hostel_swap_model_1.HostelSwapModel();
        this.hostelList = [];
        this.blockList = [];
        this.floorList = [];
        this.roomList = [];
        this.allocationList = [];
    }
    ngOnInit() {
        this.getHostelList();
    }
    getHostelList() {
        this.loaderService.toggleLoader(true);
        this.apiService.getHostelForLoggedInUser().then(res => {
            let response = res.json();
            if (response.hasError === null || response.hasError === undefined || !response.hasError) {
                this.hostelList = response;
            }
            else {
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
            if (response.hasError === null || response.hasError === undefined || !response.hasError) {
                this.blockList = response;
            }
            else {
                this.snackBar.showSnackbar(response.message);
            }
            this.loaderService.toggleLoader(false);
        }).catch(err => {
            this.loaderService.toggleLoader(false);
        });
    }
    generateFloor(block) {
        this.floorList = [];
        for (var i = 0; i < block.floorAmount; i++) {
            let newFloor = new hostel_floor_model_1.FloorDisplayModel();
            newFloor.blockId = block.id;
            newFloor.blockName = block.name;
            newFloor.floorNo = i + 1;
            newFloor.floorName = `Floor ${i + 1}`;
            this.floorList.push(newFloor);
        }
    }
    getRoom(floor) {
        this.apiService.getRoomByFloor(floor.blockId, floor.floorNo).then(res => {
            let response = res.json();
            console.log(response);
            if (response.hasError === null || response.hasError === undefined || !response.hasError) {
                this.roomList = response;
            }
            else {
                this.snackBar.showSnackbar(response.message);
            }
            this.loaderService.toggleLoader(false);
        }).catch(err => {
            this.loaderService.toggleLoader(false);
        });
    }
    search() {
        this.loaderService.toggleLoader(true);
        this.apiService.getAllocations(this.blockId.id, this.floorId, this.roomId).then(res => {
            let response = res.json();
            if (response.hasError === null || response.hasError === undefined || !response.hasError) {
                this.allocationList = response;
                console.log(this.allocationList);
            }
            else {
                this.snackBar.showSnackbar(response.message);
            }
            this.loaderService.toggleLoader(false);
        }).catch(err => {
            this.loaderService.toggleLoader(false);
        });
    }
    vacant(allocation) {
        this.loaderService.toggleLoader(true);
        this.apiService.removeAllocation(allocation).then(res => {
            let response = res.json();
            if (response.hasError === null || response.hasError === undefined || !response.hasError) {
                this.allocationList = [];
            }
            else {
                this.snackBar.showSnackbar(response.message);
            }
            this.loaderService.toggleLoader(false);
        }).catch(err => {
            this.loaderService.toggleLoader(false);
        });
    }
    openSwap(allocation) {
        var selectedHostel = new hostel_management_hostel_model_1.HostelModel();
        this.hostelList.map(hostel => {
            if (hostel.id == this.hostelId) {
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
        return staff.firstName + ' ' + (staff.middleName ? staff.middleName : '') + ' ' + staff.lastName;
    }
};
HostelSwapComponent = __decorate([
    core_1.Component({
        moduleId: module.id,
        templateUrl: './hostel-swap.component.html',
        styleUrls: ['./hostel-swap.component.css']
    }),
    __metadata("design:paramtypes", [loader_service_1.LoaderService,
        permission_service_1.PermissionService,
        hostel_swap_service_1.SwapService,
        snackbar_service_1.SnackbarService,
        router_1.Router,
        dialog_1.MatDialog])
], HostelSwapComponent);
exports.HostelSwapComponent = HostelSwapComponent;
let DialogOverviewExampleDialog = class DialogOverviewExampleDialog {
    constructor(apiService, snackBar, loaderService, dialogRef, data) {
        this.apiService = apiService;
        this.snackBar = snackBar;
        this.loaderService = loaderService;
        this.dialogRef = dialogRef;
        this.data = data;
        this.hostelList = [];
        this.blockList = [];
        this.floorList = [];
        this.roomList = [];
        this.bedList = [];
        this.operatorList = ['+', '-'];
        this.swapModel = new hostel_swap_model_1.Allocation();
        this.hostelList = [];
        this.hostelList.push(data.hostel);
        this.swapModel.studentId = data.allocation.studentId;
        this.swapModel.id = data.allocation.id;
        this.swapModel.status = data.allocation.status;
        this.blockList = data.blockList;
        this.hostelId = data.hostel.id;
    }
    generateFloor(block) {
        this.floorList = [];
        for (var i = 0; i < block.floorAmount; i++) {
            let newFloor = new hostel_floor_model_1.FloorDisplayModel();
            newFloor.blockId = block.id;
            newFloor.blockName = block.name;
            newFloor.floorNo = i + 1;
            newFloor.floorName = `Floor ${i + 1}`;
            this.floorList.push(newFloor);
        }
    }
    getRoom(floor) {
        this.apiService.getRoomByFloor(floor.blockId, floor.floorNo).then(res => {
            let response = res.json();
            if (response.hasError === null || response.hasError === undefined || !response.hasError) {
                this.roomList = response;
            }
            else {
                this.snackBar.showSnackbar(response.message);
            }
            this.loaderService.toggleLoader(false);
        }).catch(err => {
            this.loaderService.toggleLoader(false);
        });
    }
    getBeds(id) {
        this.apiService.getBedsByFloor(id).then(res => {
            let response = res.json();
            if (response.hasError === null || response.hasError === undefined || !response.hasError) {
                this.bedList = response;
            }
            else {
                this.snackBar.showSnackbar(response.message);
            }
            this.loaderService.toggleLoader(false);
        }).catch(err => {
            this.loaderService.toggleLoader(false);
        });
    }
    add() {
        this.loaderService.toggleLoader(true);
        this.apiService.updateAllocation(this.swapModel).then(res => {
            let response = res.json();
            if (response.hasError !== null && response.hasError !== undefined && response.hasError) {
                this.snackBar.showSnackbar(response.message);
            }
            else {
                this.snackBar.showSnackbar(response.message);
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
        selector: 'swap-room-dialog',
        templateUrl: 'swap-room.dialog.html',
    }),
    __param(4, core_1.Inject(dialog_1.MAT_DIALOG_DATA)),
    __metadata("design:paramtypes", [hostel_swap_service_1.SwapService,
        snackbar_service_1.SnackbarService,
        loader_service_1.LoaderService,
        dialog_1.MatDialogRef, Object])
], DialogOverviewExampleDialog);
exports.DialogOverviewExampleDialog = DialogOverviewExampleDialog;
//# sourceMappingURL=hostel-swap.component.js.map