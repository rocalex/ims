import { Injectable } from '@angular/core';
import { HttpService } from '../../../../core/http.service';

@Injectable()
export class RelationshipManagementService {
  RelationshipManagementUrl = 'api/relationshipmanagement';
  constructor(private http: HttpService) { }

  addInstituteRelationship(relationship: any) {
    return this.http.post(this.RelationshipManagementUrl, relationship);
  }

  getAllInstituteRelationship() {
    return this.http.get(this.RelationshipManagementUrl);
  }

  getInstituteRelationshipDetail(relationshipId: number) {
    return this.http.get(this.RelationshipManagementUrl + '/' + relationshipId);
  }

  updateInstituteRelationship(relationship: any) {
    return this.http.put(this.RelationshipManagementUrl, relationship);
  }
}
