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
const loader_service_1 = require("../../../../../shared/loader-service");
const permission_service_1 = require("../../../../../shared/permission.service");
const snackbar_service_1 = require("../../../../../shared/snackbar-service");
const sidenav_model_1 = require("../../../../../shared/sidenav/sidenav.model");
const expense_model_1 = require("../expense.model");
const expense_service_1 = require("../expense.service");
let EditComponent = class EditComponent {
    constructor(loaderService, permissionService, groupService, activatedRoute, snackBar, router) {
        this.loaderService = loaderService;
        this.permissionService = permissionService;
        this.groupService = groupService;
        this.activatedRoute = activatedRoute;
        this.snackBar = snackBar;
        this.router = router;
        this.errorMessage = '';
        this.addExpense = new expense_model_1.ExpenseModel();
        this.typeList = [
            { id: 0, label: "Expense" },
            { id: 1, label: "Income" }
        ];
        this.activatedRoute.params.subscribe(param => this.expenseId = param.id);
    }
    ngOnInit() {
        this.getExpenseTypeInfo();
    }
    getExpenseTypeInfo() {
        this.loaderService.toggleLoader(true);
        this.groupService.getexpenseTypeById(this.expenseId).then(res => {
            let response = res.json();
            if (response.hasError === null || response.hasError === undefined || !response.hasError) {
                this.addExpense = response;
            }
            else {
                this.router.navigate(['hostel', 'messmanagement', 'expensetype']);
                this.snackBar.showSnackbar(response.message);
            }
            this.loaderService.toggleLoader(false);
        }).catch(err => {
            this.loaderService.toggleLoader(false);
        });
    }
    isAllowed(type) {
        return this.permissionService.isAllowed(sidenav_model_1.UserGroupFeatureParentEnum.Finance, sidenav_model_1.UserGroupFeatureChildEnum.FinanceBasicReciept, type);
    }
    add() {
        this.loaderService.toggleLoader(true);
        this.groupService.updateexpenseType(this.addExpense).then(res => {
            let response = res.json();
            if (response.hasError === null || response.hasError === undefined || !response.hasError) {
                this.snackBar.showSnackbar(response.message);
                this.router.navigate(['hostel', 'messmanagement', 'expensetype']);
            }
            else {
                this.errorMessage = response.message;
            }
            this.loaderService.toggleLoader(false);
        }).catch(err => {
            this.loaderService.toggleLoader(false);
        });
    }
};
EditComponent = __decorate([
    core_1.Component({
        moduleId: module.id,
        templateUrl: './edit.component.html'
    }),
    __metadata("design:paramtypes", [loader_service_1.LoaderService,
        permission_service_1.PermissionService,
        expense_service_1.ExpenseService,
        router_1.ActivatedRoute,
        snackbar_service_1.SnackbarService,
        router_1.Router])
], EditComponent);
exports.EditComponent = EditComponent;
//# sourceMappingURL=edit.component.js.map