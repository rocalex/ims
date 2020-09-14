import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { LoaderService } from '../../../../../shared/loader-service';
import { SnackbarService } from '../../../../../shared/snackbar-service';
import { CourseFeeTermsManagementService } from '../student-management-course-fee-term.service';
import { SharedService } from '../../../../../shared/shared.service';

import { AddCourseFeeTerm, CourseFeeTerm, CourseFeeTermDetails } from '../student-management-course-fee-term.model';
import { AddInstituteClass } from '../../../../institute-management/institute-management-class/institute-management-class.model';

@Component({
    moduleId: module.id,
    templateUrl: 'student-management-course-fee-term-details.html'
})
export class CourseFeeTermDetailsManagementComponent implements OnInit {

    classId: number;
    class: AddInstituteClass = new AddInstituteClass();
    religionsList: any[] = [];
    feeComponentsList: any[] = [];
    academicYearsList: any[] = [];
    feeTermList: any[] = [];
    courseFeeTermsList: any[] = [];
    globallySelectedAcademicYear: any = {};
    isEditable: boolean;

    addCourseFeeTerm: AddCourseFeeTerm = new AddCourseFeeTerm();

    constructor(private router: Router,
        private activatedRoute: ActivatedRoute,
        private loaderService: LoaderService,
        private snackbarService: SnackbarService,
        private courseFeeTermsManagementService: CourseFeeTermsManagementService,
        private sharedService: SharedService) {

        this.activatedRoute.params.subscribe(param => this.classId = param.classId);
    }

    ngOnInit() {
        this.sharedService.currentAcademicYear.subscribe(res => {
            this.globallySelectedAcademicYear = res;
            if (this.globallySelectedAcademicYear !== null && this.globallySelectedAcademicYear !== undefined) {
                this.isEditable = false;
                this.addCourseFeeTerm.courseFeeTermAc = new CourseFeeTerm();
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

    getCourseFeeTermByAcademicYear(academicYearId: number, religionId: number) {
        this.addCourseFeeTerm.term = 0;
        
        let academicYearCourseFeeTermsList = [];
        if (academicYearId !== null && academicYearId !== undefined && academicYearId !== 0 && (religionId === null || religionId === undefined || religionId === 0)) {
            academicYearCourseFeeTermsList = this.courseFeeTermsList.filter(x => x.academicYearId === academicYearId);
        }
        else if(religionId !== null && religionId !== undefined && religionId !== 0 && (academicYearId === null || academicYearId === undefined || academicYearId === 0)) {
            academicYearCourseFeeTermsList = this.courseFeeTermsList.filter(x => x.religionId === religionId);
        }
        else if (religionId !== null && religionId !== undefined && religionId !== 0 && academicYearId !== null && academicYearId !== undefined && academicYearId !== 0) {
            academicYearCourseFeeTermsList = this.courseFeeTermsList.filter(x => x.academicYearId === academicYearId && x.religionId === religionId);
        }

        if (academicYearCourseFeeTermsList.length > 0) {
            this.addCourseFeeTerm.courseFeeTermAc = JSON.parse(JSON.stringify(academicYearCourseFeeTermsList[0]));
        }
        else {
            this.addCourseFeeTerm.courseFeeTermAc = new CourseFeeTerm();

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
            let courseFeeTermDetail = new CourseFeeTermDetails();
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
}
