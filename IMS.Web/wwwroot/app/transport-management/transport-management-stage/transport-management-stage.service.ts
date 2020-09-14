import { Injectable } from '@angular/core';
import { HttpService } from '../../../core/http.service';

@Injectable()
export class StageService {
  StageManagementUrl = 'api/transportationstagemanagement';
  constructor(private http: HttpService) { }

  addStage(stage: any) {
    return this.http.post(this.StageManagementUrl, stage);
  }

  getStages() {
    return this.http.get(this.StageManagementUrl);
  }

  getStage(stageId: number) {
    return this.http.get(this.StageManagementUrl + '/' + stageId);
  }

  updateStage(stage: any) {
    return this.http.put(this.StageManagementUrl, stage);
  }

  getInitialData() {
    return this.http.get(this.StageManagementUrl + '/initialdata');
  }
}
