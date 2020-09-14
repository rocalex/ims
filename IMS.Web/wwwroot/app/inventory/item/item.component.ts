import { Component, OnInit } from '@angular/core';
import { LoaderService } from '../../../shared/loader-service';
import { PermissionService } from '../../../shared/permission.service';
import { SnackbarService } from '../../../shared/snackbar-service';
import { UserGroupFeatureParentEnum, UserGroupFeatureChildEnum } from '../../../shared/sidenav/sidenav.model';
import { ItemModel, NoteModel, DocumentModel, UOMModel, ItemTypeModel } from './item.model';
import { ItemService } from './item.service';

@Component({
  moduleId: module.id,
  templateUrl: './item.component.html'
})
export class ItemComponent implements OnInit {

    addItem: ItemModel = new ItemModel();
    noteList: NoteModel[] = [];
    documentList: DocumentModel[] = [];
    uomList: UOMModel[] = [];
    itemTypeList: ItemTypeModel[] = [];
    isAddingNotes: boolean = false;
    isEnableAddingDocument: boolean = false;
    addNote: NoteModel = new NoteModel();
    addDocument: DocumentModel = new DocumentModel();
  constructor(
    private loaderService: LoaderService,
    private permissionService: PermissionService,
    private apiService: ItemService,
    private snackService: SnackbarService
    ) { }

  ngOnInit() {
    this.getUOMList();
  }

  init() {
  }

  getUOMList() {
      this.loaderService.toggleLoader(true);
      this.apiService.getUOMList().then(res => {
          let response = res.json();
          if (response.hasError !== null && response.hasError !== undefined && response.hasError) {
            this.snackService.showSnackbar(response.message);
            return;
          }
          this.uomList = response;
          this.getItemTypeList();
    }).catch(err => {
        this.loaderService.toggleLoader(false);
    });
  }

  getItemTypeList() {
      this.apiService.getItemTypeList().then(res => {
        let response = res.json();
        if (response.hasError !== null && response.hasError !== undefined && response.hasError) {
          this.snackService.showSnackbar(response.message);
          return;
        }
        this.itemTypeList = response;
        this.loaderService.toggleLoader(false);
    }).catch(err => {
        this.loaderService.toggleLoader(false);
    });
  }

  enableAddingDocument() {
      this.isEnableAddingDocument = true;
  }

  enableAddingNotes() {
      this.isAddingNotes = true;
  }

  isAllowed(type: string) {
    return this.permissionService.isAllowed(UserGroupFeatureParentEnum.Finance, UserGroupFeatureChildEnum.FinanceBasicReciept, type);
  }
}
