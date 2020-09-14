import { Component, OnInit, ViewChild } from '@angular/core';
import { ResourceFileManagementService } from './resource-file.service';
import { JsonEditorComponent, JsonEditorOptions } from 'ang-jsoneditor';
import { schema } from './schema.value';
import { LoaderService } from '../../shared/loader-service';
import { SnackbarService } from '../../shared/snackbar-service';

@Component({
  moduleId: module.id,
  templateUrl: 'resource-file.html'
})
export class ResourceFileManagementComponent implements OnInit {
  data: any;
  @ViewChild(JsonEditorComponent) editor: JsonEditorComponent;
  options = new JsonEditorOptions();
  fileTypes: string[] = ['English', 'Arabic'];
  selectedType: string;
  constructor(private resourceFileManagementService: ResourceFileManagementService, private loaderService: LoaderService,
    private snackBar: SnackbarService) {
    this.options.mode = 'code';
    this.options.modes = ['code', 'text', 'tree', 'view'];
    this.options.schema = schema;
    this.options.statusBar = false;
  }

  ngOnInit() {
    this.selectedType = this.fileTypes[0];
    this.readResourceFile();
  }

  readResourceFile() {
    this.loaderService.toggleLoader(true);
    this.resourceFileManagementService.readResourceFile(this.selectedType).then(res => {
      this.data = res.json();
      this.loaderService.toggleLoader(false);
    });
  }

  updateResourceFile() {
    this.loaderService.toggleLoader(true);
    this.resourceFileManagementService.updateResourceFile(this.data, this.selectedType).then(res => {
      this.snackBar.showSnackbar('File updated, file do refresh.');
      this.loaderService.toggleLoader(false);
    });
  }
}
