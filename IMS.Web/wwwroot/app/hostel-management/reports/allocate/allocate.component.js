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
const permission_service_1 = require("../../../../shared/permission.service");
const router_1 = require("@angular/router");
const loader_service_1 = require("../../../../shared/loader-service");
const snackbar_service_1 = require("../../../../shared/snackbar-service");
const hostel_floor_model_1 = require("../../hostel-floor/hostel-floor.model");
const hostel_allocate_service_1 = require("../../hostel-allocate/hostel-allocate.service");
const report_service_1 = require("../report.service");
let AllocateComponent = class AllocateComponent {
    constructor(loaderService, permissionService, apiService, reportService, snackBar, router) {
        this.loaderService = loaderService;
        this.permissionService = permissionService;
        this.apiService = apiService;
        this.reportService = reportService;
        this.snackBar = snackBar;
        this.router = router;
        this.hostelList = [];
        this.blockList = [];
        this.floorList = [];
        this.results = [];
        this.statusList = [
            { id: 0, name: "Pending" },
            { id: 1, name: "Approved" }
        ];
        this.roomList = [];
        this.bedList = [];
        this.bedLists = [];
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
    getRoomBed(id) {
        this.loaderService.toggleLoader(true);
        this.apiService.getRoomList(this.blockId.id, this.floorId).then(res => {
            let response = res.json();
            if (response.hasError === null || response.hasError === undefined || !response.hasError) {
                this.roomList = response;
                this.apiService.getBedList(this.blockId.id, this.floorId).then(res1 => {
                    let response1 = res1.json();
                    if (response1.hasError === null || response.hasError === undefined || !response.hasError) {
                        this.bedList = response1;
                    }
                    else {
                        this.snackBar.showSnackbar(response1.message);
                    }
                    this.loaderService.toggleLoader(false);
                }).catch(err => {
                    this.loaderService.toggleLoader(false);
                });
            }
            else {
                this.snackBar.showSnackbar(response.message);
                this.loaderService.toggleLoader(false);
            }
        }).catch(err => {
            this.loaderService.toggleLoader(false);
        });
    }
    fullName(staff) {
        return staff.firstName + ' ' + (staff.middleName ? staff.middleName : '') + ' ' + staff.lastName;
    }
    search() {
        this.loaderService.toggleLoader(true);
        this.reportService.getAllocationSummary(this.blockId.id, this.floorId).then(res => {
            let response = res.json();
            if (response.hasError === null || response.hasError === undefined || !response.hasError) {
                this.results = response;
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
AllocateComponent = __decorate([
    core_1.Component({
        moduleId: module.id,
        templateUrl: './allocate.component.html'
    }),
    __metadata("design:paramtypes", [loader_service_1.LoaderService,
        permission_service_1.PermissionService,
        hostel_allocate_service_1.AllocateService,
        report_service_1.ReportService,
        snackbar_service_1.SnackbarService,
        router_1.Router])
], AllocateComponent);
exports.AllocateComponent = AllocateComponent;
//# sourceMappingURL=allocate.component.js.map