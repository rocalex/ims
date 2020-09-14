import { Injectable } from '@angular/core';
import { HttpService } from '../../../core/http.service';

@Injectable()
export class ClassSubjectMappingManagementService {

    ClassSubjectMappingManagementUrl = 'api/classsubjectmapping';

    constructor(private http: HttpService) { }

    // Method for fetching the class-subject mappings by class id
    getClassSubjectMappingsByClassId(selectedClassId: number) {
        return this.http.get(this.ClassSubjectMappingManagementUrl + '/' + selectedClassId);
    }

    // Method for updating the class subject mappings
    bulkUpdateClassSubjectMappings(updatedClassSubjectsMappingList: any[]) {
        return this.http.put(this.ClassSubjectMappingManagementUrl, updatedClassSubjectsMappingList);
    }
}
