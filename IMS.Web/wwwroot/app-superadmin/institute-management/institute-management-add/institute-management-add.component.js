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
const institute_management_service_1 = require("../institute-management.service");
const institute_management_model_1 = require("../institute-management.model");
const router_1 = require("@angular/router");
const snackbar_service_1 = require("../../../shared/snackbar-service");
const loader_service_1 = require("../../../shared/loader-service");
let InstituteManagementAddComponent = class InstituteManagementAddComponent {
    constructor(instituteManagementService, snackBar, router, loaderService) {
        this.instituteManagementService = instituteManagementService;
        this.snackBar = snackBar;
        this.router = router;
        this.loaderService = loaderService;
        this.institute = new institute_management_model_1.AddInstitute();
        this.error = new institute_management_model_1.InstituteResponse();
        this.listOfBcc = [];
        this.tempBcc = new institute_management_model_1.EmailBccAndCc();
        this.errorMessageForBcc = '';
        this.bccId = 0;
        this.listOfcc = [];
        this.tempCc = new institute_management_model_1.EmailBccAndCc();
        this.errorMessageForCc = '';
        this.ccId = 0;
        this.users = [];
        this.mappedUser = [];
        this.zoom = 8;
        this.markers = {
            label: 'A',
            draggable: true
        };
        if (navigator) {
            navigator.geolocation.getCurrentPosition(pos => {
                this.lng = +pos.coords.longitude;
                this.lat = +pos.coords.latitude;
            });
        }
    }
    ngOnInit() {
        this.getAllUser();
    }
    addInstitute() {
        this.loaderService.toggleLoader(true);
        this.institute.Bcc = this.listOfBcc.map(x => x.Email);
        this.institute.Cc = this.listOfcc.map(x => x.Email);
        this.institute.Latitude = this.markers.lat;
        this.institute.Longitude = this.markers.lng;
        this.instituteManagementService.addInstitute(this.institute).then(res => {
            var response = res.json();
            if (!response.hasError) {
                this.router.navigate(['institute', 'list']);
                this.snackBar.showSnackbar(response.message);
            }
            else {
                this.error.ErrorType = response.errorType;
                this.error.HasError = response.hasError;
                this.error.Message = response.message;
            }
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
    hasError(fieldName) {
        var id = institute_management_model_1.InstituteResponseType[fieldName];
        if (this.error.ErrorType === id) {
            return this.error.HasError;
        }
        else {
            return false;
        }
    }
    resetError(fieldName) {
        var id = institute_management_model_1.InstituteResponseType[fieldName];
        if (this.error.ErrorType === id) {
            this.error = new institute_management_model_1.InstituteResponse();
        }
    }
    addBccCard() {
        var anyEdit = this.listOfBcc.filter(x => x.IsEdit === true);
        if (anyEdit.length === 0) {
            this.errorMessageForBcc = '';
            const Bcc = new institute_management_model_1.EmailBccAndCc();
            Bcc.Id = this.bccId;
            Bcc.IsEdit = true;
            this.bccId++;
            this.listOfBcc.push(Bcc);
        }
        else {
            this.errorMessageForBcc = 'Another card is on process';
        }
    }
    saveBcc(Bcc) {
        Bcc.IsEdit = false;
    }
    editBcc(Bcc) {
        var anyEdit = this.listOfBcc.filter(x => x.IsEdit === true);
        if (anyEdit.length === 0) {
            this.errorMessageForBcc = '';
            this.tempBcc = JSON.parse(JSON.stringify(Bcc));
            Bcc.IsEdit = true;
        }
        else {
            this.errorMessageForBcc = 'Another card is on process';
        }
    }
    unEditBcc(Bcc) {
        if (this.tempBcc.Email) {
            var index = this.listOfBcc.findIndex(x => x.Id === Bcc.Id);
            this.listOfBcc[index].Email = JSON.parse(JSON.stringify(this.tempBcc.Email));
            this.listOfBcc[index].IsEdit = false;
            this.tempBcc = new institute_management_model_1.EmailBccAndCc();
        }
        else {
            Bcc.IsEdit = false;
            if (!Bcc.Email) {
                this.removeBcc(Bcc);
            }
        }
    }
    removeBcc(Bcc) {
        var index = this.listOfBcc.findIndex(x => x.Id === Bcc.Id);
        this.listOfBcc.splice(index, 1);
    }
    isAllowedToSaveBcc() {
        var anyEdit = this.listOfBcc.filter(x => x.IsEdit === true);
        return (anyEdit.length === 0);
    }
    addCcCard() {
        var anyEdit = this.listOfcc.filter(x => x.IsEdit === true);
        if (anyEdit.length === 0) {
            this.errorMessageForCc = '';
            const cc = new institute_management_model_1.EmailBccAndCc();
            cc.Id = this.ccId;
            cc.IsEdit = true;
            this.ccId++;
            this.listOfcc.push(cc);
        }
        else {
            this.errorMessageForCc = 'Another card is on process';
        }
    }
    saveCc(cc) {
        cc.IsEdit = false;
    }
    editCc(cc) {
        var anyEdit = this.listOfcc.filter(x => x.IsEdit === true);
        if (anyEdit.length === 0) {
            this.errorMessageForCc = '';
            this.tempCc = JSON.parse(JSON.stringify(cc));
            cc.IsEdit = true;
        }
        else {
            this.errorMessageForCc = 'Another card is on process';
        }
    }
    unEditCc(cc) {
        if (this.tempCc.Email) {
            var index = this.listOfcc.findIndex(x => x.Id === cc.Id);
            this.listOfcc[index].Email = JSON.parse(JSON.stringify(this.tempCc.Email));
            this.listOfcc[index].IsEdit = false;
            this.tempCc = new institute_management_model_1.EmailBccAndCc();
        }
        else {
            cc.IsEdit = false;
            if (!cc.Email) {
                this.removeCc(cc);
            }
        }
    }
    removeCc(Bcc) {
        var index = this.listOfcc.findIndex(x => x.Id === Bcc.Id);
        this.listOfcc.splice(index, 1);
    }
    isAllowedToSaveCc() {
        var anyEdit = this.listOfcc.filter(x => x.IsEdit === true);
        return (anyEdit.length === 0);
    }
    getAllUser() {
        this.loaderService.toggleLoader(true);
        this.instituteManagementService.getAllUser().then(res => {
            this.users = res.json();
            this.loaderService.toggleLoader(false);
        });
    }
    mapClicked($event) {
        this.markers.lat = $event.coords.lat;
        this.markers.lng = $event.coords.lng;
    }
    handleAddressChange(address) {
        this.lng = address.geometry.location.lng();
        this.lat = address.geometry.location.lat();
        this.markers.lat = address.geometry.location.lat();
        this.markers.lng = address.geometry.location.lng();
    }
};
InstituteManagementAddComponent = __decorate([
    core_1.Component({
        moduleId: module.id,
        templateUrl: 'institute-management-add.html'
    }),
    __metadata("design:paramtypes", [institute_management_service_1.InstituteManagementService, snackbar_service_1.SnackbarService,
        router_1.Router, loader_service_1.LoaderService])
], InstituteManagementAddComponent);
exports.InstituteManagementAddComponent = InstituteManagementAddComponent;
//# sourceMappingURL=institute-management-add.component.js.map