import { ItemModel } from "../item/item.model";

export class PriceList {
    id: number;
    name: string;
    typeId: number;
    currencyId: number;
    description: string;
    rateTypeId: number;
    customRateTypeId: number;
    customRateValue: number;
    calculationTypeId: number;
}

export class ItemPriceList {
    id: number;
    itemId: number;
    item: ItemModel;
    customRate: number;
}

export class CurrencyModel {
    id: number;
    name: string;
}