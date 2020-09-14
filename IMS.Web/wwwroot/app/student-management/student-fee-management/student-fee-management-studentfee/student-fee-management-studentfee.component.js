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
const student_fee_management_studentfee_service_1 = require("./student-fee-management-studentfee.service");
const loader_service_1 = require("../../../../shared/loader-service");
const snackbar_service_1 = require("../../../../shared/snackbar-service");
let StudentFeeManagementStudentFeeComponent = class StudentFeeManagementStudentFeeComponent {
    constructor(studentFeeManagementStudentFeeService, loaderService, snackBar) {
        this.studentFeeManagementStudentFeeService = studentFeeManagementStudentFeeService;
        this.loaderService = loaderService;
        this.snackBar = snackBar;
        this.initialData = {};
        this.students = [];
        this.studentFee = {};
        this.individualPreviewTable = [];
        this.discountPreviewTable = [];
        this.previewColumns = [];
    }
    ngOnInit() {
        this.studentFee = {};
        this.students = [];
        this.studentId = 0;
        this.individualPreviewTable = [];
        this.discountPreviewTable = [];
        this.getInitialData();
        this.currentSelectedClass = {};
        this.currentSelectedSection = {};
    }
    getInitialData() {
        this.loaderService.toggleLoader(true);
        this.studentFeeManagementStudentFeeService.getInitialData().then(res => {
            this.initialData = res.json();
            this.loaderService.toggleLoader(false);
        });
    }
    getStudentByClassAndSectionId() {
        this.loaderService.toggleLoader(true);
        this.studentFeeManagementStudentFeeService.getStudentByClassAndSectionId(this.currentSelectedClass.id, this.currentSelectedSection.id).then(res => {
            this.students = res.json();
            this.loaderService.toggleLoader(false);
        });
    }
    getStudentFee(studentId) {
        this.loaderService.toggleLoader(true);
        this.studentFeeManagementStudentFeeService.getStudentFee(studentId).then(res => {
            var response = res.json();
            if (response.hasError) {
                this.snackBar.showSnackbar(response.message);
            }
            else {
                this.studentFee = response.data.studentFee;
                this.individualPreviewTable = [];
                this.discountPreviewTable = [];
                for (var i = 0; i < response.data.discount.length; i++) {
                    var components = this.studentFee.studentFeeComponents.filter(x => x.individualOrDiscountFeeComponentId === response.data.discount[i].id);
                    var data = { Name: response.data.discount[i].name, list: [] };
                    for (var j = 1; j <= this.studentFee.class.numberOfFeeTerms; j++) {
                        data.list.push(components.find(x => x.termOrderId === j));
                    }
                    this.discountPreviewTable.push(data);
                }
                for (var i = 0; i < response.data.individual.length; i++) {
                    var components = this.studentFee.studentFeeComponents.filter(x => x.individualOrDiscountFeeComponentId === response.data.individual[i].id);
                    var data = { Name: response.data.individual[i].name, list: [] };
                    for (var j = 1; j <= this.studentFee.class.numberOfFeeTerms; j++) {
                        data.list.push(components.find(x => x.termOrderId === j));
                    }
                    this.individualPreviewTable.push(data);
                }
                this.previewColumns = [];
                for (var j = 1; j <= this.studentFee.class.numberOfFeeTerms; j++) {
                    this.previewColumns.push(j);
                }
            }
            this.loaderService.toggleLoader(false);
        });
    }
    onlyUnique(value, index, self) {
        return self.indexOf(value) === index;
    }
    updateStudentFee() {
        this.loaderService.toggleLoader(true);
        var list = [];
        var individual = this.individualPreviewTable.map(x => x.list);
        for (var i = 0; i < individual.length; i++) {
            for (var j = 0; j < individual[i].length; j++) {
                list.push(individual[i][j]);
            }
        }
        var discount = this.discountPreviewTable.map(x => x.list);
        for (var i = 0; i < discount.length; i++) {
            for (var j = 0; j < discount[i].length; j++) {
                list.push(discount[i][j]);
            }
        }
        this.studentFeeManagementStudentFeeService.updateStudentFee(list, this.studentFee.id).then(res => {
            var response = res.json();
            if (response.hasError) {
                this.snackBar.showSnackbar(response.message);
            }
            else {
                this.ngOnInit();
            }
            this.loaderService.toggleLoader(false);
        });
    }
};
StudentFeeManagementStudentFeeComponent = __decorate([
    core_1.Component({
        moduleId: module.id,
        templateUrl: 'student-fee-management-studentfee.html'
    }),
    __metadata("design:paramtypes", [student_fee_management_studentfee_service_1.StudentFeeManagementStudentFeeService,
        loader_service_1.LoaderService, snackbar_service_1.SnackbarService])
], StudentFeeManagementStudentFeeComponent);
exports.StudentFeeManagementStudentFeeComponent = StudentFeeManagementStudentFeeComponent;
//# sourceMappingURL=student-fee-management-studentfee.component.js.map