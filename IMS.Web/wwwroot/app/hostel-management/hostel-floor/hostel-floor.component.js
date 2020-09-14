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
const hostel_floor_model_1 = require("./hostel-floor.model");
const hostel_floor_service_1 = require("./hostel-floor.service");
const snackbar_service_1 = require("../../../shared/snackbar-service");
const loader_service_1 = require("../../../shared/loader-service");
let HostelFloorComponent = class HostelFloorComponent {
    constructor(snackBar, loader, apiService) {
        this.snackBar = snackBar;
        this.loader = loader;
        this.apiService = apiService;
        this.blockList = [];
        this.floorDisplayList = [];
    }
    ngOnInit() {
        this.getBlockList();
    }
    getBlockList() {
        this.loader.toggleLoader(true);
        this.apiService.getFloorsForLoggedInUser().then(res => {
            let response = res.json();
            if (response.hasError === null || response.hasError === undefined || !response.hasError) {
                this.blockList = response;
                this.blockList.map(block => {
                    for (var i = 0; i < block.floorAmount; i++) {
                        let floor = new hostel_floor_model_1.FloorDisplayModel();
                        floor.blockId = block.id;
                        floor.blockName = block.name;
                        floor.hostelName = block.hostel.name;
                        floor.floorNo = i + 1;
                        floor.floorName = `Floor ${(i + 1)}`;
                        this.floorDisplayList.push(floor);
                    }
                });
            }
            else {
                this.snackBar.showSnackbar(response.message);
            }
            this.loader.toggleLoader(false);
        })
            .catch((err) => {
            this.loader.toggleLoader(false);
        });
    }
};
HostelFloorComponent = __decorate([
    core_1.Component({
        moduleId: module.id,
        templateUrl: './hostel-floor.component.html',
        styleUrls: ['./hostel-floor.component.css']
    }),
    __metadata("design:paramtypes", [snackbar_service_1.SnackbarService,
        loader_service_1.LoaderService,
        hostel_floor_service_1.FloorRoomService])
], HostelFloorComponent);
exports.HostelFloorComponent = HostelFloorComponent;
//# sourceMappingURL=hostel-floor.component.js.map