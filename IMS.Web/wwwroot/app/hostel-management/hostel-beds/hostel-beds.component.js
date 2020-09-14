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
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@angular/core");
const permission_service_1 = require("../../../shared/permission.service");
const router_1 = require("@angular/router");
const loader_service_1 = require("../../../shared/loader-service");
const snackbar_service_1 = require("../../../shared/snackbar-service");
const hostel_floor_model_1 = require("../hostel-floor/hostel-floor.model");
const hostel_beds_service_1 = require("./hostel-beds.service");
let HostelBedsComponent = class HostelBedsComponent {
    constructor(loaderService, permissionService, apiService, snackBar, router) {
        this.loaderService = loaderService;
        this.permissionService = permissionService;
        this.apiService = apiService;
        this.snackBar = snackBar;
        this.router = router;
        this.bedInfos = [];
        this.bedInfoByRoom = [];
        this.hostelList = [];
        this.blockList = [];
        this.floorList = [];
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
        this.blockId = block.id;
        for (var i = 0; i < block.floorAmount; i++) {
            let newFloor = new hostel_floor_model_1.FloorDisplayModel();
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
            if (response.hasError === null || response.hasError === undefined || !response.hasError) {
                this.bedInfos = response;
                this.bedInfoByRoom.push([]);
                var index = 0;
                for (var i = 0; i < this.bedInfos.length; i++) {
                    this.bedInfoByRoom[index].push(this.bedInfos[i]);
                    if (this.bedInfos[i].roomNo != this.bedInfos[i + 1].roomNo) {
                        index++;
                        this.bedInfoByRoom.push([]);
                    }
                }
            }
            else {
                this.snackBar.showSnackbar(response.message);
            }
            this.loaderService.toggleLoader(false);
        }).catch(err => {
            this.loaderService.toggleLoader(false);
        });
    }
};
HostelBedsComponent = __decorate([
    core_1.Component({
        moduleId: module.id,
        templateUrl: './hostel-beds.component.html',
        styleUrls: ['./hostel-beds.component.css']
    }),
    __metadata("design:paramtypes", [loader_service_1.LoaderService,
        permission_service_1.PermissionService,
        hostel_beds_service_1.BedService,
        snackbar_service_1.SnackbarService,
        router_1.Router])
], HostelBedsComponent);
exports.HostelBedsComponent = HostelBedsComponent;
//# sourceMappingURL=hostel-beds.component.js.map