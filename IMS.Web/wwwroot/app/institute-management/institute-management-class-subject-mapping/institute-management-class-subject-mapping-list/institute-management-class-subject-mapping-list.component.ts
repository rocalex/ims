import { Component, OnInit } from '@angular/core';

import { LoaderService } from '../../../../shared/loader-service';
import { SnackbarService } from '../../../../shared/snackbar-service';
import { ClassSubjectMappingManagementService } from '../institute-management-class-subject-mapping.service';
import { ClassManagementService } from '../../institute-management-class/institute-management-class.service';

@Component({
  moduleId: module.id,
  templateUrl: 'institute-management-class-subject-mapping-list.html'
})
export class ListClassSubjectMappingManagementComponent implements OnInit {

  classes: any[] = [];
  classSubjectMappings: any[] = [];
  faculties: any[] = [];
  selectedClassId: number;
  updatedClassSubjectsMappingList: any[] = [];
  errorMessage: string = '';

  constructor(private classSubjectMappingManagementService: ClassSubjectMappingManagementService,
    private classManagementService: ClassManagementService,
    private loaderService: LoaderService,
    private snackBar: SnackbarService) { }

  ngOnInit() {
    this.selectedClassId = 0;
    this.faculties = [];
    this.classSubjectMappings = [];
    this.classes = [];
    this.errorMessage = undefined;
    this.getClasses();
  }

  // Method for fetching the classes
  getClasses() {
    this.loaderService.toggleLoader(true);
    this.classManagementService.getInstituteInstituteClasssList()
      .then(res => {
        this.classes = res.json();

        this.loaderService.toggleLoader(false);
      })
      .catch(err => {
        console.log(err.json());
        this.loaderService.toggleLoader(false);
      });
  }

  // Method for fetching the class-subject mappings by class id
  getClassSubjectMappingDetails() {
    this.updatedClassSubjectsMappingList = [];
    this.errorMessage = '';
    this.loaderService.toggleLoader(true);
    this.classSubjectMappingManagementService.getClassSubjectMappingsByClassId(this.selectedClassId)
      .then(res => {
        let response = res.json();

        this.faculties = response.faculties;
        this.classSubjectMappings = response.classSubjectMappings;

        this.loaderService.toggleLoader(false);
      })
      .catch(err => {
        this.loaderService.toggleLoader(false);
        console.log(err.json());
      });
  }

  // Method for mapping class and subject
  mapClassSubject(classSubjectMapping: any) {
    classSubjectMapping.isUpdated = (classSubjectMapping.isUpdated === null || classSubjectMapping.isUpdated === undefined) ? true : !classSubjectMapping.isUpdated;
    if (!classSubjectMapping.isMapped) {
      classSubjectMapping.facultyId = 0;
      classSubjectMapping.alternateFacultyId = 0;
    }

    this.updatedClassSubjectsMappingList.push(classSubjectMapping);
    this.updatedClassSubjectsMappingList = this.updatedClassSubjectsMappingList.filter(x => x.isUpdated);
  }

  // Method for updating mappings
  updateAssignedStaff(classSubjectMapping: any) {
    classSubjectMapping.isUpdated = true;

    let existingMapping = this.updatedClassSubjectsMappingList.filter(x => x.id === classSubjectMapping.id && x.subjectId === classSubjectMapping.subjectId)[0];
    if (existingMapping === null || existingMapping === undefined) {
      this.updatedClassSubjectsMappingList.push(classSubjectMapping);
      this.updatedClassSubjectsMappingList = this.updatedClassSubjectsMappingList.filter(x => x.isUpdated);
    }
  }

  // Method for updating the class subject mappings
  bulkUpdateClassSubjectMappings() {
    let invalidMapping = this.updatedClassSubjectsMappingList.filter(x => x.isMapped
      && (x.facultyId === null || x.facultyId === undefined || x.facultyId === 0
        || x.alternateFacultyId === null || x.alternateFacultyId === undefined || x.alternateFacultyId === 0));

    if (invalidMapping.length === 0 && this.updatedClassSubjectsMappingList.length > 0) {
      this.loaderService.toggleLoader(true);
      this.classSubjectMappingManagementService.bulkUpdateClassSubjectMappings(this.updatedClassSubjectsMappingList)
        .then(res => {
          let response = res.json();
          this.loaderService.toggleLoader(false);
          this.snackBar.showSnackbar(response.message);
          this.getClassSubjectMappingDetails();
        })
        .catch(err => {
          this.loaderService.toggleLoader(false);
        });
    }
    else if (invalidMapping.length !== 0) {
      this.errorMessage = 'Please select faculty and alternate faculty for the selected subject(s)';
    }
  }

  cancelEditing() {
    this.ngOnInit();
  }
}
