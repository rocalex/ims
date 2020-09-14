import { Injectable } from '@angular/core';
import { HttpService } from '../../../core/http.service';
import { UpdateAutoSequenceGeneratorManagementAc } from './auto-sequence.model';

@Injectable()
export class AutoSequenceManagementService {
  AutoSequenceManagementUrl = 'api/autosequencegeneratormanagement';
  constructor(private http: HttpService) { }

  updateAutoSequenceGenerator(updateAutoSequence: UpdateAutoSequenceGeneratorManagementAc) {
    return this.http.put(this.AutoSequenceManagementUrl, updateAutoSequence);
  }

  getSequenceGenerators(type: string) {
    return this.http.get(this.AutoSequenceManagementUrl + '/' + type);
  }
}
