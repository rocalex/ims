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
const loader_service_1 = require("../../../../shared/loader-service");
const router_1 = require("@angular/router");
const snackbar_service_1 = require("../../../../shared/snackbar-service");
const student_management_promotion_service_1 = require("../student-management-promotion.service");
let EditAndDetailStudentPromotionManagementComponent = class EditAndDetailStudentPromotionManagementComponent {
    constructor(studentManagementService, loaderService, router, snackBar, activeRoute) {
        this.studentManagementService = studentManagementService;
        this.loaderService = loaderService;
        this.router = router;
        this.snackBar = snackBar;
        this.activeRoute = activeRoute;
        this.student = {};
        this.initialData = {};
        this.promotionClassesList = [];
    }
    ngOnInit() {
        this.activeRoute.params.subscribe(res => this.promotionId = res.id);
        this.getStudentDetail();
    }
    getStudentDetail() {
        this.loaderService.toggleLoader(true);
        this.studentManagementService.getStudentDetail(this.promotionId).then(res => {
            var response = res.json();
            if (response.message) {
                this.snackBar.showSnackbar(response.message);
                this.router.navigate(['student', 'promotion', 'list']);
            }
            else {
                this.student = response;
                this.getIntialDataForPromotion();
            }
            this.loaderService.toggleLoader(false);
        });
    }
    getIntialDataForPromotion() {
        this.loaderService.toggleLoader(true);
        this.studentManagementService.getIntialDataForPromotion().then(res => {
            this.initialData = res.json();
            this.promotionClasses();
            this.loaderService.toggleLoader(false);
        });
    }
    promotionClasses() {
        this.promotionClassesList = [];
        for (var i = 0; i < this.initialData.classes.length; i++) {
            var data = this.initialData.classes[i];
            if (data.id !== this.student.currentClassId) {
                this.promotionClassesList.push(data);
            }
        }
    }
    updateStudent() {
        this.loaderService.toggleLoader(true);
        this.studentManagementService.updateStudent(this.student).then(res => {
            var response = res.json();
            if (!response.hasError) {
                this.router.navigate(['student', 'promotion', 'list']);
            }
            this.snackBar.showSnackbar(response.message);
            this.loaderService.toggleLoader(false);
        });
    }
};
EditAndDetailStudentPromotionManagementComponent = __decorate([
    core_1.Component({
        moduleId: module.id,
        templateUrl: 'student-management-promotion-edit-detail.html'
    }),
    __metadata("design:paramtypes", [student_management_promotion_service_1.StudentPromotionManagementService, loader_service_1.LoaderService,
        router_1.Router, snackbar_service_1.SnackbarService, router_1.ActivatedRoute])
], EditAndDetailStudentPromotionManagementComponent);
exports.EditAndDetailStudentPromotionManagementComponent = EditAndDetailStudentPromotionManagementComponent;
//# sourceMappingURL=student-management-promotion-edit-detail.component.js.map