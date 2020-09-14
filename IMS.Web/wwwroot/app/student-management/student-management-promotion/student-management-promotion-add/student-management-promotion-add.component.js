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
const student_management_promotion_model_1 = require("../student-management-promotion.model");
let AddStudentPromotionManagementComponent = class AddStudentPromotionManagementComponent {
    constructor(studentManagementService, loaderService, router, snackBar) {
        this.studentManagementService = studentManagementService;
        this.loaderService = loaderService;
        this.router = router;
        this.snackBar = snackBar;
        this.students = [];
        this.selectedStudent = [];
        this.initialData = {};
        this.promotionClassesList = [];
        this.allSelected = false;
        this.indeterminate = false;
    }
    ngOnInit() {
        this.getIntialDataForPromotion();
    }
    getIntialDataForPromotion() {
        this.loaderService.toggleLoader(true);
        this.studentManagementService.getIntialDataForPromotion().then(res => {
            this.initialData = res.json();
            this.loaderService.toggleLoader(false);
        });
    }
    promotionClasses() {
        this.promotionClassesList = [];
        for (var i = 0; i < this.initialData.classes.length; i++) {
            var data = this.initialData.classes[i];
            if (data.id !== this.currentSelectedClass.id) {
                this.promotionClassesList.push(data);
            }
        }
    }
    getStudentByClassId() {
        this.loaderService.toggleLoader(true);
        this.studentManagementService.getStudentByClassId(this.currentSelectedClass.id, this.currentSelectedSection.id).then(res => {
            this.students = res.json();
            if (this.students.length === 0) {
                this.snackBar.showSnackbar('No student found for the selected class and section');
            }
            this.loaderService.toggleLoader(false);
        });
    }
    addStudentDetail() {
        this.loaderService.toggleLoader(true);
        var list = [];
        var studentSelected = this.students.filter(x => x.isSelected === true);
        for (var i = 0; i < studentSelected.length; i++) {
            var data = new student_management_promotion_model_1.AddStudentInformationManagementAc();
            data.CurrentClassId = this.currentSelectedClass.id;
            data.CurrentSectionId = this.currentSelectedSection.id;
            data.PromotedToClassId = this.promotionSelectedClass.id;
            data.PromotedToSectionId = this.promotionSelectedSection.id;
            data.Remark = studentSelected[i].remark;
            data.StudentId = studentSelected[i].id;
            list.push(data);
        }
        this.studentManagementService.addStudentDetail(list).then(res => {
            var response = res.json();
            if (!response.hasError) {
                this.router.navigate(['student', 'promotion', 'list']);
            }
            this.snackBar.showSnackbar(response.message);
            this.loaderService.toggleLoader(false);
        });
    }
    checkboxChange() {
        var selected = this.students.filter(x => x.isSelected === true);
        if (selected.length) {
            this.indeterminate = (selected.length !== this.students.length);
            this.allSelected = !this.indeterminate;
        }
        else {
            this.indeterminate = false;
            this.allSelected = false;
        }
    }
    selectAll() {
        this.indeterminate = false;
        for (var i = 0; i < this.students.length; i++) {
            this.students[i].isSelected = this.allSelected;
        }
    }
    isAllowedToSave() {
        var count = this.students.filter(x => x.isSelected === true);
        return (count.length !== 0);
    }
};
AddStudentPromotionManagementComponent = __decorate([
    core_1.Component({
        moduleId: module.id,
        templateUrl: 'student-management-promotion-add.html'
    }),
    __metadata("design:paramtypes", [student_management_promotion_service_1.StudentPromotionManagementService, loader_service_1.LoaderService,
        router_1.Router, snackbar_service_1.SnackbarService])
], AddStudentPromotionManagementComponent);
exports.AddStudentPromotionManagementComponent = AddStudentPromotionManagementComponent;
//# sourceMappingURL=student-management-promotion-add.component.js.map