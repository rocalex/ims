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
const router_1 = require("@angular/router");
const loader_service_1 = require("../../../../shared/loader-service");
const snackbar_service_1 = require("../../../../shared/snackbar-service");
const hostel_block_model_1 = require("../hostel-block.model");
const hostel_block_service_1 = require("../hostel-block.service");
const hostel_management_hostel_service_1 = require("../../hostel-management-hostel/hostel-management-hostel.service");
let EditComponent = class EditComponent {
    constructor(loaderService, router, activateRoute, snackbar, apiService, hostelService) {
        this.loaderService = loaderService;
        this.router = router;
        this.activateRoute = activateRoute;
        this.snackbar = snackbar;
        this.apiService = apiService;
        this.hostelService = hostelService;
        this.hostelList = [];
        this.addBlock = new hostel_block_model_1.BlockModel();
        this.activateRoute.params.subscribe(param => this.hostelId = param.id);
    }
    ngOnInit() {
        this.getHostelInfo();
    }
    getHostelInfo() {
        this.loaderService.toggleLoader(true);
        this.hostelService.getHostelList().then(res => {
            let response = res.json();
            if (response.hasError === null || response.hasError === undefined || !response.hasError) {
                this.hostelList = response;
                this.apiService.getBookTypeById(this.hostelId).then(res1 => {
                    let response1 = res1.json();
                    if (response1.hasError === null || response1.hasError === undefined || !response1.hasError) {
                        this.addBlock = response1;
                    }
                    else {
                        this.snackbar.showSnackbar(response.message);
                    }
                    this.loaderService.toggleLoader(false);
                });
            }
            else {
                this.snackbar.showSnackbar(response.message);
                this.router.navigate(['hostel', 'blocks']);
            }
        }).catch(error => {
            this.snackbar.showSnackbar(error.message);
            this.loaderService.toggleLoader(false);
        });
    }
    add() {
        this.apiService.updateBookType(this.addBlock).then(res => {
            let response = res.json();
            console.log(response);
            if (response.hasError === null || response.hasError === undefined || !response.hasError) {
                this.snackbar.showSnackbar(response.message);
                this.router.navigate(['hostel', 'blocks']);
            }
            else {
                this.snackbar.showSnackbar(response.message);
            }
            this.loaderService.toggleLoader(false);
        }).catch(error => {
            this.snackbar.showSnackbar(error.message);
            this.loaderService.toggleLoader(false);
        });
    }
    checkWhiteSpace(nameModel, name) {
        if (name) {
            if (name.trim() === '') {
                nameModel.whiteSpaceError = true;
            }
            else {
                nameModel.whiteSpaceError = false;
            }
        }
    }
};
EditComponent = __decorate([
    core_1.Component({
        moduleId: module.id,
        templateUrl: './edit.component.html',
        styleUrls: ['./edit.component.css']
    }),
    __metadata("design:paramtypes", [loader_service_1.LoaderService,
        router_1.Router,
        router_1.ActivatedRoute,
        snackbar_service_1.SnackbarService,
        hostel_block_service_1.HostelBlockService,
        hostel_management_hostel_service_1.HostelManagementHostelService])
], EditComponent);
exports.EditComponent = EditComponent;
//# sourceMappingURL=edit.component.js.map