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
const component_model_1 = require("../component.model");
const loader_service_1 = require("../../../../shared/loader-service");
const snackbar_service_1 = require("../../../../shared/snackbar-service");
const component_service_1 = require("../component.service");
const router_1 = require("@angular/router");
let EditComponent = class EditComponent {
    constructor(loaderService, snackBar, router, activatedRoute, service) {
        this.loaderService = loaderService;
        this.snackBar = snackBar;
        this.router = router;
        this.activatedRoute = activatedRoute;
        this.service = service;
        this.addComponent = new component_model_1.ComponentModel();
        this.groupList = [];
        this.errorMessage = '';
        this.activatedRoute.params.subscribe(param => this.componentId = param.id);
    }
    ngOnInit() {
        this.loadGroupList();
    }
    loadGroupList() {
        this.loaderService.toggleLoader(true);
        this.service.getComponentGroupById(this.componentId).then(res => {
            let response = res.json();
            if (response.hasError === null || response.hasError === undefined || !response.hasError) {
                this.addComponent = response;
                this.service.getComponentGroupsForLoggedInUser().then(res1 => {
                    let response1 = res1.json();
                    if (response1.hasError === null || response1.hasError === undefined || !response1.hasError) {
                        this.groupList = response1;
                    }
                    else {
                        this.errorMessage = response1.message;
                    }
                    this.loaderService.toggleLoader(false);
                }).catch(err => {
                    this.snackBar.showSnackbar("There is error on fetching Group List");
                    this.loaderService.toggleLoader(false);
                    this.router.navigate(['payroll', 'component']);
                });
            }
            else {
                this.snackBar.showSnackbar("There is error on fetching component info");
                this.loaderService.toggleLoader(false);
                this.router.navigate(['payroll', 'component']);
            }
        }).catch(error => {
            this.snackBar.showSnackbar("There is error on fetching component info");
            this.loaderService.toggleLoader(false);
            this.router.navigate(['payroll', 'component']);
        });
    }
    add() {
        this.loaderService.toggleLoader(true);
        this.service.updateComponentGroup(this.addComponent).then(res => {
            let response = res.json();
            if (response.hasError === null || response.hasError === undefined || !response.hasError) {
                this.snackBar.showSnackbar(response.message);
                this.router.navigate(['payroll', 'components']);
            }
            else {
                this.errorMessage = response.message;
            }
            this.loaderService.toggleLoader(false);
        }).catch(err => {
            this.snackBar.showSnackbar("There is error on saving component information");
            this.loaderService.toggleLoader(false);
        });
    }
};
EditComponent = __decorate([
    core_1.Component({
        moduleId: module.id,
        templateUrl: './edit.component.html',
        styleUrls: ['./edit.component.css']
    }),
    __metadata("design:paramtypes", [loader_service_1.LoaderService,
        snackbar_service_1.SnackbarService,
        router_1.Router,
        router_1.ActivatedRoute,
        component_service_1.ComponentService])
], EditComponent);
exports.EditComponent = EditComponent;
//# sourceMappingURL=edit.component.js.map