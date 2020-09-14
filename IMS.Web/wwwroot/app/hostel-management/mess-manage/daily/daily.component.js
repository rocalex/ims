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
const daily_model_1 = require("./daily.model");
const daily_service_1 = require("./daily.service");
const loader_service_1 = require("../../../../shared/loader-service");
const snackbar_service_1 = require("../../../../shared/snackbar-service");
const permission_service_1 = require("../../../../shared/permission.service");
let DailyComponent = class DailyComponent {
    constructor(apiService, loaderService, snackBar, permissionService) {
        this.apiService = apiService;
        this.loaderService = loaderService;
        this.snackBar = snackBar;
        this.permissionService = permissionService;
        this.searchDaily = new daily_model_1.SearchDailyExpenseRequest();
        this.hostelList = [];
        this.messManageList = [];
        this.expenseTypeList = [];
        this.dailyExpenses = [];
        this.isSearched = false;
        this.totalfiles = [];
        this.totalFileName = [];
    }
    ngOnInit() {
        this.getHostelList();
    }
    getHostelList() {
        this.loaderService.toggleLoader(true);
        this.apiService.getHostelList().then(res => {
            let response = res.json();
            if (response.hasError !== null && response.hasError !== undefined && response.hasError) {
                this.snackBar.showSnackbar(response.message);
                this.loaderService.toggleLoader(false);
                return;
            }
            this.hostelList = response;
            this.getExpenseTypeList();
        }).catch(e => {
            this.loaderService.toggleLoader(false);
        });
    }
    getMessManageList(hostelId) {
        this.loaderService.toggleLoader(true);
        this.apiService.getMessManageList(hostelId).then(res => {
            let response = res.json();
            this.loaderService.toggleLoader(false);
            if (response.hasError !== null && response.hasError !== undefined && response.hasError) {
                this.snackBar.showSnackbar(response.message);
                return;
            }
            this.messManageList = response;
        }).catch(e => {
            this.loaderService.toggleLoader(false);
        });
    }
    getExpenseTypeList() {
        this.apiService.getExpenseTypeList().then(res => {
            let response = res.json();
            this.loaderService.toggleLoader(false);
            if (response.hasError !== null && response.hasError !== undefined && response.hasError) {
                this.snackBar.showSnackbar(response.message);
                return;
            }
            this.expenseTypeList = response;
        }).catch(e => {
            this.loaderService.toggleLoader(false);
        });
    }
    search() {
        this.loaderService.toggleLoader(true);
        this.apiService.getDailyExpenseList(this.searchDaily).then(res => {
            let response = res.json();
            this.loaderService.toggleLoader(false);
            if (response.hasError !== null && response.hasError !== undefined && response.hasError) {
                this.snackBar.showSnackbar(response.message);
                return;
            }
            this.dailyExpenses = response;
            this.isSearched = true;
        }).catch(e => {
            this.loaderService.toggleLoader(false);
        });
    }
    save() {
        this.loaderService.toggleLoader(true);
        this.apiService.saveDailyExpenses(this.dailyExpenses).then(res => {
            let response = res.json();
            if (response.hasError !== null && response.hasError !== undefined && response.hasError) {
                this.snackBar.showSnackbar(response.message);
                this.loaderService.toggleLoader(false);
                return;
            }
            this.dailyExpenses = response.result;
            this.addProofUrl(this.dailyExpenses);
            this.isSearched = false;
        }).catch(e => {
            this.loaderService.toggleLoader(false);
        });
    }
    fileSelectionChange(fileInput, index) {
        if (fileInput.target.files && fileInput.target.files[0]) {
            var reader = new FileReader();
            reader.onload = (event) => {
            };
            this.totalfiles[index] = (fileInput.target.files[0]);
            this.totalFileName[index] = fileInput.target.files[0].name;
            reader.readAsDataURL(fileInput.target.files[0]);
        }
    }
    addProofUrl(results) {
        let main_form = new FormData();
        for (let j = 0; j < this.totalfiles.length; j++) {
            console.log("the values is ", this.totalfiles[j]);
            console.log("the name is ", this.totalFileName[j]);
            main_form.append(this.totalFileName[j], this.totalfiles[j]);
        }
        //reverseFileNames=this.totalFileName.reverse();
        let AllFilesObj = [];
        results.forEach((result, index) => {
            let eachObj = {
                'id': result.id,
                'file_name': this.totalFileName[index]
            };
            AllFilesObj.push(eachObj);
        });
        //console.log("the Array data is ",AllFilesObj);
        main_form.append("fileInfo", JSON.stringify(AllFilesObj));
        this.apiService.uploadProfileProof(main_form).then(data => {
            this.loaderService.toggleLoader(false);
        }).catch(err => {
            this.loaderService.toggleLoader(false);
        });
    }
};
DailyComponent = __decorate([
    core_1.Component({
        selector: 'app-daily',
        templateUrl: './daily.component.html',
        styleUrls: ['./daily.component.css']
    }),
    __metadata("design:paramtypes", [daily_service_1.DailyExpenseService,
        loader_service_1.LoaderService,
        snackbar_service_1.SnackbarService,
        permission_service_1.PermissionService])
], DailyComponent);
exports.DailyComponent = DailyComponent;
//# sourceMappingURL=daily.component.js.map