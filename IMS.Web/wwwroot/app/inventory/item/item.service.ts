import { Injectable } from '@angular/core';
import { HttpService } from '../../../core/http.service';
import { ItemModel, NoteModel, DocumentModel } from './item.model';

@Injectable()
export class ItemService {
    itemUrl = 'api/item';
    uomUrl = 'api/uom';
    itemTypeUrl = 'api/itemType';

  constructor(private http: HttpService) {}

  getUOMList() {
      return this.http.get(this.uomUrl);
  }

  getItemTypeList() {
    return this.http.get(this.itemTypeUrl);
  }

  saveNotes(notes: NoteModel[]) {
    return this.http.post(this.itemUrl + '/notes', notes);
  }

  saveDocuments(documents: DocumentModel[]) {
    return this.http.post(this.itemUrl + '/documents', documents);
  }

  saveItem(item: ItemModel) {
    return this.http.post(this.itemUrl, item);
  }

  addOrUpdateImage() {

  }

  uploadDocument() {

  }
}