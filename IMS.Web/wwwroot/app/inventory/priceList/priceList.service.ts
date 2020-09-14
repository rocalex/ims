import { Injectable } from '@angular/core';
import { HttpService } from '../../../core/http.service';
import { PriceList, ItemPriceList } from './priceList.model';

@Injectable()
export class PriceListService {
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
}