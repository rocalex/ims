import { Injectable } from '@angular/core';
import { HttpService } from '../../../../core/http.service';

@Injectable()
export class SlabManagementService {
  SlabManagementUrl = 'api/slabmanagement';
  constructor(private http: HttpService) { }

  addInstituteSlab(slab: any) {
    return this.http.post(this.SlabManagementUrl, slab);
  }

  getAllInstituteSlab() {
    return this.http.get(this.SlabManagementUrl);
  }

  getInstituteSlabDetail(slabId: number) {
    return this.http.get(this.SlabManagementUrl + '/' + slabId);
  }

  updateInstituteSlab(slab: any) {
    return this.http.put(this.SlabManagementUrl, slab);
  }
}
