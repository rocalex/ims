import { Injectable } from '@angular/core';
import { HttpService } from '../../../../core/http.service';

@Injectable()
export class LevelManagementService {
  LevelManagementUrl = 'api/levelmanagement';
  constructor(private http: HttpService) { }

  addInstituteLevel(level: any) {
    return this.http.post(this.LevelManagementUrl, level);
  }

  getAllInstituteLevel() {
    return this.http.get(this.LevelManagementUrl);
  }

  getInstituteLevelDetail(levelId: number) {
    return this.http.get(this.LevelManagementUrl + '/' + levelId);
  }

  updateInstituteLevel(level: any) {
    return this.http.put(this.LevelManagementUrl, level);
  }
}
