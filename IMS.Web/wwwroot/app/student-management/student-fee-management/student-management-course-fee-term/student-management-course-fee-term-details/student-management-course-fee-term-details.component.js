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
const snackbar_service_1 = require("../../../../../shared/snackbar-service");
const student_management_course_fee_term_service_1 = require("../student-management-course-fee-term.service");
const shared_service_1 = require("../../../../../shared/shared.service");
const student_management_course_fee_term_model_1 = require("../student-management-course-fee-term.model");
const institute_management_class_model_1 = require("../../../../institute-management/institute-management-class/institute-management-class.model");
let CourseFeeTermDetailsManagementComponent = class CourseFeeTermDetailsManagementComponent {
    constructor(router, activatedRoute, loaderService, snackbarService, courseFeeTermsManagementService, sharedService) {
        this.router = router;
        this.activatedRoute = activatedRoute;
        this.loaderService = loaderService;
        this.snackbarService = snackbarService;
        this.courseFeeTermsManagementService = courseFeeTermsManagementService;
        this.sharedService = sharedService;
        this.class = new institute_management_class_model_1.AddInstituteClass();
        this.religionsList = [];
        this.feeComponentsList = [];
        this.academicYearsList = [];
        this.feeTermList = [];
        this.courseFeeTermsList = [];
        this.globallySelectedAcademicYear = {};
        this.addCourseFeeTerm = new student_management_course_fee_term_model_1.AddCourseFeeTerm();
        this.activatedRoute.params.subscribe(param => this.classId = param.classId);
    }
    ngOnInit() {
        this.sharedService.currentAcademicYear.subscribe(res => {
            this.globallySelectedAcademicYear = res;
            if (this.globallySelectedAcademicYear !== null && this.globallySelectedAcademicYear !== undefined) {
                this.isEditable = false;
                this.addCourseFeeTerm.courseFeeTermAc = new student_management_course_fee_term_model_1.CourseFeeTerm();
                this.addCourseFeeTerm.courseFeeTermDetailsList = [];
                this.getCourseFeeTermInitialData();
            }
        });
    }
    getCourseFeeTermInitialData() {
        this.loaderService.toggleLoader(true);
        this.courseFeeTermsManagementService.getCourseFeeTermInitialData(this.classId)
            .then(res => {
            let response = res.json();
            this.class.Name = response.class.name;
            this.class.NumberOfFeeTerms = response.class.numberOfFeeTerms;
            this.class.GroupCode = response.class.groupCode;
            this.religionsList = response.religionsList;
            this.feeComponentsList = response.feeComponentsList;
            this.academicYearsList = response.academicYearsList;
            this.courseFeeTermsList = response.courseFeeTermsList;
            // Set fee terms list
            this.feeTermList = [];
            this.feeTermList.push({ key: 0, value: 'Applicable to all terms' });
            for (let i = 0; i < this.class.NumberOfFeeTerms; i++) {
                this.feeTermList.push({ key: i + 1, value: (i + 1).toString() });
            }
            let activeAcademicYear = this.academicYearsList.filter(x => x.isActive)[0];
            this.isEditable = (activeAcademicYear !== null && activeAcademicYear !== undefined && activeAcademicYear.id === this.globallySelectedAcademicYear.id);
            this.getCourseFeeTermByAcademicYear(this.globallySelectedAcademicYear.id, 0);
            // Set fee component details
            this.refreshCourseFeeDetailsList();
            this.loaderService.toggleLoader(false);
        })
            .catch(err => {
            this.loaderService.toggleLoader(false);
        });
    }
    getDistributedFeeStructure() {
        if (this.addCourseFeeTerm.term !== 0) {
            this.loaderService.toggleLoader(true);
            this.courseFeeTermsManagementService.getDistributedFeeStructure(this.addCourseFeeTerm.courseFeeTermAc.id, this.addCourseFeeTerm.term)
                .then(res => {
                this.addCourseFeeTerm.courseFeeTermDetailsList = res.json();
                this.loaderService.toggleLoader(false);
            })
                .catch(err => {
                this.loaderService.toggleLoader(false);
            });
        }
        else {
            this.refreshCourseFeeDetailsList();
        }
    }
    getCourseFeeTermByAcademicYear(academicYearId, religionId) {
        this.addCourseFeeTerm.term = 0;
        let academicYearCourseFeeTermsList = [];
        if (academicYearId !== null && academicYearId !== undefined && academicYearId !== 0 && (religionId === null || religionId === undefined || religionId === 0)) {
            academicYearCourseFeeTermsList = this.courseFeeTermsList.filter(x => x.academicYearId === academicYearId);
        }
        else if (religionId !== null && religionId !== undefined && religionId !== 0 && (academicYearId === null || academicYearId === undefined || academicYearId === 0)) {
            academicYearCourseFeeTermsList = this.courseFeeTermsList.filter(x => x.religionId === religionId);
        }
        else if (religionId !== null && religionId !== undefined && religionId !== 0 && academicYearId !== null && academicYearId !== undefined && academicYearId !== 0) {
            academicYearCourseFeeTermsList = this.courseFeeTermsList.filter(x => x.academicYearId === academicYearId && x.religionId === religionId);
        }
        if (academicYearCourseFeeTermsList.length > 0) {
            this.addCourseFeeTerm.courseFeeTermAc = JSON.parse(JSON.stringify(academicYearCourseFeeTermsList[0]));
        }
        else {
            this.addCourseFeeTerm.courseFeeTermAc = new student_management_course_fee_term_model_1.CourseFeeTerm();
            this.addCourseFeeTerm.courseFeeTermAc.academicYearId = academicYearId;
            this.addCourseFeeTerm.courseFeeTermAc.religionId = religionId;
            this.addCourseFeeTerm.courseFeeTermAc.classId = this.classId;
            this.addCourseFeeTerm.courseFeeTermAc.lateFee = 0;
        }
        this.getDistributedFeeStructure();
    }
    refreshCourseFeeDetailsList() {
        this.addCourseFeeTerm.courseFeeTermDetailsList = [];
        this.feeComponentsList.forEach(x => {
            let courseFeeTermDetail = new student_management_course_fee_term_model_1.CourseFeeTermDetails();
            courseFeeTermDetail.amount = 0;
            courseFeeTermDetail.courseFeeTermId = 0;
            courseFeeTermDetail.feeComponentId = x.id;
            courseFeeTermDetail.feeComponentName = x.name;
            this.addCourseFeeTerm.courseFeeTermDetailsList.push(courseFeeTermDetail);
        });
    }
    saveCourseFeeDetails() {
        this.loaderService.toggleLoader(true);
        this.courseFeeTermsManagementService.saveCourseFeeDetails(this.addCourseFeeTerm)
            .then(res => {
            let response = res.json();
            if (response.hasError === null || response.hasError === undefined || !response.hasError) {
                this.snackbarService.showSnackbar(response.message);
                this.router.navigate(['student', 'feemanagement', 'coursefeeterms']);
                //this.ngOnInit();
            }
            this.loaderService.toggleLoader(false);
        })
            .catch(err => {
            this.loaderService.toggleLoader(false);
        });
    }
};
CourseFeeTermDetailsManagementComponent = __decorate([
    core_1.Component({
        moduleId: module.id,
        templateUrl: 'student-management-course-fee-term-details.html'
    }),
    __metadata("design:paramtypes", [router_1.Router,
        router_1.ActivatedRoute,
        loader_service_1.LoaderService,
        snackbar_service_1.SnackbarService,
        student_management_course_fee_term_service_1.CourseFeeTermsManagementService,
        shared_service_1.SharedService])
], CourseFeeTermDetailsManagementComponent);
exports.CourseFeeTermDetailsManagementComponent = CourseFeeTermDetailsManagementComponent;
//# sourceMappingURL=student-management-course-fee-term-details.component.js.map