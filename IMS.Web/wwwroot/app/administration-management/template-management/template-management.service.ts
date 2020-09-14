import { Injectable } from '@angular/core';

import { HttpService } from '../../../core/http.service';
import { AddTemplate, GetTemplate } from './template-management.model';

@Injectable()
export class TemplateManagementService {
  TemplateManagementUrl = 'api/templatemanagement';
  constructor(private http: HttpService) { }

  addOrUpdateTemplate(template: AddTemplate) {
    return this.http.post(this.TemplateManagementUrl, template);
  }

  getTemplate(template: GetTemplate) {
    return this.http.post(this.TemplateManagementUrl + '/search', template);
  }

  getInitialData() {
    return this.http.get(this.TemplateManagementUrl + '/initialdata');
  }
}
